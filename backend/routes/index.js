var express = require('express');
const SerialPort = require("serialport");
var router = express.Router();
const dgram = require("dgram");
const {response} = require("express");

let rcPort = null;
let rcPort_info = {
    Path: 'COM3',
    BaudRate: 115200
}

let RCData = '';

let RCstrFromeGCS = '';
let RCstrFromeGCSLength = 0;

let rfUDP = {};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/serialdata', function (req, res, next) {
    res.set({'access-control-allow-origin': '*'});
    res.send(RCData);
});
router.post('/rfflag', function (req, res, next) {
    let res_text = ''

    let key = req.body.host + ':' + req.body.port

    if (req.body.connection === 'disconnect') {
        if (rfUDP.hasOwnProperty(key)) {
            res_text = rfUDP[key].host + ':' + rfUDP[key].port + ' 연결 해제';
            delete rfUDP[key]
        } else {
            res_text = '연결되지 않은 ' + key;
        }
    } else {
        if (!rfUDP.hasOwnProperty(key)) {
            rfUDP[key] = {}
            rfUDP[key].host = req.body.host;
            rfUDP[key].port = parseInt(req.body.port);
            rfUDP[key].status = req.body.connection;
            rfUDP[key].client = dgram.createSocket('udp4');
            res_text = rfUDP[key].host + ':' + rfUDP[key].port + ' 연결';
        } else {
            if (rfUDP[key].hasOwnProperty('status')) {
                if (rfUDP[key].status === 'disconnect') {
                    rfUDP[key].host = req.body.host;
                    rfUDP[key].port = parseInt(req.body.port);
                    rfUDP[key].status = req.body.connection;
                    rfUDP[key].client = dgram.createSocket('udp4');
                    res_text = rfUDP[key].host + ':' + rfUDP[key].port + ' 연결';
                } else {
                    res_text = '이미 연결된 ' + rfUDP[key].host + ':' + rfUDP[key].port;
                }
            } else {
                rfUDP[key] = {}
                rfUDP[key].host = req.body.host;
                rfUDP[key].port = parseInt(req.body.port);
                rfUDP[key].status = req.body.connection;
                rfUDP[key].client = dgram.createSocket('udp4');
                res_text = rfUDP[key].host + ':' + rfUDP[key].port + ' 재연결';
            }
        }
    }
    res.send(res_text)
});

setInterval(function () {
    for (let idx in Object.keys(rfUDP)) {
        if (rfUDP[Object.keys(rfUDP)[idx]].status === 'connect') {
            rfUDP[Object.keys(rfUDP)[idx]].client.send(Buffer.from(RCData, 'hex'), 0, Buffer.from(RCData, 'hex').length, rfUDP[Object.keys(rfUDP)[idx]].port, rfUDP[Object.keys(rfUDP)[idx]].host,
                function (err) {
                    if (err) {
                        console.log(err)
                        console.log('[' + rfUDP[Object.keys(rfUDP)[idx]].host + ':' + rfUDP[Object.keys(rfUDP)[idx]].port + '] Failure of data transmission via RF');
                        return;
                    }
                }
            );
        }
    }
}, 40);

rcPortOpening();

function rcPortOpening() {
    if (rcPort == null) {
        rcPort = new SerialPort(rcPort_info.Path, {
            baudRate: parseInt(rcPort_info.BaudRate, 10),
        });

        rcPort.on('open', rcPortOpen);
        rcPort.on('close', rcPortClose);
        rcPort.on('error', rcPortError);
        rcPort.on('data', rcPortData);
    } else {
        if (rcPort.isOpen) {
            console.log('This is an already open RC port.')
        } else {
            rcPort.open();
        }
    }
}

function rcPortOpen() {
    console.log('rcPort open. ' + rcPort_info.Path + ' Data rate: ' + rcPort_info.BaudRate);
}

function rcPortClose() {
    console.log('rcPort closed.');
}

function rcPortError(error) {
    console.log('[rcPort error]: ' + error.message);

    setTimeout(rcPortOpening, 2000);
}

function rcPortData(message) {
    RCstrFromeGCS += message.toString('hex').toLowerCase();

    while (RCstrFromeGCS.length >= 68) {
        // console.log(RCstrFromeGCS);
        let header1 = RCstrFromeGCS.substr(0, 2);
        if (header1 === 'ff') {
            let RCLength = 34 * 2;

            RCData = RCstrFromeGCS.substr(0, RCLength);

            RCstrFromeGCS = RCstrFromeGCS.substr(RCLength);
            RCstrFromeGCSLength = 0;
        } else {
            RCstrFromeGCS = RCstrFromeGCS.substr(2);
        }
    }
}

module.exports = router;
