class timer {
    constructor(msg,ans,triesLeft){
        this.isRunning = false;
        console.log('constructing timer');
        this.msg = msg
        this.ans = ans
        this.timeLeft = 20;
        this.triesLeft = triesLeft
        this.runTimer = setInterval(() => {
            this.timeLeft -= 1;
            this.msg.edit(
              `MOVIE NAME  :  ${this.ans
                .toString()
                .replace(/,/g, " ")} | Tries left:${this.triesLeft} ⏳ | Timer ${this.timeLeft}`
            ,1000);
          })
       

    }
    start(){
        if (!this.isRunning) {
        this.isRunning = true;
        console.log('stating timer');
          this.runTimer = setInterval(() => {
          this.timeLeft -= 1;
          this.msg.edit(
            `MOVIE NAME  :  ${this.ans
              .toString()
              .replace(/,/g, " ")} | Tries left:${this.triesLeft} ⏳ | Timer ${this.timeLeft}`
          ,1000);
        })
    }
      }
      pause(){
        this.isRunning = false;
        if (this.isRunning === false) {

          clearInterval(this.runTimer)
        }
      }
    }

    module.exports = timer