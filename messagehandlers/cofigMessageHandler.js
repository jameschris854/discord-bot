const lbSchema = require('../model/leaderBoardSchema')


exports.getGuildPrefix = async (guildId) => {
    let data = await lbSchema.findOne({_guildId:guildId})

    let prefix = data.guildPrefix
    return prefix
    console.log('prefix:',prefix);
}

exports.changePrefix =async  (guildId,msg,filter) => {
    msg.channel.send(`\`\`                 🤖    CONFIG    🤖  \n Enter new prefix for your server: \`\``);
      newPrefix = await msg.channel.awaitMessages(filter,{
        time:30000,
        maxMatches: 1,
        errors: ["time"],
      });
      newPrefix = newPrefix.first()
      newPrefix = newPrefix.content
        let updated = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildPrefix:newPrefix},{returnOriginal:false})
        console.log(updated);
        console.log('updating prefix');
        msg.channel.send(`updated prefix successfully\nNew server prefix is ${newPrefix}`);
}