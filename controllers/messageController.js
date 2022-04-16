
const random = require("random");
const Scraper = require("images-scraper");
const hangmanMessageHandler = require('../messagehandlers/hangmanMessageHandler')
const configMessageHandler = require('../messagehandlers/cofigMessageHandler');
const hangman = require("../services/hangmanClass");
const lbMessageHandler = require('../messagehandlers/lbMessageHandler');
const messageEmbeds = require('../utils/messageEmbeds')

exports.messageHandler =  async (msg) => { 
  msg.author.avatarURL = `https://cdn.discordapp.com/avatars/390758809930301440/${msg.author.avatar}.webp`

    if(msg.author.bot) return;
  
    if(!(msg.guild === null)){
    {
    try{
      prefix  = await configMessageHandler.getGuildPrefix(msg.guild.id)
      console.log(prefix);
    }catch(err){
      prefix = '-'
    }
  }
    

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
    else if(msg.content.includes(' ') && msg.content.split(' ')[0].toLowerCase() === `${prefix}hangman` && msg.content.split(' ').length == 2){
      lbMessageHandler.isDbCreated(msg)
      let filter = (m) => m.author.id === msg.author.id;
      hangmanMessageHandler.hangmanCategoryMessageHandler(msg,filter,prefix);
    }
    ////////////////////////////////// HANGMAN /////////////////////////
    else if (msg.content.toLowerCase() === `${prefix}hangman`) {
      lbMessageHandler.isDbCreated(msg)
      let filter = (m) => m.author.id === msg.author.id;
      hangmanMessageHandler.hangmanMessageHandler(msg,filter,prefix,null);
    }
    else if (msg.content.toLowerCase() === `${prefix}score me` )
    {
      lbMessageHandler.isDbCreated(msg)
      let userData =await lbMessageHandler.singleUserScore(msg,msg.author.id)
      messageEmbeds.singleUserData(msg,userData[0],userData[1])
    }
    else if(msg.content.toLowerCase() === `${prefix}leaderboard`)
    {  
      lbMessageHandler.isDbCreated(msg)
      console.log(msg.guild.id);
      let data  = await lbMessageHandler.showLeaderBoard(msg)
      messageEmbeds.leaderBoardEmbed(msg,data)
  
    }
    else if(msg.content.toLowerCase() === `${prefix}stats` )
    {
      msg.channel.send(`server count : ${bot.guilds.cache.size}\nactive users ${bot.users.cache.size}\nchannels ${bot.channels.cache.size}`)
        
    }
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
          console.log('UNHANDLED REJECTION! SHUTTING DOWN',evt);
      }
    })
  }
  }