var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

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
describe('generate location message', () => {
  it('should be generate location message', (done) => {
    var from = 'sang';
    var laditude = 15;
    var longitude = 18;
    var url = 'https://www.google.com/maps?q=15,18';
    var message = generateLocationMessage(from, laditude, longitude);
    expect(message.url).toBe(url);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
    done();
  })
})