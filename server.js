require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
//bot ready and logged in
bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});



module.exports = bot