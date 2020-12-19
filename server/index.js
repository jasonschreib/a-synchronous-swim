const http = require('http');
const httpHandler = require('./js/httpHandler');
const keypressHandler = require('./js/keypressHandler');
const messageQueue = require('./js/messageQueue');

const server = http.createServer(httpHandler.router);
const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

keypressHandler.initialize(message => {
  messageQueue.enqueue(message);
  // httpHandler.initialize(messageQueue.messages, messageQueue.dequeue);
});

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
