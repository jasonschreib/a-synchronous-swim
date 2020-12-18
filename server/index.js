const http = require('http');
const httpHandler = require('./js/httpHandler');
const keypressHandler = require('./js/keypressHandler');
const messageQueue = require('./js/messageQueue');

const server = http.createServer(httpHandler.router);

keypressHandler.initialize(messageQueue.enqueue);
httpHandler.initialize(messageQueue.messages);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
