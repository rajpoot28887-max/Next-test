const axios = require('axios');

module.exports = async function(sock, chatId, msg, q) {
    try {
        let surah = q ? parseInt(q) : Math.floor(Math.random() * 114) + 1;
        if (isNaN(surah) || surah < 1 || surah > 114) {
            return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .surah <1-114>\n_Example: .surah 36_' }, { quoted: msg });
        }

        const [arRes, enRes] = await Promise.all([
            axios.get(`https://api.alquran.cloud/v1/surah/${surah}`, { timeout: 10000 }),
            axios.get(`https://api.alquran.cloud/v1/surah/${surah}/en.asad`, { timeout: 10000 })
        ]);

        const data = arRes.data.data;
        const enData = enRes.data.data;

        let text = `*\u1F54E Surah ${data.englishName} (${data.name})*\n\n`;
        text += `Number: ${data.number}\n`;
        text += `Meaning: ${data.englishNameTranslation}\n`;
        text += `Verses: ${data.numberOfAyahs}\n`;
        text += `Revelation: ${data.revelationType}\n\n`;

        const limit = Math.min(10, data.ayahs.length);
        for (let i = 0; i < limit; i++) {
            text += `*${data.ayahs[i].numberInSurah}.* ${data.ayahs[i].text}\n`;
            text += `_${enData.ayahs[i].text}_\n\n`;
        }

        if (data.numberOfAyahs > limit) {
            text += `...and ${data.numberOfAyahs - limit} more verses.\n`;
        }

        text += `\n_Full surah: https://quran.com/${surah}_`;

        await sock.sendMessage(chatId, { text }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message }, { quoted: msg });
    }
};
