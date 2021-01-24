module.exports = {
    extName: "autoresponse",
    execute(message) {
        console.log(message.content);
        if (message.content.startsWith(`beep`)) {
            console.log(`Someone said beep`);
            message.reply(`boop`);
        } else if (message.content.startsWith(`foo`)) {
            message.reply(`bar`);
        }
    },
}