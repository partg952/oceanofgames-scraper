const express = require("express");
const app = express();
const cors = require("cors");
const request = require("requests");
const Cheerio = require("cheerio");
const { eq } = require("cheerio/lib/api/traversing");
const PORT = process.env.PORT || 8080;
let data_arr = [];
app.get("/",(req,res)=>{
    request("https://oceanofgamese.com/").on("data",(data)=>{
        
        const $ = Cheerio.load(data);
        $('div.post-details').each(function(i){
            let obj = {
                title:$('h2.title > a').eq(i).text(),
                url:$('h2.title > a').eq(i).attr("href"),
                image_url:$('a.post-thumb > img').eq(i).attr("src"),
                desc:$('div.post-content').eq(i).text().trim(),
                genre:$('div.post-info > a').eq(i).text().trim()
            }
            data_arr.push(obj);
        })
        res.send(data_arr);
    })
})
app.listen(8080,()=>console.log(`listening at ${PORT}`))