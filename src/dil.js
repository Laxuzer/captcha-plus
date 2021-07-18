module.exports = {
    "en": {
        "database": {
            "log": "Log Channel",
            "registered": "Registered Role",
            "unregistered": "UnRegistered Role",
            "verify_channel": "Verify Channel"
        },
        "komutlar": {
            "start": {
                "succes": "System successfully activated!",
                "eksik": "Before starting the system, you need to adjust some settings:",
                "already": "The system already working.",
                "data": {
                    "kayıtlı": "Registered Role", 
                    "kayıtsız": "UnRegistered Role", 
                    "zorluk": "Captcha Difficulty",
                    "log": "Log Channel",
                    "verify_channel": "Verify Channel"
                }
            },
            "stop": {
                "wait": "Wait",
                "suc": "Successful",
                "notWork": "The system is already down.",
                "stopped": "System stopped and data cleared."
            },
            "register": {
                "error": "Error",
                "bas": "Successful",
                "arg": "You have to mention a role or write the id in the argument!",
                "suc": (v) => `The registered role was successfully set to <@&${v}>. This role will be given when members are verified.`,
                "invarg": "Wrong Argument",
                "yuksek": "The position of the role you entered is higher than my role's position!"
            },
            "unregister": {
                "error": "Error",
                "bas": "Successful",
                "arg": "You have to mention a role or write the id in the argument!",
                "suc": (v) => `The unregistered role was successfully set to <@&${v}>. This role will be given when members are joined.`,
                "invarg": "Wrong Argument",
                "yuksek": "The position of the role you entered is higher than my role's position!"
            },
            "log": {
                "error": "Error",
                "bas": "Successful",
                "arg": "You have to mention a channel or write the id in the argument!",
                "invarg": "Wrong Argument",
                "suc": (v) => `The log channel was successfully set to <#${v}>.`,
            },
            "prefix": {
                "sfr": "Bot's prefix is reset to \`-\` for this server.",
                "suc": (v) => `Bot\'s prefix is set to \`${v}\` for this server!`,
                "descc": (v) => `Bot\'s prefix for this server: \`${v}\``,
                "footer": (p) => `Wanna change? Use \"${p}prefix <prefix/reset>\"`
            },
            "verify_channel": {
                "error": "Error",
                "bas": "Successful",
                "arg": "You have to mention a channel or write the id in the argument!",
                "suc": (v) => `The verify channel was successfully set to <#${v}>.`,
                "invarg": "Wrong Argument"
            }
        },
        "log": {
            "changed": "User's captcha message is refresh!",
            "sended": "I sent the captcha message and gave the user unverified role.",
            "wrong": "The user entered the wrong code.",
            "succes": "Success! The user is verified by entering the correct code.",
            "error_hak_bitti": "The user exceeded the chance of entering wrong codes.",
            "error_time": "The user not entering correct code within 60 seconds."
        }
    },
    "tr": {
        "database": {
            "log": "Log Kanalı",
            "registered": "Kayıtlı Rolü",
            "unregistered": "Kayıtsız Rolü",
            "verify_channel":"Doğrulama Kanalı"
        },
        "log": {
            "changed": "Kullanıcının captcha mesajı yenilendi!",
            "sended": "Kullanıcıya captcha mesajı gönderdim ve kayıtsız rolünü verdim.",
            "wrong": "Kullanıcı yanlış kod girdi.",
            "succes": "Başarılı! Kullanıcı doğru kodu girerek doğrulandı.",
            "error_hak_bitti": "Kullanıcı yanlış limitini geçti.",
            "error_time": "Kullanıcı 60 saniye içerisinde kodu girmedi."
        },
        "komutlar": {
            "start": {
                "succes": "Sistem başarıyla aktif edildi!",
                "eksik": "Sistemi başlatmadan önce bazı ayarları ayarlaman gerekiyor:",
                "already": "Sistem zaten çalışıyor.",
                "data": {
                    "kayıtlı": "Kayıtlı Rol", 
                    "kayıtsız": "Kayıtsız Rol", 
                    "zorluk": "Captcha Zorluğu",
                    "log": "Log Kanalı",
                    "verify_channel": "Doğrulama Kanalı"
                }
            },
            "stop": {
                "wait": "Bekle",
                "suc": "Başarılı",
                "notWork": "Sistem zaten kapalı.",
                "stopped": "Sistem durduruldu ve veriler temizlendi."
            },
            "register": {
                "error": "Hata",
                "bas": "Başarılı",
                "arg": "Bir rolü etiketlemen veya idsini girmen gerekli!",
                "suc": (v) => `Kayıtlı rolü başarıyla <@&${v}> olarak ayarlandı. Üyeler doğrulandığında bu rol verilecek.`,
                "invarg": "Geçersiz Argüman",
                "yuksek": "Girdiğin rolün pozisyonu benim rolümden daha yüksek!"
            },
            "unregister": {
                "error": "Hata",
                "bas": "Başarılı",
                "arg": "Bir rolü etiketlemen veya idsini girmen gerekli!",
                "suc": (v) => `Kayıtsız rolü başarıyla <@&${v}> olarak ayarlandı. Üyeler katıldığında bu rol verilecek.`,
                "invarg": "Geçersiz Argüman",
                "yuksek": "Girdiğin rolün pozisyonu benim rolümden daha yüksek!"
            },
            "log": {
                "arg": "Bir kanalı etiketlemen veya idsini girmen gerekli!",
                "invarg": "Geçersiz Argüman",
                "suc": (v) => `Log kanalı başarıyla <#${v}> olarak ayarlandı!`,
                "bas": "Başarılı",
                "error": "Hata"
            },
            "prefix": {
                "sfr": "Botun prefixi bu sunucu için \`-\` olarak sıfırlandı!",
                "suc": (v) => `Botun prefixi bu sunucu için \`${v}\` olarak ayarlandı!`,
                "descc": (v) => `Botun bu sunucu için prefixi: \`${v}\``,
                "footer": (p) => `Değiştirmek için \"${p}prefix <prefix/reset>\"`
            },
            "verify_channel": {
                "error": "Hata",
                "bas": "Başarılı",
                "arg": "Bir kanalı etiketlemen veya idsini girmen gerekli!",
                "suc": (v) => `Doğrulama kanalı başarıyla <#${v}> olarak ayarlandı.`,
                "invarg": "Geçersiz Argüman"
            }
        }
    }
}