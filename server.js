const express= require ('express');
const server =express();
const weatherdate=require('./data/weather.json');
const cors = require("cors");
require('dotenv').config();

server.use(cors());

const PORT= 3001 || process.env.PORT;

class Forecast {
    constructor(date,description){
      this.date = date;
      this.description = description;
    }
  }
  


// http://localhost:3001/
server.checkout('/',(req,res)=>{
    res.send('welcome in the home route');
})


// http://localhost:3001/getweather

server.get('/getweather',(req,res)=>{
    
     res.send(weatherdate[0].city_name);
       
})

// let citypar=req.query.searchQuery;
// let wetharinfo=weatherdate.find(item =>{
//     if(citypar==item.city_name) {
//         return item.city_name;
//     }else {
//         return 'error';
//     }
// res.send(wetharinfo);
///////////////////////////////////
// if (wetharinfo.city_name==searchQuerypar && wetharinfo.lat==latpar && wetharinfo.lon==lonpar){
//     res.send(wetharinfo.data);
// }else {
//   res.send('error');
// }
// description": "Low of 17.1, high of 23.6 with broken clouds",
// "date": "2021-03-31"
// },

// http://localhost:3001/weather?lat=123&lon=123&searchQuery=city_name
// wetharinfo==searchQuerypar && weatherdate.lat==latpar && weatherdate.lon==lonpar

server.get('/weather', (req,res) =>{
    let latpar=req.query.lat;
    let lonpar=req.query.lon;
    let searchQuerypar=req.query.searchQuery;
    let arrOfDays=[];
    let  wetharinfo= weatherdate.find(item =>{
        console.log(item);
        if(item.city_name==searchQuerypar && item.lat==latpar && item.lon == lonpar){
            console.log(item.data);
            item.data.forEach((obj)=>{
                let description=`Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description}`;
                let date=obj.valid_date;
                let day=new Forecast(description,date);
                arrOfDays.push(day);
            });
            res.send(arrOfDays);
        }else {
           return res.send('error');
        }
    })
    return wetharinfo;
   
    } )






server.get('/TEST',(req,res)=>{
    res.send('hello from test route');
});

server.listen(PORT , () =>{
    console.log(`Listening for PORT:${PORT}`)
});