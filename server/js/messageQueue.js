module.exports.messages = []; // the storage usnit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  module.exports.messages.push(message);
  console.log('MESSAGE QUEUE FILE', module.exports.messages);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  return module.exports.messages.shift();
};