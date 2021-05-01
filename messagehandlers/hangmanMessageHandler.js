const hangMan = require('../utils/hangman')
const axios = require("axios");
const random = require("random");
const localMovieData = require('./../public/data/movieName.json')
const messageEmbeds = require('../model/messageEmbeds')

exports.hangmanMessageHandler = async (msg,filter,prefix) => {
    
    const rand = (from,to) => {
        return random.int(
            (min = from),
            (max = to)
          )
    }
    // console.log("rand",filter,msg);
    messageEmbeds.welcomeEmbed(msg,prefix)
    
    // msg.channel.send(
    //   " \n Welcome to hangman 🎬 \n Choose game mode: \n ▫️ Random movies - 1(Single player) \n ▫️ Choose movies -2(Two player)"
    // );
    gameMode = await msg.channel.awaitMessages(filter,{
      time:20000,
      maxMatches: 1,
      errors: ["time"],
    });

    const mode = gameMode.first();
    playerId = mode.author.id;
    console.log(mode.content);
    if (mode.content === "1") {
      const randomMovieE = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${rand(1,20)}&include_adult=false`
      );
      const randomMovieT = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_original_language=ta&language=ta&page=${rand(1,10)}&sort_by=original_title.asc&year=2019`
      );
        if(process.env.MOVIE === 'API'){
          console.log('API MOVIE');
            randomNew = rand(1,9)
            movieE = randomMovieE.data.results[randomNew].title
            movieEImg = `https://image.tmdb.org/t/p/w500${randomMovieE.data.results[randomNew].poster_path}`
            movieT = randomMovieT.data.results[randomNew].title;
        }else{
          console.log('LOCAL MOVIE');
          randomNew = rand(1,localMovieData.movies.length)
          movieE = localMovieData.movies[rand(0,randomNew)].title 
          
          movieEImg = localMovieData.movies[rand(0,randomNew)].posterUrl 
        }
      
      
      hangMan.hangmanLogic(msg,movieE,movieEImg, playerId);
    } else if (mode.content === "2") {

      await msg.author.send("player-1 : Enter the movie name");
      getMovie = await msg.author.dmChannel.awaitMessages(filter, {
        maxMatches: 1,
        time:20000,
        errors: ["time"],
      });

      const movie = getMovie.first();

      await msg.channel.send('player-2: type "start" to play');

      player2 = await msg.channel.awaitMessages(() => true, {
        maxMatches: 1,
        time:20000,
        errors: ["time"],
      });

      let player2f =await player2.first();

      console.log(player2f.content);

      let playerTwo =await player2f.author.id;

      let image = 'https://i.gifer.com/Kfde.gif'

      hangMan.hangmanLogic(msg,movie.content,image,playerTwo);
    }
  
};


