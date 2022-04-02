const hangMan = require('../services/hangman')
const axios = require("axios");
const random = require("random");
const localMovieData = require('./../public/data/movieName.json')
const messageEmbeds = require('../utils/messageEmbeds')
const Genre = require('../services/Genre');

exports.hangmanMessageHandler = async (msg,filter,prefix,cat) => {
  console.log(msg.content,  cat);
  gameMode='1'
    source = 'API'
    const rand = (from,to) => {
        return random.int(
            (min = from),
            (max = to)
          )
    }
    // console.log("rand",filter,msg);
    messageEmbeds.welcomeEmbed(msg,prefix)
    console.log(msg.channel.type);
    // msg.channel.send(
    //   " \n Welcome to hangman 🎬 \n Choose game mode: \n ▫️ Random movies - 1(Single player) \n ▫️ Choose movies -2(Two player)"
    // );

    try{
      console.log('gameMode1'+gameMode) 
      gameMode = await msg.channel.awaitMessages(filter,{
      max: 1,
      time:20000,
      errors: ["time"],
    })}catch(err){
      console.log(err.message)
     msg.channel.send('Connection timed out,please try again:no_mouth: ')
     return null
    }

    const mode = gameMode.first();
    playerId = mode.author.id;
    console.log(mode.content);
    if (mode.content === "1") {
      try{
        if(cat){
            const genreId = Genre.getGenreId(cat)
            randomMovieE = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${rand(1,20)}&include_adult=false&with_genres=${genreId}`
            );
            console.log(randomMovieE);
        } else{
          randomMovieE = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${rand(1,20)}&include_adult=false`
        );
      } 
      // let translatedMovie =await translate.translate('ta',randomMovieT.data.results[1].title)
      // console.log(translatedMovie);
      }catch(err){
        source ='LOCAL'
      }

        if(process.env.MOVIE === 'API' && source === 'API'){
          randomNew = rand(1,9)
          movieE = randomMovieE.data.results[randomNew].title
          movieEImg = `https://image.tmdb.org/t/p/w500${randomMovieE.data.results[randomNew].poster_path}`
          // movieT = randomMovieT.data.results[randomNew].title;
          console.log('API MOVIE',movieE);
        }else{
          console.log('LOCAL MOVIE');
          randomNew = rand(1,localMovieData.movies.length)
          movieE = localMovieData.movies[rand(0,randomNew)].title 
          
          movieEImg = 'none'
        }
      

        hangMan.hangmanLogic(msg,movieE,movieEImg, playerId);
    } else if (mode.content === "2") {
      try{
      await msg.author.send("player-1 : Enter the movie name");
      getMovie = await msg.author.dmChannel.awaitMessages(filter, {
        max: 1,
        time:60000,
        errors: ["time"],
      });

      const movie = getMovie.first();

      await msg.channel.send('player-2: type "start" to play');
      let filter2p = (m) => !(m.author.bot)
      player2 = await msg.channel.awaitMessages(filter2p, {
        max: 1,
        time:30000,
        errors: ["time"],
      });
    
      let player2f =await player2.first();

      console.log(player2f.content);

      let playerTwo = player2f.author.id;

      // let image = 'https://i.gifer.com/Kfde.gif'
      let image = 'none'

      hangMan.hangmanLogic(msg,movie.content,image,playerTwo);
    }catch(err){
      console.log(err.message);
      msg.channel.send('Connection timed out,please try again:no_mouth: ')
      return null
    }
  }
}

exports.hangmanCategoryMessageHandler = async(msg,filter,prefix) => {
  const category = msg.content.split(' ')[1]
  const genreId = Genre.getGenreId(category)
  if(genreId){
    this.hangmanMessageHandler(msg,filter,prefix,category)
  }else{
    messageEmbeds.noGenreErrorMsg(msg)
  }
}

