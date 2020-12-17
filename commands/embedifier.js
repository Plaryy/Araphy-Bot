const araphyColor = `#02fcb6`;
const Discord = require(`discord.js`)
module.exports = {

    name: 'embedifier',
    aliases: ['embed','embedify'],
    description: 'FOR PLARY ONLY: Embeds messages directly from code.',
    args: false,
    execute(message, args) {
        message.delete();
        embedify = new Discord.MessageEmbed()
        .setColor(araphyColor)
        .setDescription(`Text goes here`)
        message.channel.send(embedify);
    },
};