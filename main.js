var mqtt = require('mqtt')
var express = require('express');
var socket = require('socket.io');

var port = process.env.PORT || 3000;

var MQTT_TOPIC_Temperature = 'Temperature';
var MQTT_TOPIC_Motor = 'Motor';
var MQTT_TOPIC_Light = 'Light';
var MQTT_TOPIC_Door = 'Door';
var MQTT_TOPIC_Buzzer = 'Buzzer';

var Data_Temperature = 'TemperatureData';
var Data_Motor = 'MotorData';
var Data_Light = 'LightData';
var Data_Door = 'DoorData';
var Data_Buzzer = 'BuzerData';

var MQTT_ADDR = 'mqtt://m16.cloudmqtt.com';
var Temperature = "";
var Motor = "";
var Light = "";
var Door = "";
var Buzzer = "";

var MotorMode = "1 ";
var LightMode = "1 ";
var BuzzerMode = "1 ";



var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./Views");

var options = {
    port: 16959,
    host: 'mqtt://m16.cloudmqtt.com',
    username: 'lbtkifwk',
    password: 'b9u4zxPpiUDX',
    clean: true,
    encoding: 'utf8',
};

var client = mqtt.connect(MQTT_ADDR, options);




require('./App/routes.js')(app);

server.listen(port);
console.log("Node is running on port 3000...");

function CheckData(mesage,topic,data) {
    if (mesage != "") {
        if ((mesage.indexOf("0 ") != -1) || (mesage.indexOf("1 ") != -1)) {

            topic = mesage.slice(2);

        }
        else {
            topic = mesage;
        }
        io.emit(data, topic);
    }
}

client.on('connect', function () {
    client.subscribe(MQTT_TOPIC_Temperature, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Motor, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Light, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Door, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Buzzer, { qos: 2 });
    console.log('connected');
});

client.on('message', (topic, message) => {
    switch (topic) {
        case MQTT_TOPIC_Temperature:
            {
                CheckData(message.toString(), Temperature, Data_Temperature);
                break;
            }
        case MQTT_TOPIC_Motor:
            {
                CheckData(message.toString(), Motor, Data_Motor);

                break;
            }
        case MQTT_TOPIC_Light:
            {

                CheckData(message.toString(), Light, Data_Light);
                break;
            }
        case MQTT_TOPIC_Door:
            {
                CheckData(message.toString(), Door, Data_Door);
                break;
            }
        case MQTT_TOPIC_Buzzer:
            {
                CheckData(message.toString(), Buzzer, Data_Buzzer);
                break;
            }
        default: {
        }

    }
});

client.on('error', function (ERROR) {
    console.log(ERROR)
    client.end()
});

client.on('offline', function () {
    console.log("offline");
});
client.on('reconnect', function () {
    console.log("reconnect");
});

io.on("connection", function (socket) {
    console.log('wed connnected');
    io.emit("TemperatureData", Temperature);
    io.emit("MotorData", Motor);
    io.emit("LightData", Light);
    io.emit("DoorData", Door);

    socket.on("DataMotorUpDate", function (data) {
        if (MotorMode == "0 ") {
            client.publish(MQTT_TOPIC_Motor, MotorMode + data);
        }
    });
    socket.on("DataLightUpDate", function (data) {
        if (LightMode == "0 ") {
            client.publish(MQTT_TOPIC_Light, LightMode + data);
        }
    });
    socket.on("DataBuzzerUpDate", function (data) {
        if (BuzzerMode == "0 ") {
            client.publish(MQTT_TOPIC_Buzzer, BuzzerMode + data);
        }
    });

    socket.on("checkbox", function (data) {
        if (data == "") {

            MotorMode = "1 ";
            LightMode = "1 ";
            BuzzerMode = "1 ";
        }
        else {
            if (data.indexOf("1") != -1) {
                MotorMode = "0 ";
            }
            else {
                MotorMode = "1 ";
            }
            if (data.indexOf("2") != -1) {
                LightMode = "0 ";
            }
            else {
                LightMode = "1 ";
            }
            if (data.indexOf("3") != -1) {
                BuzzerMode = "0 ";
            }
            else {
                BuzzerMode = "1 ";
            }

        }

        Motor = MotorMode + Motor;
        Light = LightMode + Light;
        Buzzer = BuzzerMode + Buzzer;

        client.publish(MQTT_TOPIC_Motor, Motor);
        client.publish(MQTT_TOPIC_Light, Light);
        client.publish(MQTT_TOPIC_Buzzer, Buzzer);
    });

});

