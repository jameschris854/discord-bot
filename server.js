require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const mongoose = require('mongoose')
const lbMessageHandler = require('./messagehandlers/lbMessageHandler');
let prefix = '-'
///////////////////LOGGING IN BOT ///////////////////////////////////////

bot.login(TOKEN);

//bot ready and logged in
console.log(bot.user)
bot.on("ready", () => {
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