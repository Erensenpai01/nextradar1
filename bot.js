const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '$'



//////////////////////////////////////////////////////////



client.on('ready',async () => {//iiMrSasuke
console.log("Starting..");//iiMrSasukeDEV
let g = client.guilds.get("608089727400280080"); // id server
let c = g.channels.get("640724326135365632");// id channel
if(c.type === 'voice') {//iiMrSasukeDEV
c.join();//iiMrSasukeDEV
setInterval(() => {//iiMrSasukeDEV
if(!g.me.voiceChannel) c.join();
}, 1);//iiMrSasukeDEV
} else {//iiMrSasukeDEV
console.log('Failed To Join: \n The Channel Type isn "Listening."')
}
});














//___________________________________________________



const voiceChannel = '640724326135365632'; 

const membersSize = (client) => {
 return client.channels.filter(c => c.type === "voice").map(c => c.members.size).reduce((a,b) => {return a + b}, 0);
}


client.on('ready', () => {
client.channels.get(voiceChannel).setName(`Voice Online: [${membersSize(client)}]`)
}); 

client.on('voiceStateUpdate', () => {
client.channels.get(voiceChannel).setName(`Voice Online: [${membersSize(client)}]`)
})








var config = {
  events: [
    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 2 , delay: 6000},
    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 2, delay: 5000},
    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 2, delay: 5000},
    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 2, delay: 5000},
    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 2, delay: 5000},
    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 2, delay: 5000},
  ]
}
client.on("error", (e) => console.error(e));
client.on("raw", (packet)=> {
  let {t, d} = packet, type = t, {guild_id} = data = d || {};
  if (type === "READY") {
    client.startedTimestamp = new Date().getTime();
    client.captures = [];
  }
  let event = config.events.find(anEvent => anEvent.type === type);
  if (!event) return;
  let guild = client.guilds.get(guild_id);
  if (!guild) return;
  guild.fetchAuditLogs({limit : 1, type: event.logType})
    .then(eventAudit => {
      let eventLog = eventAudit.entries.first();
      if (!eventLog) return;
      let executor = eventLog.executor;
      guild.fetchAuditLogs({type: event.logType, user: executor})
        .then((userAudit, index) => {
          let uses = 0;
          userAudit.entries.map(entry => {
            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;
          });
          setTimeout(() => {
            client.captures[index] = index
          }, event.delay || 2000)
          if (uses >= event.limit) {
            client.emit("reachLimit", {
              user: userAudit.entries.first().executor,
              member: guild.members.get(executor.id),
              guild: guild,
              type: event.type,
            })
          }
        }).catch(console.error)
    }).catch(console.error)
});
client.on("reachLimit", (limit)=> {
	let log = limit.guild.channels.find( channel => channel.name === "radar-bas");
	limit.guild.owner.send("__** warning :warning::**__ " + " ``" + limit.user.username + "`` " + "** tried to do something :rotating_light: **  ")
	limit.member.roles.map(role => {
    limit.member.ban(role.id)
    .catch(log.send)
  });
  
  log.send("__** warning :warning::**__ " + " ``" + limit.user.username + "`` " + " ** tried to do something :rotating_light: ** ");
  
  
});






client.login("NjM5NTYzNDUxNjg5MzM2ODMy.Xb-IZA.1mlNF0UVEuv8rsB05tTTuSe7zv0");
