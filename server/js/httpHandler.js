const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const http = require('http');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('/', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue, dequeue) => {
//   messageQueue = queue;
//   console.log('httpHANDLER FILE', messageQueue);
// };

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {

    let data = {}

    if (req.url === '/') {
      let move = messages.dequeue();
      data.move = move;

      res.move = move;

      res.writeHead(200, headers);
      res.end(data.move);
      next();
    }

    if (req.url === '/background.jpg') {
      let imageData = fs.readFileSync(__dirname + module.exports.backgroundImageFile, 'utf8');

      // let imageData = stream.on('data', function(chunk) {
      //   return chunk;
      // });

      console.log('IMAGE DATA:', imageData);

      if (imageData) {
        data.image = imageData;
        res.writeHead(200, headers);
        res.end(data.imageData);
        next();

      } else {
        res.writeHead(404, headers);
        res.end();
        next();
      }
    }

  } else {

    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() help with testing!
  }
};
