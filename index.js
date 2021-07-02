const random = require("random");
const Scraper = require("images-scraper");
const bot = require('./server')
const hangmanMessageHandler = require('./messagehandlers/hangmanMessageHandler')
const lbMessageHandler = require('./messagehandlers/lbMessageHandler');
const messageEmbeds = require('./utils/messageEmbeds')
const configMessageHandler = require('./messagehandlers/cofigMessageHandler');
const hangman = require("./services/hangmanClass");
const express = require('express');
const app = express();
const port = 3000;


const vennuQuotes = [
  "Hey are U going to Sing ???",
  "Its My Life..",
  "If U live like that do U know what people think about U ???..",
  "People think that I am some what mental...",
  "They dont know I am very sentimental..",
  "I am a Self Blamer...",
  "I am a Brain Eater...",
  "I am a Heart Stealer...",
];

const wilburQuotes = [
  "first class ???",
  "wilbur mode..",
  "im a good citizen ???..",
  "eating chicken 65 on a madurai street...",
  "Amma pasikuthu pasikuthu pasikuthu..",
  "terminology...",
  "simple superstar...",
  "Cobra Cobra...",
  "Cobra in the sky",
  "Cobra to the left",
  "Cobra to the right",
  "Say Cobra Cobra",
];
bot.on("message", async (msg) => {  
  if(msg.author.bot) return;
  if(!(msg.guild === null)){
  {
  try{
    prefix  = await configMessageHandler.getGuildPrefix(msg.guild.id)
    console.log(prefix);
  }catch(err){
    prefix = '-'
    console.log('error caught prefix');
  }
}
  
  // let filter = m => m.author.id === msg.author.id
  //vennu***wilbur***
  if (msg.content === "vennu" || msg.content == "wilbur") {
    let No = random.int((min = 0), (max = 40));
    let NoQ = random.int((min = 0), (max = vennuQuotes.length));

    if (msg.content == "vennu") {
      Quotes = vennuQuotes;
      content = "vennu";
    } else if (msg.content == "wilbur") {
      Quotes = wilburQuotes;
      content = "wilbur sargunaraj";
    }
    /////////// /////////////////generating quotes//////////////////////////////
    msg.reply(Quotes[NoQ]);
    const url = () => {
      const google = new Scraper({
        puppeteer: {
          headless: true,
        },
      });

      ////////////////////////// generating image/////////////////////////
      (async () => {
        const results = await google.scrape(content, 50);
        console.log("results", results[0].url);
        console.log("hi");
        return msg.channel.send(results[No].url);
      })();
    };
    url();
  }

  ////////////////////////////////// HANGMAN /////////////////////////
  else if (msg.content.toLowerCase() === `${prefix}hangman`) {
    lbMessageHandler.isDbCreated(msg)
    let filter = (m) => m.author.id === msg.author.id;
    hangmanMessageHandler.hangmanMessageHandler(msg,filter,prefix);
  }
  // else if (msg.content === "dbcheck" ){
  //   console.log('checking db');
  //   let data = {
  //     _guildId:`${msg.guild.id}`,
  //   guildMembers:{
  //     'james':'200'
  //     ,'loki':'500'
  //   }
  //   }
  //   lbMessageHandler.createTestGuild(data)
  // }
  else if (msg.content.toLowerCase() === `${prefix}score me` )
  {
    lbMessageHandler.isDbCreated(msg)
    let userData =await lbMessageHandler.singleUserScore(msg,msg.author.id)
    messageEmbeds.singleUserData(msg,userData[0],userData[1])
  }
  else if(msg.content.toLowerCase() === `${prefix}leaderboard`)
  {  
    console.log('leaderboard');
    lbMessageHandler.isDbCreated(msg)
    console.log(msg.guild.id);
    let data  = await lbMessageHandler.showLeaderBoard(msg)
    messageEmbeds.leaderBoardEmbed(msg,data)

  }
  // else if (msg.content.toLowerCase() === "add me" )
  // {
  //   lbMessageHandler.updateUserScore(msg.guild.id,msg.author.id,20)
  // }
  // else if(msg.content.toLowerCase() === "win" )
  // {
  //   console.log(random.int((min=1),(max=10)));
  //   lbMessageHandler.updateUserScore(msg.guild.id,msg.author.id,5)
  // }
  else if(msg.content.toLowerCase() === `${prefix}help`){
    lbMessageHandler.isDbCreated(msg)
    messageEmbeds.helpMessage(msg,prefix)
  }
  else if(msg.content.toLowerCase() === `${prefix}config`){
    lbMessageHandler.isDbCreated(msg)
    let filter = (m) => m.author.id === msg.author.id;
    configMessageHandler.changePrefix(msg.guild.id,msg,filter)
  }
  else if(msg.content.toLowerCase() === `${prefix}class`){
    let filter = (m) => m.author.id === msg.author.id;
    player1 =new hangman('msg','the shinning','url','adasdadasd')
    player1.ans()
    player1.askGuess()

  }
  process.on("uncaughtException", (evt) => { 
    if(evt.code === 'ERR_UNHANDLED_REJECTION'){
      console.log(evt);
      msg.channel.send('connection timed out ,please try again ⌛')
    }else{
      process.on('unhandledRejection', (err) => {
        console.log('UNHANDLED REJECTION! SHUTTING DOWN');
        console.log(err.name, err.message,err);
        // server.close(() => {
        //   process.exit(1);
        // });
        console.log('caught');
      });
    }
  })
}
})



app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Discord app listening at http://localhost:${port}`));