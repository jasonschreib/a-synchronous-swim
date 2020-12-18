const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const http = require('http');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
  console.log('httpHANDLER FILE', messageQueue);
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {

    res.writeHead(200, headers);

    var allMoves = ['up', 'down', 'left', 'right'];
    var randMove = Math.floor(Math.random() * allMoves.length);
    var capturedMove = allMoves[randMove];

    res.randomMove = capturedMove;
    res.end(capturedMove);
    next();

  } else {

    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }
};
