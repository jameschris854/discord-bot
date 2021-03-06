require("dotenv").config();

const Discord = require("discord.js");
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
if(process.env.IS_PROD === "true"){
  TOKEN = process.env.TOKEN_PROD;
}else{
  TOKEN = process.env.TOKEN_TEST
}

const mongoose = require('mongoose')
const lbMessageHandler = require('./messagehandlers/lbMessageHandler');
const Genre = require("./services/Genre");
let prefix = '-'
///////////////////LOGGING IN BOT ///////////////////////////////////////

bot.login(TOKEN);

//bot ready and logged in
console.log(bot.user)
bot.on("ready", () => {
  //get genres list from movie db
  Genre.getGenres().then(() => console.log(Genre.movieGenreList))

  console.info(`Bot has started, with 
  ${bot.users.cache.size} users, in 
  ${bot.channels.cache.size} channels of 
  ${bot.guilds.cache.size} guilds.`)
    bot.user.setActivity(`${prefix}help in ${bot.guilds.cache.size} guilds`,{type: "WATCHING"})
  let channelData =  bot.channels.cache.get('862197552350232587');
  exports.testChannel = channelData
});


// bot gets kicked from a server

bot.on('guildDelete', (guild) => {
  console.log('guild deleted or bot kicked')

  const channel = bot.channels.cache.get('862197552350232587');
  channel.send(`<logs>: hangman removed from <${guild.id}>`)
  lbMessageHandler.deleteLeaderboard(guild)
})
///////////////////////CONNECTING TO DTABASE/////////////////////////////////



const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
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