module.exports = {
	name: 'reload',
    description: 'Reloads a command',
    usage: '<command name>',
    args: true,
	execute(message, args) {
        const cmdName = args[0].toLowerCase();
        const command = message.client.commands.get(cmdName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
        if (!command) {
            message.channel.send(`There is no command or alias named ${cmdName}.`)
        };
        // delete the command requested
        delete require.cache[require.resolve(`./${cmdName}.js`)];
        // reloading the new command

        try {
            const newCmd = require(`./${cmdName}.js`);
            message.client.commands.set(newCmd.name, newCmd);
        } catch (err) {
            console.log(err);
            message.channel.send(`An error orccured while reloading the command. Err: ${err.message}`);
        }

        // informing the user the file has been reloaded
        console.log(message.client.ws.ping)
        message.channel.send(`Command "${cmdName}" has successfully been reloaded in ${message.client.ws.ping}ms.`);
	},
};
