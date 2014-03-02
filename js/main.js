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
    try{
        with(document.arduino){
            open(DEV_PORT);
            pinMode(SOLENOID, OUTPUT);
            digitalWrite(SOLENOID, LOW);
        }
    }catch(e){
        alert('Connection failed!');
    }
}

function exec(val){
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
    $('#devPort').val(DEV_PORT);
    
    // arduino.jsインストール済みか
    if(!document.arduino){
        alert("arduino.js for webpages add-on is not installed.");
    }else{
        setup(); 
    };
    
    $(window).on("beforeunload", function() {
        exec('離す');
    });
});

function changeDevicePort(){
    DEV_PORT = $('#devPort').val();
    setup();
}
