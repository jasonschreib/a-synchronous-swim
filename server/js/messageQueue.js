module.exports.messages = ['up'];

module.exports.enqueue = (message) => {
  module.exports.messages.push(message);
};

module.exports.dequeue = () => {
  return module.exports.messages.shift();
};