module.exports = {
    name: 'args-info',
    args: true,
	description: 'Information about the arguments provided.',
	usage: `<any messages>`,
	execute(message, args) {
        if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};