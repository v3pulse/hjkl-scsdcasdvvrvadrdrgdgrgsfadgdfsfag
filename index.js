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

	
	if(message.channel.id === "478949150340153358") {
		if(message.author.id === "478645969328668672") {
			return;
		}else if(message.content){
		message.delete();
		}
	}
	
	

	
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
		.setColor(6812512)
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
	message.reply("won, is this true? (Y/N)");
	
	
	return;
}
	
	if(cmd === `${prefix}test` && message.member.hasPermissions("ADMINISTRATOR")) {
	const agree = "👍";
	const disagree = "👎";

	let testEmbed = new Discord.RichEmbed()
	.setTitle("[Poll]")
	.setDescription("Should we restart?")
	.setFooter("Note: The host will decide a restart!")
	.setColor(6812512);
	let msg = await message.channel.send(testEmbed);
	await msg.react(agree);
	msg.react(disagree);
		
	

	const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 20000});
	let gaymanEmbed = new Discord.RichEmbed()
	.setTitle("Voting Completed!")
	.setDescription("Here are the results!")
	.addField("\u200b", `${agree}:  ${reactions.get(agree).count-1}`)
	.addField("\u200b", `${disagree}:  ${reactions.get(disagree).count-1}`)
	.setColor(6812512);
	
	message.channel.send(gaymanEmbed);
		
		
		
	if(reactions.get(agree) >= reactions.get(disagree)) {
	let agEmbed = new Discord.RichEmbed()
	.setTitle("[Poll]")
	.setDescription("Majority would like a restart, it is up to the host for games to reset, please wait.")
	.setFooter("Poll completed")
	.setColor(6812512);
		
	message.channel.send(agEmbed);
	}else{
	let disEmbed = new Discord.RichEmbed()
	.setTitle("[Poll]")
	.setDescription("The match will NOT restart!")
	.setFooter("Poll completed")
	.setColor(6812512);
		
	message.channel.send(disEmbed);
}
		
	


	
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
	let nficon = bot.user.displayAvatarURL;
	let startingEmbed = new Discord.RichEmbed()
	.setTitle("Small Scrims Discord")
	.setThumbnail(nficon)
	.addField("Alert!", "A scrim match is starting very soon! @everyone")
	.addField("Instructions", "In the Snipe Countdown channel, a countdown will be held, press Ready on go.")
	.addField("ATTENTION:", "*When in a game type !l3 <last3 digits> in the chat so ScrimBot can put you in the game.*")
	.setFooter(`Match hosted today at ${message.createdAt}`)
	.setColor(6812512);
		
	

	message.channel.send(startingEmbed);
		

		
	
	const startTimeout = ms => new Promise(res => setTimeout(res, ms))
	await startTimeout(10000);
		
		
		
		
	let startEmbed = new Discord.RichEmbed()
	.setTitle("Waiting for Server IDs...")
	.setDescription("**Please enter the last3 digits of your server!**")
	.addField("\u200b", "When in game, find this at the top left corner of your screen.")
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

	message.channel.overwritePermissions(message.guild.id, {
	SEND_MESSAGES: true
	})
	message.channel.send("*Chat is now unlocked!*");
		
	
		
	return;
}
	

	

	if(cmd === `${prefix}last3` && message.member.hasPermissions("ADMINISTRATOR")) {

	let last3chan = message.guild.channels.find(`name`, "scrim-last3");
	let sayEmbed = new Discord.RichEmbed()
	.setTitle("Game Info")
	.addField(`${args[0] || `\u200b`}`, `${args[1] || `\u200b`}`, true)
	.addField(`${args[2] || `\u200b`}`, `${args[3] || `\u200b`}`, true)
	.addField(`${args[4] || `\u200b`}`, `${args[5] || `\u200b`}`, true)
	.addField(`${args[6] || `\u200b`}`, `${args[7] || `\u200b`}`, true)
	.addField(`${args[8] || `\u200b`}`, `${args[9] || `\u200b`}`, true)
	.addField(`${args[10] || `\u200b`}`, `${args[11] || `\u200b`}`, true)
	.addField(`${args[12] || `\u200b`}`, `${args[13] || `\u200b`}`, true)
	.addField(`${args[14] || `\u200b`}`, `${args[15] || `\u200b`}`, true)
	.setFooter("Scrims hosted by Small Scrims Discord")
	.setColor(13328335);

	last3chan.send(sayEmbed);
	message.delete()
	.catch(console.error);
		
	const timeout = ms => new Promise(res => setTimeout(res, ms))
	await timeout(7000);

	const agree = "👍";
	const disagree = "👎";

	let testEmbed = new Discord.RichEmbed()
	.setTitle("[Poll] Should We Restart?")
	.setDescription("Please vote below.")
	.setFooter("**Note: The host will decide a restart!**")
	.setColor(16097625);
	let msg = await last3chan.send(testEmbed);
	await msg.react(agree);
	msg.react(disagree);
		
	

	const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 20000});
	let gaymanEmbed = new Discord.RichEmbed()
	.setTitle("Voting Completed!")
	.setDescription("Here are the results!")
	.addField("\u200b", `${agree}:  ${reactions.get(agree).count-1}`)
	.addField("\u200b", `${disagree}:  ${reactions.get(disagree).count-1}`)
	.setColor(2124763);
	
	last3chan.send(gaymanEmbed);
		
		
		
	if(reactions.get(agree).count >= reactions.get(disagree).count) {
	let agEmbed = new Discord.RichEmbed()
	.setTitle("[Poll]")
	.setDescription("The games will not restart unless the host does !restart")
	.setFooter("Poll completed")
	.setColor(6812512);
		
	last3chan.send(agEmbed);
	}else if(reactions.get(disagree) >= reactions.get(agree)){
	let disEmbed = new Discord.RichEmbed()
	.setTitle("[Poll]")
	.setDescription("The match will NOT restart!")
	.setFooter("Poll completed")
	.setColor(6812512);
		
	last3chan.send(disEmbed);
}else if(reactions.get(agree) = reactions.get(disagree)){
	let samexEmbed = new Discord.RichEmbed()
	.setTitle("[Poll]")
	.setDescription("The match will NOT restart, because votes are equal!")
	.setFooter("Poll completed")
	.setColor(6812512);
	
	last3chan.send(samexEmbed);

}
	message.channel.overwritePermissions(message.guild.id, {
	SEND_MESSAGES: false
	})
	await timeout(2000);
	last3chan.send("*Chat is now locked...*");
	
	



	
	return;
}

	if(cmd === `${prefix}ac` && message.member.hasPermissions("ADMINISTRATOR")) {
	let acEmbed = new Discord.RichEmbed()
	.setTitle("Admin Commands")
    	.addField("\u200b", "!last3")
  	.addField("\u200b", "!starting")
    	.addField("\u200b", "!cls")
  	.addField("\u200b", "!start")
    	.addField("\u200b", "!say")
   	.addField("\u200b", "!end")
   	.addField("\u200b", "!restart")
	.setFooter("All commands made by Pulse")
   	.setColor(6812512);

	message.channel.send(acEmbed);
	
	
	return;
}

	if(cmd === `${prefix}restart` && message.member.hasPermissions("ADMINISTRATOR")) {
	message.channel.bulkDelete(4);
	message.channel.send("Matches will now restart!").then(msg => msg.delete(10000));
	return;
}

	if(cmd === `${prefix}say` && message.member.hasPermissions("ADMINISTRATOR")) {
	let lastchann = message.guild.channels.find(`name`, "scrim-last3");
	let ksenfEmbed = new Discord.RichEmbed()
	.setTitle("Game Info")
	.addField(`ID: ${args[0]}`, args[1])
	.setFooter("Scrims hosted by Small Scrims Discord")
	.setColor(13328335);

	lastchann.send(ksenfEmbed);
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
	
	

	

//	if(cmd === `${prefix}starting` && message.member.hasPermissions("ADMINISTRATOR")) {
//	let nficon = bot.user.displayAvatarURL;
//	let startingEmbed = new Discord.RichEmbed()
//	.setTitle("Small Scrims Discord")
//	.setThumbnail(nficon)
//	.addField("Alert!", "A scrim match is starting very soon! @everyone")
//	.addField("Instructions", "In the Snipe Countdown channel, a countdown will be held, press Ready on go.")
//	.setFooter(`Match hosted by ${message.author} >> Today at ${message.createdAt}`)
//	.setColor(6812512);

//	message.channel.send(startingEmbed);
	
//	return;
//}



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
    	.addField("!ping", "Ping Command", true)
   	.addField("!invite", "Makes Invite", true)
    	.addField("!report", "Report player", true)
    	.addField("!info", "Show Info", true)
    	.addField("!botinfo", "Show Bot Info")
    	.addField("!hacked", "Old Discord")
    	.addField("!region", "Sets ur region")
    	.addField("!fortnite", "Tracks a user")
	.setFooter("You executed the !help command with ScrimBot!")
   	.setColor(6812512);

	message.channel.sendEmbed(helpEmbed);
	
	return;
}
	
	if(cmd === `${prefix}l3`) {
	let lastUser = args[0];
	if(!lastUser) return;
	
	let lasttEmbed = new Discord.RichEmbed()
	.setTitle(`${lastUser}`)
	.setDescription(`${message.author}`)
	.setColor(6812512);



	let lastChannel = message.guild.channels.find(`name`, "last3-pulse");
	if(!lastChannel) return message.channel.send("Couldn't find channel");
	
	message.delete().catch(O_o=>{});
	lastChannel.send(lasttEmbed);

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
