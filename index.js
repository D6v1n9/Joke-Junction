import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


let DayJoke = "";
app.get("/", async(req,res) => {
    const startingText = "Welcome to the Joke Generator! Choose your preferences and click 'Generate' to get a funny joke!";
    const result = await axios.get(API_URL+"/Any?safe-mode", {
        params:{
            type: "single",
        }
    });
    // console.log(result.data);
    DayJoke = result.data.joke;
    res.render("index.ejs", {
        jokeHead: (result.data.joke),
        text: startingText
    })
});

app.post("/",  async (req,res) => {
    const data = req.body;
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
        console.log("paraCategory: "+paraCategory);

                                //Flag filter

        const flags = req.body.blacklistFlags;
        const flagsArray = [];
        let paraFlags = "";
        if(flags) {
            Object.keys(flags).forEach(key => {
                const value = flags[key];
                if(key === Object.keys(flags)[0]) {
                    flagsArray.push(value);
                }
                else {
                    flagsArray.push(","+value);
                }
            })

            paraFlags = "".concat(...flagsArray);
        }
        else {
            paraFlags = null;
        }

        console.log("paraFlag: "+paraFlags);

                                
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
                paraType = typeArray[0];
            }
            else {
                paraType = null;
            }
        }
        else {
            //show an error
        }
        
        console.log("paraType: "+paraType);
        
        // Amount of Jokes parameter

        const amount = req.body.amount;
        let paraAmount = "";
        if(amount == 1) {
            paraAmount = null;
        }
        else {
            paraAmount = amount;
        }

        console.log("paraAmount: "+paraAmount);


                            //Safe-mode

        const safeMode = req.body.mode;
        let paraSafe = "";
        if(safeMode == 'safe-mode') {
            paraSafe = "safe-mode";
        }
        else {
            paraSafe = null;
        }

        console.log(paraSafe);

/*      //Method 2 
        
        let params = {
            blacklistFlags: paraFlags,
            type: paraType,
            amount: paraAmount,
        };

        // Conditionally add 'safe-mode' if safeMode === 'safe-mode'
        if (safeMode === 'safe-mode') {
            params['safe-mode'] = ''; // Add 'safe-mode' with an empty value
        }

        const result = await axios.get(`${API_URL}/${paraCategory}`, { params });
 */

        console.log(`${API_URL}/${paraCategory}`);

        const result = await axios.get(`${API_URL}/${paraCategory}`, {
            params: {
                blacklistFlags: paraFlags,
                type: paraType,
                amount: paraAmount,
                ...(safeMode === 'safe-mode' ? { 'safe-mode': '' } : {})
            },
        })
        console.log(result.data);

        res.render("index.ejs", {
            type:result.data.type,
            joke: result.data.joke,
            setup: result.data.setup,
            delivery: result.data.delivery,
            jokeHead: DayJoke,
        });
    } catch (error) {
        // console.log(error);
    }
});



app.listen(port, ()=> {
    console.log(`Server runnning on port ${port}`);
});

