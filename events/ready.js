module.exports = (araphy) => {
    araphy.user.setPresence({
        activity: {
            name: `Drinking tea while monitoring this server!`
        },
        status: `idle`
    });
    console.log(`Bot ready.`);
}