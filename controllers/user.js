const {v4:uuidv4} =require("uuid") //for generating new id.........
const User = require("../models/user");
const {setUser} = require("../service/auth");

async function handleUserSignUp(req ,res){
    const {name,email,password} = req.body;
    await User.create({
        name, // equivalent to name(setting up in database): name(from req.body)
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req ,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login" ,{
            error:"Invalid user or password",
        });
    }
    // creating session ( STATEFULL...)
    // const sessionId = uuidv4();
    // setUser(sessionId ,user);
    // res.cookie("uid" ,sessionId);
    // return res.redirect("/");
    // ......

    // (STATELESS)
    const token =  setUser(user);
    res.cookie("uid" ,token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}