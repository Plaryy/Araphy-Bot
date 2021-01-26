const Discord = require('discord.js')
const fs = require('fs');


const araphy = new Discord.Client();
araphy.commands = new Discord.Collection();
araphy.extensions = new Discord.Collection();


const evLoad = fs.readdirSync(`./events`).filter(file => file.endsWith(`.js`));
let evLoaded = 0;
let evFailed = 0;
for (const ev of evLoad) {
    try {
        const event = require(`./events/${ev}`);
        evLoaded += 1;
        console.log(`Event ${ev} loaded.`);
        let evName = ev.split(`.`)[0];
        araphy.on(evName, event.bind(null, araphy));
        delete require.cache[require.resolve(`./events/${ev}`)]
    } catch(err) {
        console.log(`Failed to load event ${ev}. Error message: ${err.message}`)
        evFailed += 0;
    }
}
console.log(`------------------------------------------`)
let evSum = evLoaded + evFailed;
console.log(`STATUS: EVENTS LOADED`);
console.log(`${evLoaded}/${evSum} total events loaded.`);
console.log(`------------------------------------------`)

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
console.log(`------------------------------------------`)
let cmdSum = cmdLoaded + cmdFailed;
console.log(`STATUS: COMMANDS LOADED`)
console.log(`${cmdLoaded}/${cmdSum} total commands loaded.`);
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
console.log(`------------------------------------------`)
let extSum = extLoaded + extFailed;
console.log(`STATUS: EXTENSIONS LOADED`);
console.log(`${extLoaded}/${extSum} total extensions loaded.`)
console.log(`------------------------------------------`)

//token goes here
araphy.login(token);