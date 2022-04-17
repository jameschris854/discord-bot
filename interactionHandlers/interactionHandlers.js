const hangMan = require('../services/hangman')
const { getMoviesList, getRandomMovie } = require('../services/movies');
const { SINGLE_PLAYER, MULTI_PLAYER, SECRET, PLAYER_TWO } = require('../utils/constants');

exports.hangmanInteractionHandler = async (interaction, cat) => {
  gameMode = '1'
  source = 'API'
  if (interaction.options.getSubcommand() === SINGLE_PLAYER) {
    gameMode = '1'
  } else if (interaction.options.getSubcommand() === MULTI_PLAYER) {
    gameMode = '2'
  }
  playerId = interaction.user.id;
  if (gameMode === "1") {
    try {
      var randomMovieE = await getMoviesList(cat)
    } catch (err) { source = 'LOCAL' }

    const randomMovieDetail = getRandomMovie(source,randomMovieE)
    hangMan.hangmanLogic(interaction, randomMovieDetail.name, randomMovieDetail.img, playerId);

  } else if (gameMode === "2") {
    try {
      await interaction.reply("game started");

      console.log('iiasdas    /n',interaction.options.getUser('playertwo'))

      const movie = interaction.options.getString(SECRET)

      let playerTwo = interaction.options.getUser(PLAYER_TWO).id

      // let image = 'https://i.gifer.com/Kfde.gif'
      let image = 'none'
      hangMan.hangmanLogic(interaction, movie, image, playerTwo);

    } catch (err) {
      console.log(err.message);
      interaction.channel.send('Connection timed out,please try again:no_mouth: ')
      return null
    }
  }
}

