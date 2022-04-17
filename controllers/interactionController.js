const lbMessageHandler = require('../messagehandlers/lbMessageHandler');
const messageEmbeds = require('../utils/messageEmbeds')
const { hangmanInteractionHandler } = require("../interactionHandlers/interactionHandlers");
const { SCORE_ME, LEADER_BOARD, HANGMAN, HELP ,CONFIG, MULTI_PLAYER, SINGLE_PLAYER, CATEGORY } = require('../utils/constants');
const configInteractionHandler = require('../interactionHandlers/configInteractionHandler');

exports.interactionHandler = async interaction => {
    if(!interaction.isCommand()) return
    console.log(interaction)
  
    const {commandName,options} = interaction
    interaction.user.avatarURL = `https://cdn.discordapp.com/avatars/390758809930301440/${interaction.user.avatar}.webp`
    
    if(commandName === HANGMAN) {
      if(interaction.options.getSubcommand() === SINGLE_PLAYER){
        const cat = interaction.options.getString(CATEGORY)
        hangmanInteractionHandler(interaction,cat)
      }else if(interaction.options.getSubcommand() === MULTI_PLAYER){
        hangmanInteractionHandler(interaction,null)
      }
    } else if(commandName === LEADER_BOARD) {
      const data = await lbMessageHandler.showLeaderBoard(interaction,interaction.user)
      messageEmbeds.leaderBoardEmbed(interaction,data,interaction.user.id)
    }else if(commandName === SCORE_ME){
      let userData = await lbMessageHandler.singleUserScore(interaction,interaction.user.id)
      messageEmbeds.singleUserData(interaction,userData[0],userData[1],interaction.user)
    }else if(commandName === HELP){
      messageEmbeds.helpMessage(interaction,prefix)
    }else if(commandName === CONFIG){
      let filter = (m) => m.author.id === interaction.user.id;
      configInteractionHandler.changePrefix(interaction.guild.id,interaction,filter)
    }
  
  }