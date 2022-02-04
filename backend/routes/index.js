var express = require('express');
const SerialPort = require("serialport");
var router = express.Router();

let rcPort = null;
let rcPort_info = {
  Path: 'COM2',
  BaudRate: 115200
}

let RCData = '';

let RCstrFromeGCS = '';
let RCstrFromeGCSLength = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/serialdata', function(req,res,next){
  res.set({'access-control-allow-origin': '*'});
  res.send(RCData);
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
  // RCstrFromeGCS += message.toString('hex').toLowerCase();
  RCData = message.toString('hex').toLowerCase();
  // console.log(RCData);

  // while (RCstrFromeGCS.length >= 68) {
  //   let header1 = RCstrFromeGCS.substr(0, 2);
  //   if (header1 === 'ff') {
  //     let RCLength = 34 * 2;
  //
  //     // console.log(RCstrFromeGCS.toString('hex'))
  //     RCData = RCstrFromeGCS.toString('hex');
  //     // receiveFromRC(RCstrFromeGCS.toString('hex'))
  //
  //     RCstrFromeGCS = RCstrFromeGCS.substr(RCLength);
  //     RCstrFromeGCSLength = 0;
  //   } else {
  //     RCstrFromeGCS = RCstrFromeGCS.substr(2);
  //   }
  // }
}
// setInterval(function () {
//   console.log(RCData)
// })
module.exports = router;
