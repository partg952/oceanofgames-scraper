const express = require("express");
const app = express();
const cors = require("cors");
const request = require("requests");
const Cheerio = require("cheerio");
const PORT = process.env.PORT || 8080;
let data_arr = [];
app.get("/",(req,res)=>{
    request("https://oceanofgamese.com/").on("data",(data)=>{
        
        const $ = Cheerio.load(data);
        $('div.post-details').each(function(i){
            data_arr.push($(this).text())
        })
        res.send(data_arr);
    })
})
app.listen(8080,()=>console.log(`listening at ${PORT}`))