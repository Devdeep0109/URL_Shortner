// inBuild files.......
const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

const PORT=8001;
// importing from file ythat we create
const urlRoute = require("./routes/urls");
const {connectToMongoDB} = require("./connection"); 
const URL = require("./models/urls");
const staticRoutes = require("./routes/staticRouter");
const userRoutes = require("./routes/user");
const {restrictToLoggedinUserOnly} = require("./middleware/auth");
const cookieParser = require("cookie-parser");

// connecting MONGODB.............
connectToMongoDB("mongodb+srv://deepdeoo2001:tiBa0zZqzcsTHEBc@cluster0.cegtmdr.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("MongoDb connected"))



// setting the type of view Engine
app.set("view engine" ,"ejs");
// views location
app.set("views" ,path.resolve("./views"));


// middleware............
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// Routes using..............
// 1.
app.use("/url" ,restrictToLoggedinUserOnly, urlRoute); // only authenticated user can use these url

// 3.(static routes).
app.use("/" ,staticRoutes);

// 4.
app.use("/user" ,userRoutes);


// 2.
app.get("/url/:shortId", async(req,res)=>{

    const shortId = req.params.shortId;

    const entry= await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory:{
                    timeStamp : Date.now(),
                }
            },
        },
        {timestamps : true}
    )
    res.redirect(entry.redirectUrl);
})

// 3.
// app.get("/test" , async(req,res) =>{
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls: allUrls,
//     });
// })


app.listen(PORT ,()=>{
    console.log(`PORT started in port no ${PORT}`);
})