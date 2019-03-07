var socket = io("http://localhost:3000");
var Temperature = "";
var Motor = "";
var Linght = "";
var door = "";
var Buzer = "";
socket.on("TemperatureData", function (data) {
    Temperature = data;
    $("#data-Temperature").text(Temperature + '   C');
    if (Number(data) <= 0) {
        $('#Temperature').html('<i class="fas fa-thermometer-empty"></i>');
    }
    else if (Number(data) <= 10 & Number(data) > 0) {
        $('#Temperature').html('<i class="fas fa-thermometer-quarter"></i>');
    }
    else if (Number(data) <= 20 & Number(data) > 10) {
        $('#Temperature').html('<i class="fas fa-thermometer-half"></i>');
    }
    else if (Number(data) <= 30 & Number(data) > 20) {
        $('#Temperature').html('<i class="fas fa-thermometer-three-quarters"></i>');
    }
    else if (Number(data) <= 40 & Number(data) > 30) {
        $('#Temperature').html('<i class="fas fa-thermometer-full"></i>');
    }
    else {
        $('#Temperature').html('<i class="fas fa-temperature-high"></i>');
    }
})
socket.on("MotorData", function (data) {
    Motor = data;
    if (Number(data) == 0) {
        $("#data-motor").html('Motor : ON');
    }
    else {
        $("#data-motor").html('Motor : OFF');
    }
})
socket.on("LightData", function (data) {
    Linght = data;
    $("#data-Linght").text(Linght);
    if (Number(data) == 0) {
        $('#Linght').html('<i class="fas fa-lightbulb"></i>');
        $('#data-Linght').html('Light : OFF');
        $('#data-light-px').html('0  px');
    }
    else {
        $('#Linght').html('<i class="far fa-lightbulb"></i>');
        $('#data-Linght').html('Light : ON');
        $('#data-light-px').html(Linght + '  px');
    }
})
socket.on("DoorData", function (data) {
    door = data;
    $("#data-door").text(door);
    if (Number(data) == 0) {
        $('#Door').html('<i class="fas fa-door-open"></i>');
        $('#data-door').html('Door : OPEND');
        $('#data-buzer').html('Buzzer : TURNON');
    }
    else {
        $('#Door').html('<i class="fas fa-door-closed"></i>');
        $('#data-door').html('Door : CLOSE');
        $('#data-buzer').html('Buzzer : TURNOFF');
    }
})
socket.on("BuzerData", function (data) {
    Buzer = data;
    $("#data-door").text(door);
    if (Number(data) <= 0) {
        $('#Door').html('<i class="fas fa-door-open"></i>');
    }
    else {
        $('#Door').html('<i class="fas fa-door-closed"></i>');
    }
})
$(document).ready(function () {
    $(".center").click(function () {
        var i = '';
        var checkboxteam = $('input[type="checkbox"]:checked');
        checkboxteam.each(function () {
            i = i + $(this).val();
        });
        socket.emit("checkbox", i);
    });

    $("#bnt-motor-on").click(function () {

        socket.emit("DataMotorUpDate", "1");
    });
    $("#bnt-motor-off").click(function () {

        socket.emit("DataMotorUpDate", "0");
    });
    $("#bnt-Linght-on").click(function () {

        socket.emit("DataLightUpDate", "1");
    });
    $("#bnt-Linght-off").click(function () {
        socket.emit("DataLightUpDate", "0");
    });
    $("#bnt-buzer-turnon").click(function () {

        socket.emit("DataBuzzerUpDate", "1");
    });
    $("#bnt-buzer-turnon").click(function () {

        socket.emit("DataBuzzerUpDate", "0");
    });
});