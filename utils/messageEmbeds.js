exports.welcomeEmbed = (msg,prefix) => {
  return msg.channel.send({embed:{
    author:{name:msg.guild.name,
      icon_url: msg.guild.iconURL},
    description: `_Score is calculated based on tries left at the end of game \n ${prefix}help to see commands and more_`,
    // color:"3447003",
    image:  {
      url: "attachment://hangmanIntro.jpg"
      },  
    title:'Hangman',
    color:'332391',
    fields:[
      {name:"Choose game mode:\n \nSINGLE PLAYER",value:`:white_small_square: Random movies - \`\` 1 \`\`  (Single player)`,inline:false},
          {name:"\nTWO PLAYER",value:`:white_small_square: Choose movies - \`\` 2 \`\`  (Two player)`,inline:false},
        ],
        
    timestamp: new Date(),
  footer: {
    icon_url: msg.author.avatarURL,
    text: "© hangman"
  },
  }
  ,files: ["./public/img/hangmanIntro.jpg"] })


}
exports.leaderBoardEmbed = (msg,data) => {
    let userNames= data[0]
    let score = data[1]
    let scoreAuth = data[2]
    let position = data[3]
    console.log('position'+position,scoreAuth);
  if(position < 11 || scoreAuth === 'ignore'){
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
  }else{
    return msg.channel.send({embed:{
      author:{name:msg.guild.name,
        icon_url: msg.guild.iconURL},
      url: "https://tenor.com/view/hang-noose-hanging-daylight-gif-15303115",
      description: "Score is calculated based on tries left at the end of game",
      // color:"3447003",
      title:'Hangman Leaderboard',
      color:'332391',
      fields:[
        {name:"Name",value:userNames,inline:true},
        {name:"Score",value:score,inline:true},
        {name:"You",value:`\`{position}\`${msg.author.username}`,inline:true},
        {name:'score',value:`${scoreAuth}`}
      ],
      timestamp: new Date(),
    footer: {
      icon_url: msg.author.avatarURL,
      text: "© hangman"
    }
    }
  })
  }
};
exports.helpMessage = (msg,prefix) => {
  console.log('embed'+prefix)
    return msg.channel.send({
      embed:{
        author:{name:msg.guild.name,
          icon_url: msg.guild.iconURL},
        url: "https://top.gg/bot/839057473289322496",
        description: "Score is calculated based on 'tries left' at the end of game\n[[invite]](https://discord.com/oauth2/authorize?client_id=839057473289322496&permissions=8&scope=bot) [[vote]](https://top.gg/bot/839057473289322496/vote)",
        title:'  \n \n Command List ',
        color:'332391',
        fields:[
          {name:"Game description",value:'hangman is a game where you will have 7 tries to guess a movie name \n there is a 20sec gap between each try',inline:false},
          {name:`${prefix}hangman`,value:'play either single player or 2player in hangman',inline:false},
          {name:`${prefix}score me`,value:'get your individual score from the leaderboard'},
          {name:`${prefix}lederboard`,value:'check the leaderboard for your server'},
          {name:`${prefix}config`,value:'change prefix for your server ,default[-]'},
          {name:`${prefix}help`,value:'get the list of commands'},
          {name:`support`,value:'join the support server [support](https://discord.gg/z5hVMJmEQS)'},
          
          
          // {name:"vennu",value:'im the true liar',inline:true},
          // {name:'wilbur',value:'experience the cobra cobra',inline:true},
        ],
        timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL,
        text: "© hangman"
      }
      }
    });
};
exports.singleUserData = (msg,score,position) => {
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
      {name:"LeaderBoard position",value:`${position}`,inline:true}
    ],
    timestamp: new Date(),
  footer: {
    icon_url: msg.author.avatarURL,
    text: "© hangman"
  }
  }
})
}


exports.simpleTextEmbed = (msg,name,value,) => {
  return msg.channel.send({embed:{
    fields:[
      {name:name,value:value,inline:false},
    ]  
  }
})
}


exports.textFileEmbed = (msg,name,value,fileUrl) => {
  return msg.channel.send({embed:{
    image:  {
      url: `${fileUrl}`
  }, 
    fields:[
      {name:name,value:value,inline:false},
    ]  
  }
})
}

exports.urlFileEmbed = (msg,name,value,locFile) => {
    extended = locFile.split('/')
    extendedUrl = extended[extended.length-1]
    console.log(extendedUrl,locFile);
  return msg.channel.send({embed:{
    image:  {
      url: `attachment://${extendedUrl}`
  }, 
    fields:[
      {name:name,value:value,inline:false},
    ]  
  },files:[`${locFile}`]})
}