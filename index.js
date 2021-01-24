const Discord = require('discord.js')
const fs = require('fs');
const {token , favColor, araphyColor} = require('./botconfig.json');
const prefix = "a!";

const araphy = new Discord.Client();
araphy.commands = new Discord.Collection();
araphy.extensions = new Discord.Collection();

// fetching cmd files
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
console.log(`STATUS: COMMANDS LOADED.`)
// https://hastebin.com/owefonosah.typescript
console.log(`------------------------------------------`)

// fetching extensions
const extFile = fs.readdirSync(`./araphyExtension`).filter(file => file.endsWith(`.js`));
let extLoaded = 0;
let extFailed = 0;
for (const ext of extFile) {
    try {
        const extension = require(`./araphyExtension/${ext}`);
        araphy.extensions.set(extension.extName, extension);
        extLoaded += 1;
        console.log(`[${extLoaded}] EXTENSION ${ext} loaded.`)
    } catch(err) {
        console.log(`ERROR on EXTENSION ${ext}. Error message:`);
        console.log(err);
        extFailed += 1;
    }
}
console.log(`STATUS: EXTENSIONS LOADED.`)


// bot alive
araphy.on('ready', async => {
    let cmdSum = cmdLoaded + cmdFailed;
    let extSum = extLoaded + extFailed;
    let fileSum = cmdLoaded + extLoaded;
    let fileTotal = cmdSum + extSum;
    console.log(`------------------------------------------`)
    console.log(`${cmdLoaded}/${cmdSum} commands LOADED.`);
    console.log(`${extLoaded}/${extSum} extensions LOADED.`);
    console.log(`------------------------------------------`);
    console.log(`Total files loaded: ${fileSum} out of ${fileTotal}`);
    console.log(`STATUS: BOT is now ONLINE`);
    araphy.user.setPresence( {
        activity: {
            name: 'Drinking tea while monitoring the server!'
        },
        status: 'idle'
    })
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
    if (!command) {
        const extension = araphy.extensions.find(exteName => exteName.extName);
        extension.execute(message, args);
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


    
});

//token goes here
araphy.login("Nzc5NzU0OTQ0Mjk4MjIxNjAw.X7lJYQ.-wM79_klqKeybvMfXNnnjUGVcbE");