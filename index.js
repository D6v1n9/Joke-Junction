import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// app.get("/", (req,res) => {
//     res.render("index.ejs" );
// });
app.get("/", async(req,res) => {
    const result = await axios.get(API_URL+"/Any?safe-mode", {
        params:{
            type: "single",
        }
    });
    // console.log(result.data);
    res.render("index.ejs", {
        joke: (result.data.joke),
    })
});

app.post("/",  async (req,res) => {
    const data = req.body;
    // console.log(req.body.category.programming);
    console.log(data);
    try {
        const category = req.body.category;
        const param1 = [];
        for(const key in category) {
            param1.push(category[key]+",");
        }
        const strParam1 = "".concat(...param1);

        console.log(strParam1);
        
        const result = await axios.get(API_URL, {
            params:{
                
            }
        })
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, ()=> {
    console.log(`Server runnning on port ${port}`);
});

