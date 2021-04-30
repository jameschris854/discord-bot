
exports.leaderBoardEmbed = (userNames,score,msg) => {
    return msg.channel.send({embed:{
        author:{name:msg.guild.name,
          icon_url: msg.guild.iconURL},
        url: "https://discordapp.com",
        description: "Score is calculated based on tries left at the end of game",
        // color:"3447003",
        title:'Hangman Leaderboard',
        color:'332391',
        fields:[
          {name:"Name",value:userNames,inline:true},
          {name:"Score",value:score,inline:true}
        ],
        timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL,
        text: "© hangman"
      }
      }
    })
}
exports.helpMessage = (msg) => {
    return msg.channel.send({embed:{
        author:{name:msg.guild.name,
          icon_url: msg.guild.iconURL},
        url: "https://discordapp.com",
        description: "Score is calculated based on 'tries left' at the end of game\n",
        title:'_Command List_',
        color:'332391',
        fields:[
          {name:"hangman",value:'play either single player or 2player in hangman',inline:false},
          {name:"Game description",value:'hangman is a game where you will have 7 tries to guess a movie name \n there is a 20sec gap between each try',inline:false},
          {name:"vennu",value:'type vennu ,rest is history',inline:false},
          {name:'wilbur',value:'type wilbur to experience the cobra'},
          {name:'score me',value:'get your individual score from the leaderboard'}
        ],
        timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL,
        text: "© hangman"
      }
      }
    })
}
exports.singleUserData = (msg,score) => {
  return msg.channel.send({embed:{
    author:{name:msg.guild.name,
      icon_url: msg.guild.iconURL},
    url: "https://discordapp.com",
    description: "Score is calculated based on tries left at the end of game",
    // color:"3447003",
    title:`${msg.author.username} your Score is:`,
    color:'332391',
    fields:[
      {name:"Your Score",value:score,inline:true},
      {name:"LeaderBoard poistion",value:'0',inline:true}
    ],
    timestamp: new Date(),
  footer: {
    icon_url: msg.author.avatarURL,
    text: "© hangman"
  }
  }
})
}