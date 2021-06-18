'use strict';
const axios = require('axios');
const WKEY=process.env.WEATHER_KEY;

class Forecast {
    constructor(date,description){
      this.description = description;
      this.date = date;

    };
}

  
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

module.exports = weatherHandler;      