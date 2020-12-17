module.exports = {
    name: `test`,
    aliases: [`bump`],
    execute(message) {
        message.client.emit(`guildMemberAdd`, message.member)
    },
}