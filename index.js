const Discord = require('discord.js')
const fs = require('fs');
const {favColor, araphyColor, prefix} = require('./botconfig.json');

const araphy = new Discord.Client();
araphy.commands = new Discord.Collection();

// fetching files
const cmdFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
let cmdLoaded = 0;
let cmdFailed = 0;
for (const file of cmdFiles) {
    try {
        const command = require(`./commands/${file}`);
        araphy.commands.set(command.name, command);
        cmdLoaded += 1;
        console.log(`${cmdLoaded} commands loaded.`)
    } catch(err) {
        console.log(`ERROR on ${file} file. Error message: ${err.message}`);
        cmdFailed += 1;
    }
};
console.log(`COMMANDS LOADED.`)


// bot alive
araphy.on('ready', async => {
    console.log(`\nAraphy bot is now awake! (${cmdLoaded} out of ${cmdLoaded + cmdFailed} commands loaded)`);
    araphy.user.setPresence( {
        activity: {
            name: 'Drinking tea while monitoring the server!'
        },
        status: 'idle'
    })
});

araphy.on(`guildMemberAdd`, member => {
    const genChat = member.guild.channels.cache.find(ch => ch.name === `╔-general-discussion`);
    if (!genChat) return console.log(`error`);
    genChat.send(`**Welcome to the server, ${member}! We hope you enjoy your stay!**`)
});

araphy.on('message', async (message) => {

    //if (message.author.id != '152976541373038592') return;
    if (message.author.bot) return;
    console.log(`[${message.channel.name}]` + message.author.username + `: ` + message.content);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    // importing commands
    const command = araphy.commands.get(cmdName)
        || araphy.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if (!command) return;
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguements, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    };

    try {
        command.execute(message, args);
    } catch (err) {
        console.log(err);
        message.channel.send(`There was an error while trying to run the command`);
    }

    // framework to work only inside Araphy server
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
                                araphy.channels.cache.get(chaSend).send(annouceText, {
                                    files: [url]
                                }).then(e => {
                                    afterPost(e);
                                });
                            // if message doesn't have an attachment
                            } else {
                                message.delete();
                                araphy.channels.cache.get(chaSend).send(annouceText).then(e => {
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


    /* other server mainframe goes here
    dont put lengthy commands here
    */
    
});


//token goes here
araphy.login(process.env.token);