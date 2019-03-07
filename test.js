var mqtt = require('mqtt')
var url = require('url')
var express = require('express');
var socket = require('socket.io');

var port = process.env.PORT || 3000;

var MQTT_TOPIC_Temperture = 'Temperture';
var MQTT_TOPIC_Humidity = 'Hunidity';
var MQTT_TOPIC_Light = 'Light';
var MQTT_TOPIC_Door = 'Door';


var MQTT_ADDR = 'mqtt://m16.cloudmqtt.com';
var Temperture = "";
var humidity = "";
var Light = "";
var Door = "";
//var mqtt_url = process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883';

var app = express();
//Create a server on localhost:3000
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


//store the express functions to var app

require('./App/routes.js')(app);

server.listen(port);
console.log("Node is running on port 3000...");



client.on('connect', function () {
    client.subscribe(MQTT_TOPIC_Temperture, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Humidity, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Light, { qos: 2 });
    client.subscribe(MQTT_TOPIC_Door, { qos: 2 });
    client.publish(MQTT_TOPIC_Humidity, "123");
    console.log('connected');
});

client.on('message', (topic, message) => {
    switch (topic) {
        case 'Temperture':
            {
                if (message.toString() != "") {
                    humidity = message.toString();
                    io.emit("TempertureData", message.toString());
                    console.log('Temperture' + message.toString());
                }
                break;
            }
        case 'Hunidity':
            {
                if (message.toString() != "") {
                    humidity = message.toString();
                    io.emit("HumidityData", message.toString());
                    console.log('Hunidity' + message.toString());
                }
                break;
            }
        case 'Light':
            {
                if (message.toString() != "") {
                    humidity = message.toString();
                    io.emit("LightData", message.toString());
                    console.log('Light' + message.toString());
                }
                break;
            }
        case 'Door':
            {
                if (message.toString() != "") {
                    humidity = message.toString();
                    io.emit("DoorData", message.toString());
                    console.log('Door' + message.toString());
                }
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
    client.on('message', (topic, message) => {
        switch (topic) {
            case 'Temperture':
                {
                    if (message.toString() != "") {
                        humidity = message.toString();
                        io.emit("TempertureData", message.toString());
                        console.log('Temperture' + message.toString());
                    }
                    break;
                }
            case 'Hunidity':
                {
                    if (message.toString() != "") {
                        humidity = message.toString();
                        io.emit("HumidityData", message.toString());
                        console.log('Hunidity' + message.toString());
                    }
                    break;
                }
            case 'Light':
                {
                    if (message.toString() != "") {
                        humidity = message.toString();
                        io.emit("LightData", message.toString());
                        console.log('Light' + message.toString());
                    }
                    break;
                }
            case 'Door':
                {
                    if (message.toString() != "") {
                        humidity = message.toString();
                        io.emit("DoorData", message.toString());
                        console.log('Door' + message.toString());
                    }
                    break;
                }
            default: {
            }

        }
    });

});