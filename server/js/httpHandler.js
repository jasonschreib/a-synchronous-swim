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
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    // create array of all moves
    var allMoves = ['up', 'down', 'left', 'right'];
    // get random index math.floor math.random
    var randMove = Math.floor(Math.random() * allMoves.length);
    // capture one of the moves
    var capturedMove = allMoves[randMove];
    //set randomMove prop of res to the above move
    res.randomMove = capturedMove;

    res.end();
    next();
  }

  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
