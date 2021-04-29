const  mongoose = require('mongoose')

const leaderBoardSchema = new mongoose.Schema({
    _guildId:{
        type:String,
        required:[true,'_guildId is either undefined or not provided']
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      guildMembers:{
          type:Object,
      }
},
{ minimize: false },
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


const lbSchema = mongoose.model('leaderBoardSchema',leaderBoardSchema)

module.exports = lbSchema;
