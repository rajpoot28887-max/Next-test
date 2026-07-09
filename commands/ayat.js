const axios = require('axios');

module.exports = async function(sock, chatId, msg, q) {
    if (!q || !q.includes(':')) {
        return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .ayat <surah>:<ayah>\n_Example: .ayat 2:255_' }, { quoted: msg });
    }

    try {
        const [surah, ayah] = q.split(':').map(s => s.trim());
        const surahNum = parseInt(surah);
        const ayahNum = parseInt(ayah);

        if (isNaN(surahNum) || surahNum < 1 || surahNum > 114 || isNaN(ayahNum) || ayahNum < 1) {
            return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F Invalid reference.\n_Example: .ayat 2:255_' }, { quoted: msg });
        }

        const reference = `${surahNum}:${ayahNum}`;

        const [arRes, enRes] = await Promise.all([
            axios.get(`https://api.alquran.cloud/v1/ayah/${reference}`, { timeout: 10000 }),
            axios.get(`https://api.alquran.cloud/v1/ayah/${reference}/en.asad`, { timeout: 10000 })
        ]);

        const arData = arRes.data.data;
        const enData = enRes.data.data;

        let text = `*\u1F54E Surah ${arData.surah.englishName} - Ayah ${arData.numberInSurah}*\n\n`;
        text += `${arData.text}\n\n`;
        text += `_${enData.text}_\n\n`;
        text += `_Reference: Quran ${reference}_`;

        await sock.sendMessage(chatId, { text }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message + '\n_Make sure the ayah number is valid for that surah._' }, { quoted: msg });
    }
};
