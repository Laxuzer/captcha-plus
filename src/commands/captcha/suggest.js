const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Suggestion extends Command {
    constructor() {
        super({
            name: 'suggest',
            aliases: ["istek", "suggest-bug", "öneri"],
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    let webhook = new Discord.WebhookClient(ctx.client.config.webhook.suggest_webhook.id, ctx.client.config.webhook.suggest_webhook.token)
                    if (data.language == "tr") {
                        ctx.channel.createInvite({ maxAge: 0, maxUses: 0, reason: "Lütfen Bu Daveti Silme!" }).then(inv => {
                            ctx.send("İsteğiniz başarılı bir şekilde alındı!");
                            ctx.message.delete({ timeout: 100 });
                            webhook.send(new Discord.MessageEmbed().setTitle("Suggest!").setURL(`https://discord.gg/${inv.code}`).setDescription(ctx.message.content).setThumbnail(ctx.guild.iconURL({dynamic: true}) || ctx.client.user.avatarURL()).setAuthor(ctx.author.tag, ctx.author.displayAvatarURL({dynamic: true})).setFooter(`Guild ID: ${ctx.guild.id} • ${ctx.guild.name} • Turkish`));
                        });
                    };
                    if (data.language == "en") {
                        ctx.channel.createInvite({ maxAge: 0, maxUses: 0, reason: "Please Don't Delete This Invite!" }).then(inv => {
                            webhook.send(new Discord.MessageEmbed().setTitle("Suggest!").setURL(`https://discord.gg/${inv.code}`).setDescription(ctx.message.content).setThumbnail(ctx.guild.iconURL({dynamic: true}) || ctx.client.user.avatarURL()).setAuthor(ctx.author.tag, ctx.author.displayAvatarURL({dynamic: true})).setFooter(`Guild ID: ${ctx.guild.id} • ${ctx.guild.name} • English`));
                            ctx.message.delete({ timeout: 100 });
                            ctx.send("Successfully received your request!");
                        });
                    };
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}