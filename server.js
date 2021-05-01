require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const mongoose = require('mongoose')
///////////////////LOGGING IN BOT ///////////////////////////////////////
bot.login(TOKEN);
//bot ready and logged in
bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: `hangman |${'-'}help`,
            type: "PLAYING",
            url: "https://www.twitch.tv/monstercat"
        }
  })
});

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