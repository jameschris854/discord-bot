const lbMessageHandler = require('../messagehandlers/lbMessageHandler')
const messageEmbeds = require('../utils/messageEmbeds')
class hangman {
    constructor(msg,movieName,movieImg,id){
        this.msg = msg
        this.movieName = movieName
        this.movieImg = movieImg
        this.id = id
        console.log(movieName);
    }

    //creating hashed Answer to be displayed to user 
    ans(){
        console.log('in ans');
        // let filter = (m) => m.author.id === id;
    let moviePre =  this.movieName.toUpperCase();
    let movie = moviePre.split("");
    let ans = [];
    movie.map((i) => {
        if (i != " ") {
          ans.push("🟦");
        } else {
          ans.push(" ");
        }
      });
      console.log(ans);
    }

     askGuess(){
        let tries = 7
        console.log('ask guess',ans);
        // while (ans.includes("🟦") && tries > 0) {
        //     console.log('while');
        // let timeLeft = 20;
        // console.log(tries, ans.includes("🟦"));
        // finalAns = "";
        // console.log(ans.toString());
        // message = await this.msg.channel.send(
        //   `MOVIE NAME  :  ${ans
        
        //     .toString()
        //     .replace(/,/g, " ")} | Tries left:${tries} ⏳ | Timer ${time}`
        // );
        // interval = setInterval(() => {
        //   timeLeft -= 1;
        //   message.edit(
        //     `MOVIE NAME  :  ${ans
        //       .toString()
        //       .replace(/,/g, " ")} | Tries left:${tries} ⏳ | Timer ${timeLeft}`
        //   );
        // }, 1000);
        // this.msg.channel.send("Enter a guess ⁉️ -")
        
        // }
    }
}



module.exports = hangman
// exports.hangmanLogic = async (msg,movieName,movieImg,id) => {
//     let filter = (m) => m.author.id === id;
//     let moviePre = await movieName.toUpperCase();
//     let movie = moviePre.split("");
//     let ans = [];
//     let guessed = [];
//     let tries = 10;
//     let win = false;
//     let time = 20;

//     movie.map((i) => {
//       if (i != " ") {
//         ans.push("🟦");
//       } else {
//         ans.push(" ");
//       }
//     });
//     console.log(ans);