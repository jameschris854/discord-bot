const random = require("random");
const Scraper = require("images-scraper");
const bot = require('./server')
const hangmanMessageHandler = require('./messagehandlers/hangmanMessageHandler')
const lbMessageHandler = require('./messagehandlers/lbMessageHandler')

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

//DISCORD SECTION

// bot.login(TOKEN);
// //bot ready and logged in
// bot.on("ready", () => {
//   console.info(`Logged in as ${bot.user.tag}!`);
// });

//bot on any message event in the server

bot.on("message", async (msg) => {
  // let filter = m => m.author.id === msg.author.id
  lbMessageHandler.isDbCreated(msg.guild.id)
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
  else if (msg.content.toLowerCase() === "hangman") {
    let filter = (m) => m.author.id === msg.author.id;
    hangmanMessageHandler.hangmanMessageHandler(msg,filter)
    ///////////////////////////////////INITIATE HANGMAN/////////////////////////
  }
  else if (msg.content === "dbcheck" ){
    console.log('checking db');
    let data = {
      _guildId:'766137401687939999',
    guildMembers:{
      'james':'200'
      ,'loki':'500'
    }
    }
    lbMessageHandler.createTestGuild(data)
  }
  else if (msg.content.toLowerCase() === "score me" ){
    lbMessageHandler.singleUserScore('abcdefg','james')
  }
  else if (msg.content.toLowerCase() === "update me"){
    lbMessageHandler.updateUserScore('766137401687932958','james')
  }else if(msg.content.toLowerCase() === "leaderboard")
  {
    console.log(msg.guild.id);
    let members =await  lbMessageHandler.showLeaderBoard('766137401687932958')
    let lbMembers = ''
    members.map(member => {
      lbMembers = lbMembers + `${member[0]}:${member[1]} \n`
    })
    msg.channel.send(`leaderboard details\n ${lbMembers}`)
  }
  else if (msg.content.toLowerCase() === "add me" ){
    lbMessageHandler.updateUserScore(msg.guild.id,msg.author.id,20)
  }
})