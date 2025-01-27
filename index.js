import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// app.get("/", (req,res) => {
//     res.render("index.ejs" );
// });
app.get("/", async(req,res) => {
    const result = await axios.get(API_URL+"?safe-mode", {
        params:{
            type: "single",
        }
    });
    console.log(result.data);
    res.render("index.ejs", {
        joke: (result.data.joke),
    })
});

app.listen(port, ()=> {
    console.log(`Server runnning on port ${port}`);
});

