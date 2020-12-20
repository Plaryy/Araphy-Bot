const Discord = require(`discord.js`);
const { araphyColor } = require(`../botconfig.json`);
module.exports = {
    name: `ping`,
    aliases: [`uptime`,`check`],
    description: `Checks uptime and ping of the bot.`,
    execute(message) {

        let totSec = message.client.uptime / 1000;
        let days = Math.floor(totSec / 86400);
        totSec %= 86400;
        let hours = Math.floor(totSec / 3600);
        totSec %= 3600;
        let minutes = Math.floor(totSec / 60);
        let seconds = Math.floor(totSec % 60);

        let uptimeln = `Current Uptime:`;
        if (days) uptimeln += `${days} Days`;
        if (hours) uptimeln += `${hours} Hours`;
        if (minutes) uptimeln += `${minutes} Minutes`;

        uptimeEmbed = new Discord.MessageEmbed()
        .setColor(araphyColor)
        .setTitle(`Bot uptime!`)
        .addField(`Current Ping`, message.client.ws.ping)
        .addField(`Uptime`, uptimeln)
        .setTimestamp()

        return message.channel.send(uptimeEmbed);

        
    },
}