let express = require('express');
let app = express();
app.use(express.json());
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://brooklynhumanist:@cluster0.rycmg9b.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
//1 - connect to db
db.connect(); 

let accTracker = [];
   
// app.get('/', (req,res)=>{
//     res.send('this is the main page');
// })


app.post('/accToday', (req,res)=>{
    console.log(req.body);
    let currentDate = Date(); 
    let obj ={
        date: currentDate,
        accomplishment: req.body.accomplishment
    } 
//2 add values to db 
    db.push("accomplishment-info", obj);

    // accTracker.push(obj);
    // console.log(accTracker);
    
    res.json({task:"success"});
}) 

app.use('/', express.static('public'));

app.listen(5000,()=>{
    console.log('listening at localhost:5000');
})

//add route to get all saved accomplishments

app.get('/getAccomplishments',(req,res)=>{
//3 fetch data from db
    db.get('accomplishment-info').then(accData =>{
        let obj = {data: accData};
        res.json(obj);
    })
    
})

