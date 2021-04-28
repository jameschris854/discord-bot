const hangMan = require('../hangman/hangman')
const axios = require("axios");
const random = require("random");


exports.hangmanMessageHandler = async (msg,filter) => {

    // console.log("rand",filter,msg);
    msg.channel.send("https://tenor.com/view/hang-noose-hanging-daylight-gif-15303115")
    msg.channel.send(
      " \n Welcome to hangman 🎬 \n Choose game mode: \n ▫️ Random movies - 1(Single player) \n ▫️ Choose movies -2(Two player)"
    );
    gameMode = await msg.channel.awaitMessages(filter, {
      time:20000,
      maxMatches: 1,
      errors: ["time"],
    });

    const mode = gameMode.first();
    playerId = mode.author.id;
    console.log(mode.content);
    if (mode.content === "1") {
      const randomMovieE = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${random.int(
          (min = 1),
          (max = 20)
        )}`
      );
      const randomMovieT = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_original_language=ta&language=ta&page=${random.int(
          (min = 1),
          (max = 10)
        )}&sort_by=original_title.asc&year=2019`
      );
      randomNew = random.int(
        (min = 1),
        (max = 9)
      )
      let movieE = randomMovieE.data.results[randomNew].title
      let movieEImg = `https://image.tmdb.org/t/p/w500${randomMovieE.data.results[randomNew].poster_path}`
      // let movieT = randomMovieT.data.results[randomNew].title;
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

