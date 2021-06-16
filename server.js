'use strict';
const express= require ('express');
const server =express();
const weatherdate=require('./data/weather.json');
const cors = require("cors");
require('dotenv').config();

server.use(cors());

const PORT=process.env.PORT;

class Forecast {
    constructor(date,description){
      this.description = description;
      this.date = date;

    }
}
  

// http://localhost:3001/getweather
server.get('/getweather',(req,res)=>{
     res.send(weatherdate.data); 
});


//http://localhost:3001/weather?searchQuery=city_name
server.get('/weather', (req,res) =>{
    let searchQuerypar=req.query.searchQuery;
    let arrOfDays=[];
    let cityInfo=weatherdate.find(item =>{
        return searchQuerypar.toLowerCase()==item.city_name.toLowerCase();
    });
    if(cityInfo != undefined){
        
        cityInfo.data.forEach((obj)=>{
            let description=`Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description}`;
            let date=obj.valid_date;
            let day=new Forecast(date,description);
            arrOfDays.push(day);
        });
        res.status(200).send(arrOfDays);
    }else {
        res.status(500).send("Error city not found");
    }

    });

//http://localhost:3001/
server.get('/',(req,res)=>{
        res.send('hello from Home route');
     });

//http://localhost:3001/test     
server.get('/TEST',(req,res)=>{
    res.send('hello from test route');
});


server.get('*',(req,res)=>{
    res.status(404).send('404 page not found');
});



server.listen(PORT , () =>{
    console.log(`Listening for PORT:${PORT}`)
});


/// old attempt:

// console.log(weatherdate);
// let latpar=req.query.lat;
// let lonpar=req.query.lon;
// let searchQuerypar=req.query.searchQuery;
// let arrOfDays=[];
// let  wetharinfo= weatherdate.find(item =>{
//     console.log(item);
//     if(item.city_name.toLowerCase()==searchQuerypar.toLowerCase()){
//         console.log(item.data);
//         item.data.forEach((obj)=>{
//             let description=`Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description}`;
//             let date=obj.valid_date;
//             let day=new Forecast(date,description);
//             arrOfDays.push(day);
//         });
//         res.send(arrOfDays);
//     }else {
//        return res.status(500).send("Error city not found");
//     }
// })

// note: we cant send two responses in the same funtion it will cause an error