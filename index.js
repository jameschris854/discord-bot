const random = require("random");
const Scraper = require("images-scraper");
const bot = require('./server')
const hangmanMessageHandler = require('./messagehandlers/hangmanMessageHandler')
const lbMessageHandler = require('./messagehandlers/lbMessageHandler');
const messageEmbeds = require('./utils/messageEmbeds')
const configMessageHandler = require('./messagehandlers/cofigMessageHandler')



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
  {
    if(msg.author.bot) return;
  try{
    prefix  = await configMessageHandler.getGuildPrefix(msg.guild.id)
    console.log(prefix);
  }catch(err){
    prefix = '-'
    console.log('error caught');
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
    lbMessageHandler.isDbCreated(msg.guild.id)
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
    lbMessageHandler.isDbCreated(msg.guild.id)
    let userScore =await lbMessageHandler.singleUserScore(msg.guild.id,msg.author.id)
    messageEmbeds.singleUserData(msg,userScore)
  }
  else if(msg.content.toLowerCase() === `${prefix}leaderboard`)
  {  
    console.log('leaderboard');
    lbMessageHandler.isDbCreated(msg.guild.id)
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
    lbMessageHandler.isDbCreated(msg.guild.id)
    messageEmbeds.helpMessage(msg)
  }
  else if(msg.content.toLowerCase() === `${prefix}config`){
    let filter = (m) => m.author.id === msg.author.id;
    configMessageHandler.changePrefix(msg.guild.id,msg,filter)
  }
  process.on("uncaughtException", (evt) => { 
    if(evt.code === 'ERR_UNHANDLED_REJECTION'){
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

