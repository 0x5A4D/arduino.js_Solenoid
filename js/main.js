/*
 * Copyright (c) 2014 0x5A4D All Rights Reserved.
 * Released under The MIT License.
 * http://opensource.org/licenses/MIT
 */

// Device Port
var DEV_PORT = "COM3";

// Pin
var SOLENOID = 9;

// Arduino 定数
var OUTPUT = true;
var INPUT  = false;
var HIGH = 1;
var LOW  = 0;

function setup(){
    var arduino = document.arduino;
    arduino.open(DEV_PORT);
    arduino.pinMode(SOLENOID, OUTPUT);
}

function exec(val){
    console.log(val);
    var arduino = document.arduino;
    var elm = $('#btn');
    if(val === '吸引'){
        elm.val('離す');
        elm.css('box-shadow','rgba(225, 225, 225, 0.6) 0px 0px 35px 35px');
        elm.animate({ marginTop: '0px', marginBottom: '100px'});
        arduino.digitalWrite(SOLENOID, HIGH);
    }else{
        elm.val('吸引');
        elm.css('box-shadow', 'none');
        elm.animate({ marginTop: '100px', marginBottom: '0px'});
        arduino.digitalWrite(SOLENOID, LOW);
    }
}

$(function(){
    // arduino.jsインストール済みか
    if(!document.arduino){
        alert("arduino.js Add-on is not installed.");
    }else{
        setup(); 
        
        $('#devPort').val(DEV_PORT);
        
        $(window).on("beforeunload", function() {
            exec('離す');
        });
    };
});

function changeDevicePort(){
    var arduino = document.arduino;
    exec('離す');
    arduino.close();
    try{
        arduino.open($('#devPort').val());
    }catch(e){
        alert('Please try different ports.');
    }
}
