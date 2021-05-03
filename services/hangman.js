const lbMessageHandler = require('../messagehandlers/lbMessageHandler')
const messageEmbeds = require('../utils/messageEmbeds')

exports.hangmanLogic = async (msg,movieName,movieImg,id) => {
    let filter = (m) => m.author.id === id;
    let moviePre = await movieName.toUpperCase();
    let movie = moviePre.split("");
    let ans = [];
    let guessed = [];
    let tries = 10;
    let win = false;
    let time = 20;

    movie.map((i) => {
      if (i != " ") {
        ans.push("🟦");
      } else {
        ans.push(" ");
      }
    });
    console.log(ans);
    while (ans.includes("🟦") && tries > 0) {
      let timeLeft = 20;
      console.log(tries, ans.includes("🟦"));
      finalAns = "";
      console.log(ans.toString());
      message = await msg.channel.send(
        `MOVIE NAME  :  ${ans
          .toString()
          .replace(/,/g, " ")} | Tries left:${tries} ⏳ | Timer ${time}`
      );
      interval = setInterval(() => {
        timeLeft -= 1;
        message.edit(
          `MOVIE NAME  :  ${ans
            .toString()
            .replace(/,/g, " ")} | Tries left:${tries} ⏳ | Timer ${timeLeft}`
        );
      }, 1000);
      msg.channel.send("Enter a guess ⁉️ -");
      try {
        guessOn = await msg.channel.awaitMessages(filter, {
          maxMatches: 1,
          time: 20000,
          errors: ["time", "maxMatches"],
        });
        guess = guessOn.first();
        guess = guess.content.toUpperCase();
        console.log(guess);
        clearInterval(interval);
        console.log("while loop");
        console.log(guess);
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
          clearInterval(interval);
          console.log("already guessed");
          console.log(tries);
        }
        console.log(ans.toString().replace(",", " "));
        console.log(
          "check:",
          movieName.toUpperCase(),
          ans.toString().replace(/,/g, "")
        );
        if (movieName.toUpperCase() === ans.toString().replace(/,/g, "")) {
          win = true;
          lbMessageHandler.updateUserScore(msg.guild.id,msg.author.id,tries,'win')
          messageEmbeds.textFileEmbed(msg,`${movieName.toUpperCase()} is Right!👑`,`🏅Winner winner wilbur dinner🏅\n ⏯️To start a new game use the command hangman`,`${movieImg}`)
        }
      } catch (err) {
        console.log(err);
        messageEmbeds.textFileEmbed(msg,`🚫Time exceeded🚫`,`the answer is : ${movieName.toUpperCase()}`,`${movieImg}`)
        return clearInterval(interval);
      }
    }
    clearInterval(interval);

    if (win === false) {
      lbMessageHandler.updateUserScore(msg.guild.id,msg.author.id,tries,'lost')
      messageEmbeds.textFileEmbed(msg,`⚰️better luck next time 🫂`,`The right answer is ${movieName.toUpperCase()} \n  ⏯️To start a new game use the command hangman`,`${movieImg}`)
    }
  };

