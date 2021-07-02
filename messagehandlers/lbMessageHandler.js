const mongoose = require('mongoose');
const { findOneAndUpdate } = require('../model/leaderBoardSchema');
const bot = require('../server')

const lbSchema = require('../model/leaderBoardSchema')

exports.isDbCreated = async(msg) => {
    let data = await lbSchema.findOne({_guildId:msg.guild.id})

    if(data){
        console.log('lbPresent');
    }else{
        await lbSchema.create({_guildId:msg.guild.id,guildName:msg.guild.name,guildMembers:{}})
        console.log('lbCreated');
    }
}
exports.createTestGuild = async (data) => {
    let doc = await lbSchema.create(data)
    console.log(doc);
}
exports.showLeaderBoard = async (msg) => 
{
    let guildId = msg.guild.id
    let data = await lbSchema.findOne({_guildId:guildId})
    let author = msg.author.id
    let position = 0;
    let scoreAuth = 'ignore'
    console.log('show leaderboard');
    o = data.guildMembers
    console.log(o)
    if(Object.keys(o).length === 0){
      return ['no games played','0',scoreAuth,position]
    }

    sortedMembers = Object.entries(o).sort((a,b) => {
        if(b[1] > a[1]) return 1;
        else if(b[1] < a[1]) return -1;
        else{
          if(a[0]>b[0]) return 1;
        else if(a[0] < b[0]) return -1;
        else return 0
        }
      })
    members = sortedMembers

    let userNames = ''
    let score = ''
    scores = []  
    for(let i =0 ;i<members.length;i++){
         if(members[i][0] === author ){
             position = i+1
             scoreAuth = members[i][1]
         }
        console.log(members[i][0]);
        currentUser = await bot.users.fetch(members[i][0])
        currentUserName = currentUser.username
        members[i][0] = currentUserName
        if(i<10){
            userNames += `\`${i + 1}\`   ${members[i][0]}\n`;
        score += `\`${members[i][1]}\`\n`;
    }
      }
      console.log(position);
      if(!scoreAuth){
          scoreAuth = 'ignore'}
      return [userNames,score,scoreAuth,position]
}



exports.singleUserScore = async (msg,user) => {
    let data = await lbSchema.findOne({_guildId:msg.guild.id})
    console.log('show leaderboard');
    o = data.guildMembers
    sortedMembers = Object.entries(o).sort((a,b) => {
        if(b[1] > a[1]) return 1;
        else if(b[1] < a[1]) return -1;
        else{
          if(a[0]>b[0]) return 1;
        else if(a[0] < b[0]) return -1;
        else return 0
        }
      })
    members = sortedMembers
      if(!members[0]){
      return ['no games played','0']
    }
    console.log(members,user);
    for(let i =0 ;i<members.length;i++){
        if(members[i][0] === user ){
            position = i+1
        }
    }
    console.log(position);
    // data = data.guildMembers.user
    console.log(data);

    return data = [data.guildMembers [user],position]
}




exports.updateUserScore= async (guildId,userId,gamePoint,state) => {
    console.log(guildId,userId,gamePoint);
    let data = await lbSchema.findOne({_guildId:guildId})
    // console.log(data);
    console.log(data.guildMembers )
    console.log(userId in data.guildMembers);
    //////////////////check if user exist/////////////////////
    if(userId in data.guildMembers == false)
    {
        console.log(userId)
        let newUserData = {}
        let key = userId
        newUserData[key] = 0
        console.log(newUserData);
        Object.assign(data.guildMembers,newUserData)
        console.log('merge'+data.guildMembers);
        let updated = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildMembers:data.guildMembers},{returnOriginal:false})
        console.log(updated)
        console.log('creating user');
    }
    if(state === 'win')
    {
        console.log(userId);
        score = data.guildMembers [userId] 
        score = score+gamePoint
        console.log(data.guildMembers);
        data.guildMembers [userId] = score
        console.log('updating');
        let updated = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildMembers:data.guildMembers},{returnOriginal:false})
        
        console.log(updated)
    }
}