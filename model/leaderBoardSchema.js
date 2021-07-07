const  mongoose = require('mongoose')

const leaderBoardSchema = new mongoose.Schema({
    _guildId:{
        type:String,
        required:[true,'_guildId is either undefined or not provided']
    },guildName:{
      type:String,
      required:[true,'guild name must be specified']
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      guildPrefix:{
          type:String,
          default:'-'
},
      guildMembers:{
          type:Object,
      },
      activeMemberCount:Number
},      
{ minimize: false },
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


const lbSchema = mongoose.model('leaderBoardSchema',leaderBoardSchema)

module.exports = lbSchema;
