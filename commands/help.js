const Discord = require(`discord.js`);
const {prefix, araphyColor} = require(`../botconfig.json`);
module.exports = {
    name: `help`,
    aliases: [`commands`],
    description: `list of all available commands`,
    usage: `[command name]`,
    execute(message, args) {
        const data = [];
        const extension = [];
        const { commands, extensions } = message.client;

        if (!args.length) {
            data.push(commands.map(command => command.name).join(`, `));
            extension.push(extensions.map(extension => extension.extName).join(`, `));
            let cmdName = commands.map(cmd => cmd.name);
            helpEmbed = new Discord.MessageEmbed()
                .setTitle(`List of all available commands!`)
                .setColor(araphyColor)
                .setDescription("`" + data + "`")
                .addField(`Extensions`, "`" + extension + "`")
                .setFooter(`Total commands: ${cmdName.length}`)

            return message.author.send(helpEmbed)

            .then(() => {
                if (message.channel.type === `dm`) return;
                message.channel.send(`Help has been sent to your DMs!`);
            })
            .catch(err => {
                console.error(`Could not send message to a DMs.`, err);
                message.channel.send(`Could not DM you. Try turning on your DMs.`)
            })


        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) return message.reply(`That is not a valid command!`)
        
        // pushing info 
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(`, `)}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${command.usage}`);

        helpDetails = new Discord.MessageEmbed()
            .setColor(araphyColor)
            .setTitle(`Help for ${command.name} command`)
            .addField(`Details`, data)
            .setTimestamp()

        return message.channel.send(helpDetails)
        
    },
}