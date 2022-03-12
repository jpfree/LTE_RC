var express = require('express');
const SerialPort = require("serialport");
var router = express.Router();
const dgram = require("dgram");

let rcPort = null;
let rcPort_info = {
    Path: 'COM2',
    BaudRate: 115200
}

let RCData = '';

let RCstrFromeGCS = '';
let RCstrFromeGCSLength = 0;

let rfPort = null;

let SerialPortsList = [];
let SerialPortsObject = [];

let rfUDP = null;
let rfUDP_Status = 'disconnect'
let HOST = '';
let PORT = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/serialdata', function (req, res, next) {
    res.set({'access-control-allow-origin': '*'});
    res.send(RCData);
});
router.get('/serialports', function (req, res, next) {
    res.set({'access-control-allow-origin': '*'});
    res.send(SerialPortsObject);
});
router.post('/rfport', function (req, res, next) {
    setTimeout(RFSerialConnect, 500, req.body.port);
    res.send('[ ' + req.body.port + ' ]' + ' receive success');
});
router.post('/rfflag', function (req, res, next) {
    if (req.body.connection === 'disconnect') {
        // TODO: UDP Close
        HOST = '';
        PORT = 1;
        rfUDP_Status = req.body.connection;
        if (rfUDP !== null) {
            rfUDP.close();
        }
        res.send('Disconnect UDP..');
    } else {
        // TODO: UDP Open
        HOST = req.body.host;
        PORT = parseInt(req.body.port);
        rfUDP_Status = req.body.connection;
        rfUDP = dgram.createSocket('udp4');
        res.send('Connect UDP..');
    }
});
router.post('/rfdata', function (req, res, next) {
    if (rfPort !== null) {
        rfPort.write(Buffer.from(req.body.data, 'hex'));
        res.send('[Serial] Success of data transmission via RF');
    } else if (rfUDP !== null) {
        if (rfUDP_Status === 'connect') {
            rfUDP.send(Buffer.from(req.body.data, 'hex'), 0, Buffer.from(req.body.data, 'hex').length, PORT, HOST,
                function (err) {
                    if (err) {
                        console.log(err)
                        res.send('[UDP] Failure of data transmission via RF');
                        // console.log('Failure of data transmission via RF', err);
                        return;
                    } else {
                        res.send('[UDP] Success of data transmission via RF');
                    }
                }
            );
        } else {
            res.send('[UDP] disconnected');
        }
    }
});

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

let tempSerialPort = null;
setInterval(function () {
    SerialPort.list().then(function (ports) {
        ports.forEach(function (port) {
            if (!SerialPortsList.includes(port.path)) {
                SerialPortsList.push(port.path)
                SerialPortsObject.push({"title": port.path, "status": "Free"})

                tempSerialPort = new SerialPort(port.path, {
                    baudRate: parseInt(115200, 10),
                });
                tempSerialPort.on('open', function () {
                    tempSerialPort.close()
                });
                tempSerialPort.on('close', function () {
                    SerialPortsObject.forEach((list) => {
                        if (list.title === port.path) {
                            list.status = "Free"
                        }
                    })
                });
                tempSerialPort.on('error', function () {
                    SerialPortsObject.forEach((list) => {
                        if (list.title === port.path) {
                            list.status = "Using"
                        }
                    })
                });
                tempSerialPort.on('data', function (data) {
                    // TODO: 암호화 모듈 구분
                });
            }
        })
    });
}, 2000);

function RFSerialConnect(port) {
    if (rfPort === null) {
        rfPort = new SerialPort(port, {
            baudRate: parseInt(115200, 10),
        });

        rfPort.on('open', rfPortOpen);
        rfPort.on('close', rfPortClose);
        rfPort.on('error', rfPortError);
        rfPort.on('data', rfPortData);
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

function rfPortData(message) {
    console.log(message.toString())
}

module.exports = router;
