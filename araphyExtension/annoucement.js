const Discord = require(`discord.js`);
const araphyColor = `#02fcb6`;
module.exports = {
    extName:  `annouce`,
    execute(message, args) {
        if (message.guild.id == `756776611172581477`) {
            //making a push annoucement channel
    
            const chaReceive = `785071650068496394`;
            const chaSend = `760383163058487356`;
    
            if (message) {
                if (message.channel.id == chaReceive) {
                    //creating an annoucement embed function
                    function afterPost(prop) {
                        annouceEmbed = new Discord.MessageEmbed()
                            .setColor(araphyColor)
                            .setTitle(`Annoucement has been sent ✅`)
                            .setDescription(`[Message Link Here.](${prop.url})`)
                            .addField(`Message Author`, `<@${message.author.id}>`)
                            .addField(`Annoucement ID: ${prop.id}`, `Edit feature coming soon!`)
                            .setFooter(`Annoucement has been made on ${prop.createdAt}`)
    
                            return message.channel.send(annouceEmbed);
                    }
                    // reacting to message
                    message.react(`✅`).then(() => message.react(`❎`));
                    // filtering reactions
                    const filter = (reaction, user) => {
                        return [`✅`, `❎`].includes(reaction.emoji.name) && user.id == message.author.id;
                    }
                    message.awaitReactions(filter, { max: 1, time: 10000, errors: [`time`] })
                        .then(collected => {
    
                            const reaction = collected.first();
    
                            // if user press tick
                            if (reaction.emoji.name == `✅`) {
                                let annouceText = message.content;
                                // if message has an attachment
                                if (message.attachments.first()) {
                                    let url = message.attachments.first().proxyURL;
                                    message.delete();
                                    message.client.channels.cache.get(chaSend).send(annouceText, {
                                        files: [url]
                                    }).then(e => {
                                        afterPost(e);
                                    });
                                // if message doesn't have an attachment
                                } else {
                                    message.delete();
                                    message.client.channels.cache.get(chaSend).send(annouceText).then(e => {
                                        afterPost(e); // afterpost
                                    });
                                }
                            // if user cancel
                            } else {
                                message.reply(`Text has been cancelled ❎.`).then(e => { e.delete({timeout: 5000})});
                            };
                        })
                        .catch(collected => {
                            message.channel.send(`Timeout error: You took too long to react.`).then(e => { e.delete({timeout: 5000})});
                            console.log(collected);
                        })
                }
            } 
            // end of push annoucement feature
        };
    
    },
}