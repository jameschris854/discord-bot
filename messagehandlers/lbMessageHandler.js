const mongoose = require('mongoose');
const { findOneAndUpdate } = require('../leaderBoard/leaderBoardSchema');

const lbSchema = require('../leaderBoard/leaderBoardSchema')

exports.isDbCreated = async(guildId) => {
    let data = await lbSchema.findOne({_guildId:guildId})

    if(data){
        console.log('lbPresent');
    }else{
        await lbSchema.create({_guildId:guildId,guildMembers:{}})
        console.log('lbCreated');
    }
}

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

    return data = data.guildMembers [user]
}




exports.updateUserScore= async (guildId,userId,gamePoint,state) => {
    console.log(guildId,userId,gamePoint);
    let data = await lbSchema.findOne({_guildId:guildId})
    // console.log(data);
    console.log(data.guildMembers )
    console.log(userId in data.guildMembers);
    //////////////////check if user exist/////////////////////
    if(userId in data.guildMembers == false){
        console.log(userId)
        let newUserData = {}
        let key = userId
        
        newUserData[key] = 0

        console.log(newUserData);
        Object.assign(data.guildMembers,newUserData)
        console.log('merge'+data.guildMembers);
        let updated = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildMembers:data.guildMembers},{returnOriginal:false})
        console.log(updated);
        console.log('creating user');

    }
    if(state === 'win'){
        console.log(userId);
        score = data.guildMembers [userId] 
        score = score+gamePoint
        console.log(data.guildMembers);
        data.guildMembers [userId] = score
        console.log('updating');
        let updated = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildMembers:data.guildMembers},{returnOriginal:false})
        console.log(updated);
    }
}