const  shortid = require("shortid"); // npm package to short the url......
const URL = require("../models/urls");

async function handleGenerateNewShortURL(req, res){

    const allUrls = await URL.find({}); 
    const body = req.body;
    console.log(body.url);
    if(!body.url){
        return res.status(400).json({error: "url is required"})
    }
    const shortID = shortid(); //creating shortURL........
    console.log(shortID);
    await URL.create({        
        shortId : shortID,
        redirectUrl :body.url,
        visitHistory: [],
    })
    return res.render("home", {
        id:shortID,
        urls:allUrls,
    })
}
async function handleGetAnalytics(req ,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics : result.visitHistory,
    })
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};

