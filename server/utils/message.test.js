var expect = require('expect');
var { generateMessage } = require('./message');

describe('gennerate message', () => {
  it('should generate correct message object', (done) => {
     // store res in variable
     var from = 'sang';
     var text = 'some message';
     var message = generateMessage(from, text);

     expect(message.createdAt).toBeA('number');
     expect(message).toInclude({from, text});
     done();
  });

});