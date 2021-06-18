'use strict';
const express= require ('express');
const server =express();
const weatherdate=require('./data/weather.json');
const cors = require("cors");
const axios = require('axios');
require('dotenv').config();

server.use(cors());

const PORT=process.env.PORT || 3001;
const WKEY=process.env.WEATHER_KEY;
const MKEY=process.env.MOVIES_KEY;
class Forecast {
    constructor(date,description){
      this.description = description;
      this.date = date;

    }
}
class Moves {
  constructor(title,overview,average_votes,total_votes,image_url,popularity,released_on){
    this.title=title;
    this.overview=overview;
    this.average_votes=average_votes;
    this.total_votes=total_votes;
    this.image_url=image_url;
    this.popularity=popularity;
    this.released_on=released_on;
    
  }
}
  

// http://localhost:3001/getweather
server.get('/getweather',(req,res)=>{
     res.send(weatherdate.data); 
});


//http://localhost:3001/weather?searchQuery=city_name
// server.get('/weather', (req,res) =>{
//     let searchQuerypar=req.query.searchQuery;
//     let arrOfDays=[];
//     let cityInfo=weatherdate.find(item =>{
//         return searchQuerypar.toLowerCase()==item.city_name.toLowerCase();
//     });
//     if(cityInfo != undefined){
        
//         cityInfo.data.forEach((obj)=>{
//             let description=`Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description}`;
//             let date=obj.valid_date;
//             let day=new Forecast(date,description);
//             arrOfDays.push(day);
//         });
//         res.status(200).send(arrOfDays);
//     }else {
//         res.status(500).send("Error city not found");
//     }

//     });

//https://api.weatherbit.io/v2.0/current?lat=31.9515694&lon=35.9239625&key=d9a174b6fad5447eb9c4f13d929f06c0
//http://localhost:3001/weather?lat=&lon=&key
//http://localhost:3015/weather?lat=31.9515694&lon=35.9239625&key=d9a174b6fad5447eb9c4f13d929f06c0
server.get('/weather',weatherHandler);

 function  weatherHandler(req,res){
    let latitude = req.query.lat;
    let longitude = req.query.lon;
    let wurl=`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WKEY}`;
   
      
       axios.get(wurl).then(wresult =>{
         let arrOfDays=[];
         let Wdata= wresult.data.data.forEach(item=>{
         let description=`The Temperature is ${item.temp}°C With ${item.weather.description}`;
         let date=`'${item.datetime}`;
         let day=new Forecast(date,description);
         arrOfDays.push(day); 
         });
         res.status(200).send(arrOfDays);
       })
      
      .catch(err =>{
        res.status(500).send(err.message);
      });
    };
            
//https://api.themoviedb.org/3/search/movie?api_key=60514ef6bcc696e7dca51057d93941f0&query=paris
//http://localhost:3015/movie?api_key=60514ef6bcc696e7dca51057d93941f0&query=paris
server.get("/movie",moviesHandler);

function moviesHandler(req,res){
  let arrOfMovies=[];
  let city_name=req.query.query;
  let murl=`https://api.themoviedb.org/3/search/movie?api_key=${MKEY}&query=${city_name}`;

      axios.get(murl).then(mresult =>{
        let mdata=mresult.data.results.forEach(item =>{
          let title =item.original_title;
          let overview=item.overview;
          let average_votes=item.vote_average;
          let total_votes=item.vote_count;
          let image_url=`https://image.tmdb.org/t/p/original${item.poster_path}`;
          let popularity=item.popularity;
          let released_on=item.release_date;
          let movie=new Moves(title,overview,average_votes,total_votes,image_url,popularity,released_on);
          arrOfMovies.push(movie);
        });
        res.status(200).send(arrOfMovies);
      })
      .catch(err =>{
        res.status(500).send(err.message);
      });
      
};

//    try{
//     let wresult= axios.get(wurl);
//     let arrOfDays=[];
//     let Wdata=await wresult.data.data.forEach(item=>{
//         let description=`The Temperature is ${item.temp}°C With ${item.weather.description}`;
//         let date=`'${item.datetime}`;
//         let day=new Forecast(date,description);
//             arrOfDays.push(day); 
//     });
//     res.status(200).send(arrOfDays);
//         }
//     catch{
//         res.status(500).send("Error city not found");
//     }    



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