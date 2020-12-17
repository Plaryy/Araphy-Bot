module.exports = {
    name: `say`,
    args: true,
    aliases: [`parrot`, `talk`],
    usage: `<text messages>`,
    description: `A command for the bot to say any text.`,
    execute(message, args) {
        let text = args.join(` `);
        message.delete();
        message.channel.send(text);
    },
}