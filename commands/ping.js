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

        let uptimeln;
        if (days) uptimeln += `${days} Days`;
        if (hours) uptimeln += ` ${hours} Hours`;
        if (minutes) uptimeln += ` ${minutes} Minutes`
        uptimeln += ` ${seconds} Seconds`;

        function uptimeStats(status) {
            uptimeEmbed = new Discord.MessageEmbed()
            .setColor(araphyColor)
            .setTitle(`Current Bot Uptime`)
            .addField(`API Ping/Latency`, `${message.client.ws.ping}ms`)
            .addField(`Host/Machine Latency`, status)
            .addField(`Deployed at`, message.client.readyAt)
            .addField(`Uptime`, uptimeln)
            .setTimestamp()

            return uptimeEmbed;
        }

        let fetchStats = uptimeStats('Fetching...');

        message.channel.send(fetchStats).then(msg => {
            let afterPing = msg.createdTimestamp - message.createdTimestamp;
            fetchStats = uptimeStats(`PONG: ${afterPing}ms`);
            msg.edit(fetchStats);
        })

        
    },
}