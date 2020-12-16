const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const http = require('http');

let server = http.createServer(module.exports.router);


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};

// server.listen(3000, function() {
//   console.log('Listening on port 3000');
// });

const handleKeyPress = () {
  //create array of directions
  let commands = ['up','down','left','right'];
  let randomIndex = Math.floor(Math.random() * commands.length);
  let randomCommand = commands[randomIndex];
  //listen for a GET request and return the direction

};
