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

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() help with testing!
  }

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
      let imageData = fs.readFile(module.exports.backgroundImageFile, (err, data) =>
      {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.end(data);
        }
        res.end();
        next();
      });
    }

  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });
    req.on('end', () => {
      var file = multipart.getFile(fileData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 400 : 201, headers);
        res.end();
        next();
      })
    })
  }
};
