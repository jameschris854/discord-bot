const mongoose = require('mongoose');
const { findOneAndUpdate } = require('../leaderBoard/leaderBoardSchema');

const lbSchema = require('../leaderBoard/leaderBoardSchema')

exports.createTestGuild = async (data) => {
    let doc = await lbSchema.create(data)
    console.log(doc);
}
exports.showLeaderBoard = async (guildId) => {
    let data = await lbSchema.findOne({_guildId:guildId})
    console.log('show leaderboard');

    return Object.entries(data.guildMembers)
}
exports.singleUserScore = async (guildId,user) => {
    let data = await lbSchema.findOne({_guildId:guildId})
    // data = data.guildMembers.user
    console.log(data);
}
exports.isDbCreated = async(guildId) => {
    let data = await lbSchema.findOne({_guildId:guildId})

    if(data){
        console.log('lbPresent');
    }else{
        await lbSchema.create({_guildId:guildId})
        console.log('lbCreated');
    }
}
exports.updateUserScore= async (guildId,userId,score) => {
    userId= 'james'
    console.log(guildId,userId,score);
    let data = await lbSchema.findOne({_guildId:guildId})
    // console.log(data);
    console.log(data.guildMembers.userId)
    if(!data.guildMembers.userId){
        console.log('add user to leaderboard');
    }else{
        data = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildMembers:{userId:0}})

    }
}