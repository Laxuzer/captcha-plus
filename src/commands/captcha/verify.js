const Discord = require('discord.js');
const language = require('../../dil.js');
const Command = require('../../base/Command');

module.exports = class Verify extends Command {
    constructor() {
        super({
            name: 'verify',
            aliases: ['doğrula'],
            run: async (ctx) => {
                const { client, message } = ctx;
                try {
                    const member = message.member;
                    if (!member.guild) return;
                    let data = await global.dbget(member.guild.id).then(e => e),
                    kalanHak = 0, hak = 3, captchaCode,
                    sonMesaj, embedDescription, guild = member.guild;
                    if (!data['system'] || data['system'] !== 'working' || member.roles.cache.has(data.registered) || message.channel.id !== data.verify_channel) return ctx.send('Zaten doğrulanmışsın.');
                    
                    if (global.IsVerify.get(`gived_${message.author.id}`)) return message.channel.send({ content: message.author, embed: new Discord.MessageEmbed().setColor(ctx.renk.capt).setDescription(data.language == 'tr' ? `\`•\` **Size zaten bir mesaj gönderdim, DM'nizi kontrol edin!**`: `\`•\` **I've already sent you a message, check your DM!**`, true) });
                
                    const { CaptchaGenerator } = require('captcha-canvas');
                    const captcha = new CaptchaGenerator({ height: 200, width: 600 });
                    const buffer = await captcha.generate();
                    captchaCode = captcha.text;
                    if (data.language == 'tr') embedDescription = `> **Lütfen aşağıda gördüğünüz __kodu buraya yazın!__**`
                    else embedDescription = `> **Please __write the code__ you see below here!**`;
                
                    //----------------İşlemler------------------
                    member.roles.add(data.unregistered);
                    member.user.send(new Discord.MessageEmbed().attachFiles(new Discord.MessageAttachment(buffer, 'captchaplus.png')).setDescription(embedDescription).setImage(`attachment://captchaplus.png`).setColor(ctx.renk.capt)).then(async (msg) => {
                        IsVerify.set(`gived_${member.id}`, true);
                        log('sended');
                        const filter = async (m) => {
                            if (m.author.bot) return;
                            sonMesaj = m.content;
                            if (m.author.id === member.id && m.content.toLowerCase() === captchaCode.toLowerCase()) return true;
                            else {
                                kalanHak++;
                                if (kalanHak >= hak) {
                                    IsVerify.delete(`gived_${member.id}`);
                                    await msg.channel.send(data.language == 'tr' ? `${ctx.emoji('cross')} Maalesef girişim haklarınız doldu. Yeni bir güvenlik kodu almak için <#${data.verify_channel}> kanalında \`${data.prefix}verify\` komudunu çalıştırın.`: `${ctx.emoji('cross')} Unfortunately, your venture rights have expired. Run the \`${data.prefix}verify\` command on the <#${data.verify_channel}> channel to get a new security code.`);
                                    log('error_hak_bitti');
                                    return false;
                                };
                                
                                m.channel.send(data.language == 'tr' ? `**Hatalı girişimde bulundunuz.** Kalan ${hak - kalanHak} girişim hakkınız var.`: `**You made a bad attempt.** You have ${hak - kalanHak} attempts remaining.`);
                                log('wrong');
                                return false;
                            };
                        };
                        await msg.channel.awaitMessages(filter, { 
                            max: 1, 
                            time: 60000, 
                            errors: ['time']
                        }).then(async (response) => {
                            await msg.channel.send(new Discord.MessageEmbed().setColor(ctx.renk.capt)
                            .setTitle(data.language == 'tr' ? 'Başarılı!': 'Successful!').setDescription(data.language == 'tr' ? `\`•\` **Kayıt işleminiz tamamlandı!**`: `\`•\` **Your registration is complete!**`, true));
                            member.roles.remove(data.unregistered, { reason: 'Registarion Completed!' });
                            member.roles.add(data.registered, { reason: 'Registarion Completed!' });
                            IsVerify.delete(`gived_${member.id}`);
                            log('succes');
                        }).catch(async (e) => {
                            if (!member.guild.member(member) || kalanHak >= hak) return;
                            await msg.channel.send(data.language == 'tr' ? `${ctx.emoji('cross')} **Kayıt işleminiz tamamlanamadı.** Yeni bir güvenlik kodu almak için <#${data.verify_channel}> kanalında \`${data.prefix}verify\` komudunu çalıştırın.`: `${ctx.emoji('cross')} **Your registration could not be completed.** Run the \`${data.prefix}verify\` command on the <#${data.verify_channel}> channel to get a new security code.`);
                            IsVerify.delete(`gived_${member.id}`);
                            log('error_time');
                        });
                    }).catch(e => {
                        IsVerify.delete(`gived_${member.id}`);
                        if (e.message == 'Cannot send messages to this user') {
                            member.guild.channels.cache.get(data.verify_channel).send({ content: member, embed: new Discord.MessageEmbed().setColor('RED').setDescription(`I couldn\'t send you the message. Please make sure DM is turned on and type \`${data.prefix}verify\` in this channel.`).setImage('https://cdn.discordapp.com/attachments/770693538651701279/826356407540383774/KHGEnJaQpX.gif')})
                        };
                    });
                    //----------------Fonksiyon-----------------
                    async function log(description) {
                        if (data.language == 'tr' && data.log) {
                            member.guild.channels.cache.get(data.log).send(new Discord.MessageEmbed()
                            .setTitle(`${client.user.username} Log`).setDescription(`**${language.tr.log[description]}**`)
                            .addField(`Kullanıcı Bilgileri;`, `\`${member.user.tag}\`\n\`${member.id}\``, true)
                            .addField(`Captcha Bilgileri;`, `Verilen Kod: \`${captchaCode}\` \nGirilen Kod: \`${sonMesaj}\` \nKalan Hak: \`${hak - kalanHak}\``, true)
                            .setThumbnail(client.user.avatarURL()).setColor(ctx.renk.capt).setTimestamp());
                        };
                        if (data.language == 'en' && data.log) {
                            member.guild.channels.cache.get(data.log).send(new Discord.MessageEmbed()
                            .setTitle(`${client.user.username} Log`).setDescription(`**${language.en.log[description]}**`)
                            .addField(`User Info;`, `\`${member.user.tag}\`\n\`${member.id}\``, true)
                            .addField(`Captcha Info;`, `Given Code: \`${captchaCode}\` \nEntered Code: \`${sonMesaj}\` \nChances Left: \`${hak - kalanHak}\``, true)
                            .setThumbnail(client.user.avatarURL()).setColor(ctx.renk.capt).setTimestamp());
                        };
                    };
                } catch (error) {
                    global.IsVerify.delete(`gived_${member.id}`);
                    client.emit('error', error, message.guild);
                };
            }
        })
    }
}