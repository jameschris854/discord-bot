const lbSchema = require('../model/leaderBoardSchema')

exports.changePrefix =async  (guildId,msg,filter) => {
    try{
    if (msg.member.permissions.has("ADMINISTRATOR")) {
       console.log('THIS USER HAS ADMINISTRATOR PERMISSIONS!')
    }else{
       msg.channel.send(`you have to be an admin to change prefix:detective: `)
       return null
    }
      msg.reply(`\`\`                 🤖    CONFIG    🤖                  \n Enter new prefix for your server:                    \`\``)
      newPrefix = await msg.channel.awaitMessages({filter,
        max: 1,
        time:30000,
        errors: ["time"]
      });


      newPrefix = newPrefix.first()

      newPrefix = newPrefix.content
      if(newPrefix.split('').length > 3 || !newPrefix) throw('too long')
        let updated = await lbSchema.findOneAndUpdate({_guildId:guildId},{guildPrefix:newPrefix},{returnOriginal:false})
        console.log(updated);
        console.log('updating prefix');
        msg.channel.send(`updated prefix successfully\nNew server prefix is ${newPrefix}`);
      }catch(err){
        console.log(err);
        if(err === 'too long'){
          msg.channel.send('prefix length cannot be more than 3')
        } else {
          msg.channel.send('you took too long to respond,try again:no_mouth:')
        }
      }
}