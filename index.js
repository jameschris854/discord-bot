require("dotenv").config();
const Discord = require("discord.js");
const random = require("random");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const Scraper = require("images-scraper");
const axios = require("axios");
const translate = require('translate')
const hangMan = require('./hangman/hangman')
// const translate =require("./translator")

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

bot.login(TOKEN);
//bot ready and logged in
bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

//bot on any message event in the server

bot.on("message", async (msg) => {
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
  else if (msg.content.toLowerCase() === "hangman") {
    let filter = (m) => m.author.id === msg.author.id;
    
    ///////////////////////////////////INITIATE HANGMAN/////////////////////////
    console.log("rand");
    msg.channel.send("https://tenor.com/view/hang-noose-hanging-daylight-gif-15303115")
    msg.channel.send(
      " \n Welcome to hangman 🎬 \n Choose game mode: \n ▫️ Random movies - 1(Single player) \n ▫️ Choose movies -2(Two player)"
    );
    gameMode = await msg.channel.awaitMessages(filter, {
      time:20000,
      maxMatches: 1,
      errors: ["time"],
    });

    const mode = gameMode.first();
    playerId = mode.author.id;
    console.log(mode.content);
    if (mode.content === "1") {
      const randomMovieE = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${random.int(
          (min = 1),
          (max = 20)
        )}`
      );
      const randomMovieT = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_original_language=ta&language=ta&page=${random.int(
          (min = 1),
          (max = 10)
        )}&sort_by=original_title.asc&year=2019`
      );
      randomNew = random.int(
        (min = 1),
        (max = 9)
      )
      let movieE = randomMovieE.data.results[randomNew].title
      let movieEImg = `https://image.tmdb.org/t/p/w500${randomMovieE.data.results[randomNew].poster_path}`
      // let movieT = randomMovieT.data.results[randomNew].title;
      hangMan.hangman(msg,movieE,movieEImg, playerId);
    } else if (mode.content === "2") {
      await msg.author.send("player-1 : Enter the movie name");
      getMovie = await msg.author.dmChannel.awaitMessages(filter, {
        maxMatches: 1,
        time:20000,
        errors: ["time"],
      });
      const movie = getMovie.first();
      await msg.channel.send('player-2: type "start" to play');
      player2 = await msg.channel.awaitMessages(() => true, {
        maxMatches: 1,
        time:20000,
        errors: ["time"],
      });
      let player2f =await player2.first();
      console.log(player2f.content);
      let playerTwo =await player2f.author.id;
      let image = 'https://i.gifer.com/Kfde.gif'
      hangMan.hangmanhangman(msg,movie.content,image,playerTwo);
    }
  }
});
