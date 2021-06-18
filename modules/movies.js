'use strict';
const axios = require('axios');
const MKEY=process.env.MOVIES_KEY;


class Movies {
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
          let movie=new Movies(title,overview,average_votes,total_votes,image_url,popularity,released_on);
          arrOfMovies.push(movie);
        });
        res.status(200).send(arrOfMovies);
      })
      .catch(err =>{
        res.status(500).send(err.message);
      });   
};


module.exports = moviesHandler;