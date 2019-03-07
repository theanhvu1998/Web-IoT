var socket = io("http://localhost:3000");
var Temperture = "";
var Humidity = "";
var Linght = "";
var door = "";
socket.on("TempertureData", function (data) {
    Temperture = data;
    $("#data-teamperture").text(Temperture + '   C');
    if (Number(data) <= 0) {
        $('#termper').html('<i class="fas fa-thermometer-empty"></i>');
    }
    else if (Number(data) <= 10 & Number(data) > 0) {
        $('#termper').html('<i class="fas fa-thermometer-quarter"></i>');
    }
    else if (Number(data) <= 20 & Number(data) > 10) {
        $('#termper').html('<i class="fas fa-thermometer-half"></i>');
    }
    else if (Number(data) <= 30 & Number(data) > 20) {
        $('#termper').html('<i class="fas fa-thermometer-three-quarters"></i>');
    }
    else if (Number(data) <= 40 & Number(data) > 30) {
        $('#termper').html('<i class="fas fa-thermometer-full"></i>');
    }
    else {
        $('#termper').html('<i class="fas fa-temperature-high"></i>');
    }
})
socket.on("HumidityData", function (data) {
    Humidity = data;
    $("#data-humty").text(Humidity + '     %');
    $('#Humidity').html('<i class="fas fa-tint"></i>');
})
socket.on("LightData", function (data) {
    Linght = data;
    $("#data-Linght").text(Linght);
    if (Number(data) <= 0) {
        $('#Linght').html('<i class="far fa-lightbulb"></i>');
    }
    else {
        $('#Linght').html('<i class="fas fa-lightbulb"></i>');
    }
})
socket.on("DoorData", function (data) {
    door = data;
    $("#data-door").text(door);
    if (Number(data) <= 0) {
        $('#Door').html('<i class="fas fa-door-open"></i>');
    }
    else {
        $('#Door').html('<i class="fas fa-door-closed"></i>');
    }
})
$(document).ready(function () {

});