const lbMessageHandler = require('../messagehandlers/lbMessageHandler')
const messageEmbeds = require('../utils/messageEmbeds')
const timer = require('../utils/timer')
exports.hangmanLogic = async (msg,movieName,movieImg,id) => {
    let filter = (m) => m.author.id === id;
    let moviePre = await movieName.toUpperCase();
    let movie = moviePre.split("");
    let ans = [];
    let guessed = [];
    let tries = 7;
    let win = false;
    let time = '1min';

    const handleWin = () => {
      win = true;
      lbMessageHandler.updateUserScore(msg.guild.id,id,tries,'win')
      if(movieImg === 'none'){
        movieImg = './public/img/defaultWin.png'
        messageEmbeds.urlFileEmbed(msg,`${movieName.toUpperCase()} is Right!👑`,`🏅Winner winner wilbur dinner🏅\n ⏯️To start a new game use the command hangman`,`${movieImg}`)
        return null
      }
      return messageEmbeds.textFileEmbed(msg,`${movieName.toUpperCase()} is Right!👑`,`🏅Winner winner wilbur dinner🏅\n ⏯️To start a new game use the command hangman`,`${movieImg}`)
    }

    movie.map((i) => {
      if (i != " ") {
        ans.push("🟦");
      } else {
        ans.push(" ");
      }
    });
    console.log(ans);
    while (ans.includes("🟦") && tries > 0 && !win) {
      // let timeLeft = 20;
      console.log(tries, ans.includes("🟦"));
      finalAns = "";
      console.log(ans.toString());
       await msg.channel.send(
        `MOVIE NAME  :  ${ans
          .toString()
          .replace(/,/g, " ")} | Tries left:${tries} ⏳ | Timer ${time}`
      );
      // interval = new timer(message,ans,tries)
      // interval.start()
      // interval = setInterval(() => {
      //   timeLeft -= 1;
      //   message.edit(
      //     `MOVIE NAME  :  ${ans
      //       .toString()
      //       .replace(/,/g, " ")} | Tries left:${tries} ⏳ | Timer ${timeLeft}`
      //   );
      // }, 1000);
      msg.channel.send("Enter a guess ⁉️ -");
      try {
        guessOn = await msg.channel.awaitMessages(filter, {
          max: 1,
          time: 60000,
          errors: ["time", "maxMatches"],
        });
        guess = guessOn.first();
        guess = guess.content.toUpperCase();
        console.log(guess);
        // interval.pause()
        // clearInterval(interval);
        console.log("while loop");
        console.log(guess);
        if(guess === movieName.toUpperCase()){
          handleWin()
        }else{
          if (!guessed.includes(guess)) {
            console.log(guessed.includes(guess));
            console.log("guess not n guesed");
            guessed.push(guess);
            if (movie.includes(guess)) {
              for (let i = 0; i < movie.length; i++) {
                if (movie[i] == guess) {
                  ans[i] = guess;
                  console.log("for loop");
                }
              }
            } else {
              tries -= 1;
            }
            console.log(ans);
          } else {
            msg.channel.send("🚫You have already guessed this🚫");
            // interval.pause()
            // clearInterval(interval);
            console.log("already guessed");
            console.log(tries);
          }
        }
        console.log(ans.toString().replace(",", " "));
        console.log(
          "check:",
          movieName.toUpperCase(),
          ans.toString().replace(/,/g, "")
        );
        if (movieName.toUpperCase() === ans.toString().replace(/,/g, "")) {
          handleWin()
        }
      } catch (err) {
        console.log(err);
        console.log(movieImg);
        if(movieImg === 'none'){
          movieImg = './public/img/defaultLost.png'
          messageEmbeds.urlFileEmbed(msg,`\`\`\`🚫Time exceeded🚫`,`the answer is : ${movieName.toUpperCase()}\`\`\``,`${movieImg}`)
          return null
        }
        messageEmbeds.textFileEmbed(msg,`\`\`\`🚫Time exceeded🚫`,`the answer is : ${movieName.toUpperCase()}`,`${movieImg}`)
        return null
        // interval.pause()
        // return clearInterval(interval);
      }
    }
    // clearInterval(interval);

    if (win === false) {
      if(movieImg === 'none'){
          movieImg = './public/img/defaultLost.png'
          messageEmbeds.urlFileEmbed(msg,`⚰️better luck next time 🫂`,`The right answer is ${movieName.toUpperCase()} \n  ⏯️To start a new game use the command hangman`,`${movieImg}`)
          return null
        }
      lbMessageHandler.updateUserScore(msg.guild.id,msg.author.id,tries,'lost')
      messageEmbeds.textFileEmbed(msg,`⚰️better luck next time 🫂`,`The right answer is ${movieName.toUpperCase()} \n  ⏯️To start a new game use the command hangman`,`${movieImg}`)
    }
  };
