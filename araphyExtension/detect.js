module.exports = {
    extName: `detect`,
    execute(message, args) {
        if (message) {
            console.log(`someone has sent a message`);
            console.log(message.content);
        }
    },
}