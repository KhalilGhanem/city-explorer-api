'use strict';
const express= require ('express');
const server =express();
const weatherdate=require('./data/weather.json');
const cors = require("cors");
const axios = require('axios');
require('dotenv').config();
const weatherHandler=require('./modules/weather');
const moviesHandler=require('./modules/movies');

server.use(cors());

const PORT=process.env.PORT || 3001;

// Weather Route
//https://api.weatherbit.io/v2.0/current?lat=31.9515694&lon=35.9239625&key=d9a174b6fad5447eb9c4f13d929f06c0
//http://localhost:3001/weather?lat=&lon=&key
//http://localhost:3011/weather?lat=31.9515694&lon=35.9239625&key=d9a174b6fad5447eb9c4f13d929f06c0
server.get('/weather',weatherHandler);

 
// Movie Route            
//https://api.themoviedb.org/3/search/movie?api_key=60514ef6bcc696e7dca51057d93941f0&query=paris
//http://localhost:3011/movie?api_key=60514ef6bcc696e7dca51057d93941f0&query=paris
server.get("/movie",moviesHandler);


//http://localhost:3001/
server.get('/',(req,res)=>{
        res.send('hello from Home route');
     });

server.get('*',(req,res)=>{
    res.status(404).send('404 page not found');
});

server.listen(PORT , () =>{
    console.log(`Listening for PORT:${PORT}`)
});