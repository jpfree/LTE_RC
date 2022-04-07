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

let rfPort = null;

let SerialPortsList = [];
let SerialPortsObject = [];

let rfUDP = {};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/serialdata', function (req, res, next) {
    res.set({'access-control-allow-origin': '*'});
    res.send(RCData);
});

// router.get('/serialports', function (req, res, next) {
//     res.set({'access-control-allow-origin': '*'});
//     res.send(SerialPortsObject);
// });
router.post('/rfport', function (req, res, next) {
    if (req.body.connect) {
        setTimeout(RFSerialConnect, 500, req.body.port, req.body.baudrate);
        res.send('[ ' + req.body.port + ':' + req.body.baudrate + ' ]' + ' Connect');
    } else {
        rfPort.close();
        rfPort = null;
        res.send('[ ' + req.body.port + ':' + req.body.baudrate + ' ]' + ' Disonnect');
    }
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
                    // console.log('send to [',Object.keys(rfUDP)[idx],'] - ', RCData)
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
            // TODO: RF 모드 일 때, 조종기 모드별 채널 매핑

            RCstrFromeGCS = RCstrFromeGCS.substr(RCLength);
            RCstrFromeGCSLength = 0;
        } else {
            RCstrFromeGCS = RCstrFromeGCS.substr(2);
        }
    }
}

//
// let tempSerialPort = null;
// setInterval(function () {
//     SerialPort.list().then(function (ports) {
//         ports.forEach(function (port) {
//             if (!SerialPortsList.includes(port.path)) {
//                 SerialPortsList.push(port.path)
//                 SerialPortsObject.push({"title": port.path, "status": "Free"})
//
//                 tempSerialPort = new SerialPort(port.path, {
//                     baudRate: parseInt(115200, 10),
//                 });
//                 tempSerialPort.on('open', function () {
//                     tempSerialPort.close()
//                 });
//                 tempSerialPort.on('close', function () {
//                     SerialPortsObject.forEach((list) => {
//                         if (list.title === port.path) {
//                             list.status = "Free"
//                         }
//                     })
//                 });
//                 tempSerialPort.on('error', function () {
//                     SerialPortsObject.forEach((list) => {
//                         if (list.title === port.path) {
//                             list.status = "Using"
//                         }
//                     })
//                 });
//                 tempSerialPort.on('data', function (data) {
//                     // TODO: 암호화 모듈 구분
//                 });
//             }
//         })
//     });
// }, 2000);

function RFSerialConnect(port, baudrate) {
    if (rfPort === null) {
        console.log(port)
        rfPort = new SerialPort(port, {
            baudRate: parseInt(baudrate, 10),
        });

        rfPort.on('open', rfPortOpen);
        rfPort.on('close', rfPortClose);
        rfPort.on('error', rfPortError);
        // rfPort.on('data', rfPortData);
    } else {
        if (rfPort.isOpen) {
            console.log('This is an already open RC port.')
        } else {
            rfPort.open();
        }
    }
}

function rfPortOpen() {
    console.log('rfPort open. ' + rfPort.path + ' Data rate: ' + rfPort.baudRate);
}

function rfPortClose() {
    console.log('rfPort closed.');
}

function rfPortError(error) {
    console.log('[rfPort error]: ' + error.message);

    setTimeout(RFSerialConnect, 2000);
}

// function rfPortData(message) {
//     console.log(message.toString())
// }

setInterval(function () {
    if (rfPort !== null) {
        rfPort.write(Buffer.from(RCData, 'hex'));
        // console.log('send to [', rfPort.path, rfPort.baudRate, '] - ', RCData);
    }
}, 40);

module.exports = router;
