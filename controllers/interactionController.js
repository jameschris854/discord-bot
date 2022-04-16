const lbMessageHandler = require('../messagehandlers/lbMessageHandler');
const messageEmbeds = require('../utils/messageEmbeds')
const { hangmanInteractionHandler } = require("../interactionHandlers/interactionHandlers");

exports.interactionHandler = async interaction => {
    if(!interaction.isCommand()) return
    console.log(interaction)
  
    const {commandName,options} = interaction
  
    console.log('opt',options)
  
    if(commandName === 'hangman') {
      hangmanInteractionHandler(interaction,null)
    }
  
    if(commandName === 'leaderboard') {
      const data = await lbMessageHandler.showLeaderBoard(interaction,interaction.user)
      messageEmbeds.leaderBoardEmbed(interaction,data,interaction.user.id)
    }
  
  }