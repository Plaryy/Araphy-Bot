const prefix = "a!";
module.exports = (araphy, message) => {
    if (message.author.bot) return;
    console.log(`[${message.channel.name}]` + message.author.username + `: ` + message.content);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    // importing commands
    
    const command = araphy.commands.get(cmdName)
    || araphy.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if (!command) {
        const extArray = [];
        extArray.push(araphy.extensions.map(e => e));
        extArray[0].forEach(e => {
            e.execute(message, args);
        })
    }
        
    try {
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguements, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
    
            return message.channel.send(reply);
        }
    } catch(err) {
        return;
    }
    try {
        command.execute(message, args);
    } catch (err) {
        console.log(err);
        message.channel.send(`There was an error while trying to run the command`);
    }


    
}
    
