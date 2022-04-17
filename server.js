const Discord = require("discord.js");
const config = require('./config/config')
const mongoose = require('mongoose')
const lbMessageHandler = require('./messagehandlers/lbMessageHandler');
const Genre = require("./services/Genre");
const { LEADER_BOARD, SCORE_ME, HANGMAN, SINGLE_PLAYER, MULTI_PLAYER, HELP, CONFIG, CATEGORY, SECRET, PLAYER_TWO } = require("./utils/constants");
const applicationCommandType = Discord.Constants.ApplicationCommandOptionTypes

const bot = new Discord.Client({
  intents:
    [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.DIRECT_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

let TOKEN
if (config.IS_PROD === "true") {
  TOKEN = config.TOKEN_PROD;
} else {
  TOKEN = config.TOKEN_TEST
}

let prefix = '-'

///////////////////LOGGING IN BOT ///////////////////////////////////////

bot.login(TOKEN);

//bot ready and logged in
console.log(bot.user)
bot.on("ready", async () => {
  console.info(`Bot has started, with 
  ${bot.users.cache.size} users, in 
  ${bot.channels.cache.size} channels of 
  ${bot.guilds.cache.size} guilds.`)
  bot.user.setActivity(`${prefix}help in ${bot.guilds.cache.size} guilds`, { type: "WATCHING" })
  let channelData = bot.channels.cache.get('862197552350232587');
  exports.testChannel = channelData

  // creating event to listen to slash commands.
  let slash
  if (config.IS_PROD === "true") {
    slash = bot.application.commands
  } else {
    const guild = bot.guilds.cache.get('838022479250456576')
    slash = guild.commands
  }

  //get genres list from movie db
  await Genre.getGenres()
  console.log(Genre.movieGenreList)
  slash.create({
    name: HANGMAN, description: 'play a guessing game with random movies', options: [
      {
        name: SINGLE_PLAYER, description: 'let bot give you a random movie.', type: applicationCommandType.SUB_COMMAND,
        options: [{
          name: CATEGORY, description: 'choose movie category', type: applicationCommandType.STRING, choices: [...Genre.movieGenreList.map((g) => { return { name: g.name, value: g.name } })]
        }]
      },
      {
        name: MULTI_PLAYER, description: 'Give your friend a movie to guess.', type: applicationCommandType.SUB_COMMAND,
        options: [
          { name: SECRET, description: 'movie name for your friend to guess.', type: applicationCommandType.STRING, required: true },
          { name: PLAYER_TWO, description: 'select player 2 to start the game.', type: applicationCommandType.USER, required: true }
        ]
      }
    ]
  })
  slash.create({ name: LEADER_BOARD, description: 'shows leaderboard for your server.' })
  slash.create({ name: SCORE_ME, description: 'Shows your current score in leaderboard.' })
  slash.create({ name: HELP, description: 'Shows all commands and more.' })
  slash.create({ name: CONFIG, description: 'Edit server prefix.' })
});


// bot gets kicked from a server

bot.on('guildDelete', (guild) => {
  console.log('guild deleted or bot kicked')

  const channel = bot.channels.cache.get('862197552350232587');
  channel.send(`<logs>: hangman removed from <${guild.id}>`)
  lbMessageHandler.deleteLeaderboard(guild)
})
///////////////////////CONNECTING TO DTABASE/////////////////////////////////



const DB = config.DATABASE.replace(
  '<PASSWORD>',
  config.DB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully!!'));

module.exports = bot