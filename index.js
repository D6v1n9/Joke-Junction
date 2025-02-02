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

        // Category filter

        const category = req.body.category;
        // console.log(category);
        const categoryArray = [];

        if(category) {
            Object.keys(category).forEach(key => {
                const value = category[key];
                if(key === Object.keys(category)[Object.keys(category).length-1]) {
                    categoryArray.push(value);
                }
                else {
                    categoryArray.push(value+",");
                }
            }) 
        } else {
            categoryArray.push("Any");
        }
        const paraCategory = "".concat(...categoryArray);
        // console.log(paraCategory);


        //Flag filter

        const flags = req.body.blacklistFlags;
        const flagsArray = [];
        if(flags) {
            Object.keys(flags).forEach(key => {
                const value = flags[key];
                if(key === Object.keys(flags)[0]) {
                    flagsArray.push("?blacklistFlags="+value);
                }
                else {
                    flagsArray.push(","+value);
                }
            })
        }
        else {
            flagsArray.push("");
        }

        const paraFlags = "".concat(...flagsArray);


        //Joke type filter


        const type = req.body.type;
        console.log(type);
        const typeArray = [];
        let paraType = "";
        if(type) {
            Object.keys(type).forEach((key) => {
                const value = type[key];
                typeArray.push(value);
            })
            if(typeArray.length === 1) {
                paraType = "?type="+(typeArray[0]);
            }
            else {
                paraType = "";
            }
        }
        else {
            //show an error
        }

        console.log(paraType);

        console.log(`${API_URL}/${paraCategory}${paraFlags}${paraType}`);   



        
        const result = await axios.get(`${API_URL}/${paraCategory}${paraFlags}${paraType}`, {
            
        })
    } catch (error) {
        // console.log(error);
    }
});

app.listen(port, ()=> {
    console.log(`Server runnning on port ${port}`);
});

