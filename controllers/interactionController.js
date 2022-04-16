const lbMessageHandler = require('../messagehandlers/lbMessageHandler');
const messageEmbeds = require('../utils/messageEmbeds')
const { hangmanInteractionHandler } = require("../interactionHandlers/interactionHandlers");
const { SCORE_ME, LEADER_BOARD, HANGMAN } = require('../utils/constants');

exports.interactionHandler = async interaction => {
    if(!interaction.isCommand()) return
    console.log(interaction)
  
    const {commandName,options} = interaction
  
    console.log('opt',options)
    
    if(commandName === HANGMAN) {
      hangmanInteractionHandler(interaction,null)
    } else if(commandName === LEADER_BOARD) {
      const data = await lbMessageHandler.showLeaderBoard(interaction,interaction.user)
      messageEmbeds.leaderBoardEmbed(interaction,data,interaction.user.id)
    }else if(commandName === SCORE_ME){
      lbMessageHandler.isDbCreated(interaction)
      let userData =await lbMessageHandler.singleUserScore(interaction,interaction.user)
      messageEmbeds.singleUserData(interaction,userData[0],userData[1])
    }
  
  }