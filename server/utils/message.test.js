const expect = require('expect');
var {generateMessage} = require('./message');

describe('Generate message',()=>{
it('should generate correct message object',()=>{
    var from = 'nithin@asd.com';
    var text = 'ha ha ha test message';
    var msgObj = generateMessage(from,text);
    expect(msgObj.from).toContain(from);
    expect(msgObj.text).toContain(text);
    expect(msgObj.createdAt).toBe(typeof Number);

})
});