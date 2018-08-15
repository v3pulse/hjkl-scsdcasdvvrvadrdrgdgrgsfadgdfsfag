const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("to your commands!", {type: "LISTENING"});
});

bot.on("guildMemberAdd", function(member) {
	member.guild.channels.find("name", "chat").sendMessage(member.toString() + "Welcome to Small Scrims Discord!");
    member.addRole(member.guild.roles.find("name", "Scrimmer"));
});



bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = "!";
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	
	if(cmd === `${prefix}region`){
	message.reply("Command not set - Ask Admin to set Region");

	

	
	return;
}

	if(cmd === `${prefix}fortnite`) {
	message.reply("BOOM!");
	const apikey = require(process.env.APIKEY);
	const fortnite = require("fortnite");
	const ft = new Fortnite(process.env.APIKEY);
	
	let username = args[0]
	let platform = args[1] || "pc";

	let data = ft.getInfo(username, platform).then(data => {

		let stats = data.lifetimeStats;

		let kills = stats.find(s => s.stat == "kills");
		let wins = stats.find(s => s.stat == "wins");
		let kd = stats.find(s => s.stat == "kd");
		let mPlayed = stats.find(s => s.stat == "matchesPlayed");
		let tPlayed = stats.find(s => s.stat == "timePlayed");

		let fortniteEmbed = new Discord.RichEmbed()
		.setTitle("Fortnite Stats")
		.setAuthor(data.username)
		.setColor()
		.addField("Kills", kills.value, true)
		.addField("Wins", wins.value, true)
		.addField("KD", kd.value, true)
		.addField("Matches Played", mPlayed.value, true)
		.addField("Time Played", tPlayed.value, true);

		message.channel.send(fortniteEmbed);

	
	}).catch(e => {
	console.log(e);
	message.channel.send("Couldnt find user");
	});
	
	return;
}

	if(cmd === `${prefix}iwon`) {
	message.reply("won, is this true Pulse? (Y/N)");
	
	
	return;
}

	if(cmd === `${prefix}yes` && message.member.hasPermissions("ADMINISTRATOR")){
	message.channel.send("Congrats on the win! Your stats will be displayed on the leaderboards!");
	
	return;
}

	if(cmd === `${prefix}no` && message.member.hasPermissions("ADMINISTRATOR")) {
	message.channel.send("Please do not lie about wins, this will get you banned.");
	
	return;
}




	if(cmd === `${prefix}start` && message.member.hasPermissions("ADMINISTRATOR")) {
	let startEmbed = new Discord.RichEmbed()
	.addField("Bot", "Type your last 3 digits in chat now!")
	.setColor(6812512);
	message.channel.send(startEmbed);
	message.delete().catch(O_o=>{});

	
	return;
}

	if(cmd === `${prefix}cls` && message.member.hasPermissions("ADMINISTRATOR")) {
	message.channel.bulkDelete(10);
	message.channel.send(`Cleared recent messages.`).then(msg => msg.delete(1000));
	
	return;
}

	if(cmd === `${prefix}end` && message.member.hasPermissions("ADMINISTRATOR")) {

	message.channel.bulkDelete(10);
	message.channel.send(`Scrims Ended....`).then(msg => msg.delete(1000));
	let endEmbed = new Discord.RichEmbed()
	.addField("Game Info", "Games have now ended, please type !iWon if you Won your Match.")
	.setColor(6812512);

	message.channel.send(endEmbed);

		
	return;
}

	if(cmd === `${prefix}say` && message.member.hasPermissions("ADMINISTRATOR")) {
	let sayEmbed = new Discord.RichEmbed()
	.addField("Game Info", `Code: ${args[0]}`)
	.addField("\u200b", args[1])
	.setColor(6812512);

	message.channel.send(sayEmbed);
	message.delete()
	.catch(console.error);
	
	return;
}
	
	

	if(cmd === `${prefix}hacked`) {
	let hackedEmbed = new Discord.RichEmbed()
	.addField("Hacked", "The reason the previous discord was hacked is because Pulse is an idiot and leaked the token :cry:")
	.setColor(6812512);

	message.channel.send(hackedEmbed);

	return;
}
	
	

	

	if(cmd === `${prefix}starting` && message.member.hasPermissions("ADMINISTRATOR")) {
	let startingEmbed = new Discord.RichEmbed()
	.addField("ScrimBot", "Scrims starting soon! @everyone")
	.setColor(6812512);

	message.channel.send(startingEmbed);
	
	return;
}



	if(cmd === `${prefix}invite`) {
	let inviteEmbed = new Discord.RichEmbed()
	.addField("Invite Link", "https://discord.gg/ggPntHV")
	.setColor(6812512);
	
	message.channel.send(inviteEmbed);
	
	
	return;
}

	if(cmd === `${prefix}help`) {
	
	let helpEmbed = new Discord.RichEmbed()
	.addField("Commands", "User Commands", true)
	.addField("Other", "Commands", true)
    	.addField("!help", "Help Command", true)
  	.addField("!starting", "Starting Scrims", true)
    	.addField("!ping", "Ping Command", true)
    	.addField("!cls", "Clears messages(10)", true)
   	.addField("!invite", "Makes Invite", true)
  	.addField("!start", "Start Scrims", true)
    	.addField("!report", "Report player", true)
    	.addField("!end", "End Scrims", true)
    	.addField("!info", "Show Info", true)
    	.addField("!say", "Control Bot", true)
    	.addField("!botinfo", "Show Bot Info")
    	.addField("!hacked", "Old Discord")
    	.addField("!region", "Sets ur region")
    	.addField("!fortnite", "Tracks a user")
	.setFooter("You executed the !help command with ScrimBot!")
   	.setColor(6812512);

	message.channel.sendEmbed(helpEmbed);
	
	return;
}

	


	if(cmd === `${prefix}report`){
	
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find the specified user.");
	
	let reason = args.join(" ").slice(22);

	let reportEmbed = new Discord.RichEmbed()
	.setDescription("Reports")
	.setColor(6812512)
	.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
	.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);


	let reportschannel = message.guild.channels.find(`name`, "reports");
	if(!reportschannel) return message.channel.send("Couldn't find reports channel");
	
	message.delete().catch(O_o=>{});
	message.reply("Your report has been sent!");
	reportschannel.send(reportEmbed);


	return;
}





	if(cmd === `${prefix}info`) {

	let sicon = message.guild.iconURL;
	let serverembed = new Discord.RichEmbed()
	.setColor(6812512)
	.setThumbnail(sicon)
	.addField("Server Name", message.guild.name, true)
	.addField("Created On", message.guild.createdAt, true)
	.addField("You joined", message.member.joinedAt, true)
	.addField("You", message.author, false);



	return message.channel.send(serverembed);

}


	if(cmd === `${prefix}botinfo`){
		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("Bot Information")
		.setColor(6812512)
		.setThumbnail(bicon)
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt);

		return message.channel.send(botembed);

	}
});




bot.login(process.env.BOT_TOKEN);
