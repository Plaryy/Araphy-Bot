const Discord = require('discord.js');
const id = '152976541373038592';
const beautify = require('beautify');
const araphyColor = '#02fcb6';

module.exports = {
    name: "eval",
    aliases: ["evaluate", "e"],
    description: "This command is only for me (plary) for commands testing",
    usage: "[Javascript command]",
    execute(message, args) {
        if (message.author.id != id) return;

            function clean(text) {
                if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
            return text;
    }

    try {
        let toEval = args.join(" ");
        let evaluated = eval(toEval);
        embed = new Discord.MessageEmbed()
            .setColor(araphyColor)
            .addField("To evaluate:", `\`\`\`js\n${beautify(toEval, { format: "js" })}\n\`\`\``)
            .addField("Evaluated:", evaluated)
            .setTimestamp()

        message.channel.send(embed);
    } catch (e) {
        message.channel.send(`Oops! I recieved an error. This is it:\n${e}`);
    }



    }
}