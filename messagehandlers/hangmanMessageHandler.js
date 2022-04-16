const hangMan = require('../services/hangman')
const messageEmbeds = require('../utils/messageEmbeds')
const Genre = require('../services/Genre');
const { getMoviesList, getRandomMovie } = require('../services/movies');


exports.hangmanMessageHandler = async (msg, filter, prefix, cat) => {
  gameMode = '1'
  source = 'API'

  messageEmbeds.welcomeEmbed(msg, prefix)

  try {
    gameMode = await msg.channel.awaitMessages({
      filter,
      max: 1,
      time: 20000,
      errors: ["time"]
    }
    )
  } catch (err) {
    msg.channel.send('Connection timed out,please try again:no_mouth: ')
    return null
  }

  const mode = gameMode.first();
  playerId = mode.author.id;
  if (mode.content === "1") {
    try {
      var randomMovieE = await getMoviesList(cat)
    } catch (err) { source = 'LOCAL' }

    const randomMovieDetail = getRandomMovie(source,randomMovieE)
    
    hangMan.hangmanLogic(msg, randomMovieDetail.name, randomMovieDetail.img, playerId);

  } else if (mode.content === "2") {
    try {
      await msg.author.send("player-1 : Enter the movie name");
      getMovie = await msg.author.dmChannel.awaitMessages({
        filter,
        max: 1,
        time: 60000,
        errors: ["time"],
      });

      const movie = getMovie.first();

      await msg.channel.send('player-2: type "start" to play');
      let filter2p = (m) => !(m.author.bot)
      player2 = await msg.channel.awaitMessages({
        filter: filter2p,
        max: 1,
        time: 30000,
        errors: ["time"],
      });

      let player2f = await player2.first();

      console.log(player2f.content);

      let playerTwo = player2f.author.id;

      // let image = 'https://i.gifer.com/Kfde.gif'
      let image = 'none'

      hangMan.hangmanLogic(msg, movie.content, image, playerTwo);
    } catch (err) {
      console.log(err.message);
      msg.channel.send('Connection timed out,please try again:no_mouth: ')
      return null
    }
  }
}

exports.hangmanCategoryMessageHandler = async (msg, filter, prefix) => {
  const category = msg.content.split(' ')[1]
  const genreId = Genre.getGenreId(category)
  if (genreId) {
    this.hangmanMessageHandler(msg, filter, prefix, category)
  } else {
    messageEmbeds.noGenreErrorMsg(msg)
  }
}

