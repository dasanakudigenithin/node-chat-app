const expect = require('expect');
const {isRealString} = require('./validation');


describe('isReatString', ()=>{
it('should reject non string values',()=>{
 var res = isRealString(123567879);
 expect(res).toBeFalsy();
});

it('should reject empty strings and strings with spaces',()=>{
    var res = isRealString('                   ');
    expect(res).toBeFalsy();
});

it('should allow string with non-space characters',()=>{
    var res = isRealString('      Developers       Room');
    expect(res).toBeTruthy();
});
});