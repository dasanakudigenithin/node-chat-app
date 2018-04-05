const expect = require('expect');
var {generateMessage , generateLocationMessage} = require('./message');

describe('Generate message',()=>{
it('should generate correct message object',()=>{
    var from = 'nithin@asd.com';
    var text = 'ha ha ha test message';
    var msgObj = generateMessage(from,text);
    expect(msgObj.from).toContain(from);
    expect(msgObj.text).toContain(text);
});
});

describe('Generate LOcation message',()=>{
    it('should generate correct location object',()=>{
        var from = 'Admin';
        var latitude = 12.98144;
        var longitude = 77.6459457;
        var locObj = generateLocationMessage(from,latitude,longitude);
        expect(locObj.from).toContain(from);
        expect(locObj.url).toContain('http://www.google.com/maps?q=12.98144,77.6459457');
    });
    });