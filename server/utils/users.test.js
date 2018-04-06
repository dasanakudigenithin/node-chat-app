const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{

    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
         id:123456,
         name:'Mike',
         room:'Developers'   
        },
        {
            id:123457,
            name:'John',
            room:'Developers'   
           },
           {
            id:123458,
            name:'Simson',
            room:'NodeCourse'   
           }]
    });

it('should add user to the users array',()=>{
    var users=new Users();
    var user={
        id:12345,
        name:'Nithin',
        room:'RoomOne'
    };
    res = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
});

it('should get the user by id',()=>{
    var user = users.users[1];
    res = users.getUser(123457);
    expect(res).toBe(user);
});

it('should not find the user by id',()=>{
    var user = users.users[1];
    res = users.getUser(123453);
    expect(res).toBe(undefined);
});

it('should get list of names by room Developers',()=>{
    var userList = users.getUserList('Developers');
    expect(userList).toEqual(['Mike','John']);
});

it('should get list of names by room NodeCourse',()=>{
    var userList = users.getUserList('NodeCourse');
    expect(userList).toEqual(['Simson']);
});

it('should remove user from the users array',()=>{
    var user = users.users[1];
    res = users.removeUser(123457);
    expect(res).toBe(user);
    expect(users.users.length).toBe(2);
});

it('should not remove user from the users array',()=>{
    res = users.removeUser(123453);
    expect(res).toBe(undefined);
    expect(users.users.length).toBe(3);
});

});