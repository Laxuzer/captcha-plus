const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Stat extends Command {
    constructor() {
        super({
            name: 'istatistik',
            aliases: ['i', 'stat'], 
            run: async (ctx) => {
                try {
                    let guild = ctx.guilds.cache.reduce((a, b) => a + 1, 0).toLocaleString(),
                    voice = ctx.guilds.cache.reduce((a, b) => a + b.channels.cache.filter(e => e.type == 'voice').size, 0).toLocaleString(),
                    text = ctx.guilds.cache.reduce((a, b) => a + b.channels.cache.filter(e => e.type == 'text').size, 0).toLocaleString(),
                    news = ctx.guilds.cache.reduce((a, b) => a + b.channels.cache.filter(e => e.type == 'news').size, 0).toLocaleString(),
                    category = ctx.guilds.cache.reduce((a, b) => a + b.channels.cache.filter(e => e.type == 'category').size, 0).toLocaleString(),
                    nsfw = ctx.guilds.cache.reduce((a, b) => a + b.channels.cache.filter(e => e.nsfw).size, 0).toLocaleString(),
                    emoji = ctx.guilds.cache.reduce((a, b) => a + b.emojis.cache.size, 0).toLocaleString();
            
                    let all = ctx.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
                    online = ctx.guilds.cache.reduce((a, b) => a + b.members.cache.filter(u => u.user.presence.status == 'online').size, 0).toLocaleString(),
                    AllOnlines = ctx.guilds.cache.reduce((a, b) => a + b.members.cache.filter(u => u.user.presence.status !== 'offline').size, 0).toLocaleString(),
                    idle = ctx.guilds.cache.reduce((a, b) => a + b.members.cache.filter(u => u.user.presence.status == 'idle').size, 0).toLocaleString(),
                    dnd = ctx.guilds.cache.reduce((a, b) => a + b.members.cache.filter(u => u.user.presence.status == 'dnd').size, 0).toLocaleString(),
                    offline = ctx.guilds.cache.reduce((a, b) => a + b.members.cache.filter(u => u.user.presence.status == 'offline').size, 0).toLocaleString();
                    
                    let embed = ctx.embed().addField(`${ctx.emoji("servers")} Servers (${guild})`, `${ctx.emoji("category")} • ${category} \n ${ctx.emoji("voice")} • ${voice} \n ${ctx.emoji("news_channel")} • ${news} \n ${ctx.emoji("text_channel")} • ${text} \n ${ctx.emoji("nsfw")} • ${nsfw} \n ${ctx.emoji("emojis")} • ${emoji}`, true)
                    .addField(`${ctx.emoji("members")} Users (${all})`, `${ctx.emoji("online")} • ${AllOnlines} \n ${ctx.emoji("online_2")} • ${online} \n ${ctx.emoji("dnd_2")} • ${dnd} \n ${ctx.emoji("idle_2")} • ${idle} \n ${ctx.emoji("offline_2")} • ${offline}`, true)
                    .addField(`${ctx.client.user.username} ${ctx.emoji("botTag")}`, `Developers: \`${ctx.client.users.cache.get("576749207084466197").tag+" | "+ctx.client.users.cache.get("374126884721786880").tag}\`\nDiscord.js: ***v${Discord.version}***`)
                    ctx.send(embed)
                    /**
                     * var guild_sayı = 0, sesli = 0, text = 0, kategori = 0, nsfw = 0, emoji = 0, news = 0;
                    var onl = 0, off = 0, dnd = 0, idle = 0, allOn = 0, all = 0, bot = 0;
                    await client.guilds.cache.forEach(gld => {
                        guild_sayı++;
                        text += gld.channels.cache.filter(c => c.type === "text" || c.type === "news").size;
                        news += gld.channels.cache.filter(c => c.type === "news").size;
                        sesli += gld.channels.cache.filter(c => c.type === "voice").size;
                        kategori += gld.channels.cache.filter(c => c.type === "category").size;
                        nsfw += gld.channels.cache.filter(c => c.nsfw).size;
                        emoji += gld.emojis.cache.size;
                        //user
                        onl += gld.members.cache.filter(usr => usr.user.presence.status == "online").size;
                        dnd += gld.members.cache.filter(usr => usr.user.presence.status == "dnd").size;
                        idle += gld.members.cache.filter(usr => usr.user.presence.status == "idle").size;
                        off += gld.members.cache.filter(usr => usr.user.presence.status == "offline").size;
                        allOn += gld.members.cache.filter(usr => usr.user.presence.status !== "offline").size;
                        bot += gld.members.cache.filter(usr => usr.user.bot).size;
                        all += gld.memberCount;
                    });
            
                     */
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}