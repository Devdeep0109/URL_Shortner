// FOR STATEFUL...............

// const sessionIdToUserMap = new Map();

// function setUser(id ,user){
//     sessionIdToUserMap.set(id , user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports  = {
//     setUser,
//     getUser,
// }
// .................................................

// FOR STATELESS......
const jwt = require("jsonwebtoken");
const secret = "Devdeep123@#$"; //these cannot be leaked.

function setUser(user){
    return jwt.sign({
        _id :user._id,
        email : user.email,
    },secret);
}
    
function getUser(token){
    if(!token){return null};
    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        return null;
    }
}

module.exports  = {
    setUser,
    getUser,
}
