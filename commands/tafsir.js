const axios = require('axios');

module.exports = async function(sock, chatId, msg, q) {
    if (!q || !q.includes(':')) {
        return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .tafsir <surah>:<ayah>\n_Example: .tafsir 2:255_' }, { quoted: msg });
    }

    try {
        const [surah, ayah] = q.split(':').map(s => s.trim());
        const surahNum = parseInt(surah);
        const ayahNum = parseInt(ayah);

        if (isNaN(surahNum) || surahNum < 1 || surahNum > 114 || isNaN(ayahNum) || ayahNum < 1) {
            return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F Invalid reference.\n_Example: .tafsir 2:255_' }, { quoted: msg });
        }

        // Get the ayah text first
        const arRes = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}`, { timeout: 10000 });
        const arData = arRes.data.data;

        // Tafsir Ibn Kathir (tafseer id 1) via quran-tafseer API
        const tafsirRes = await axios.get(`https://api.quran-tafseer.com/tafseer/1/${surahNum}/${ayahNum}`, { timeout: 10000 });
        const tafsirText = tafsirRes.data.text;

        let text = `*\u1F4D6 Tafsir - Surah ${arData.surah.englishName}, Ayah ${arData.numberInSurah}*\n\n`;
        text += `${arData.text}\n\n`;
        text += `*Tafsir (Ibn Kathir):*\n`;
        text += tafsirText.length > 1500 ? tafsirText.slice(0, 1500) + '...' : tafsirText;
        text += `\n\n_Reference: Quran ${surahNum}:${ayahNum}_`;

        await sock.sendMessage(chatId, { text }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message + '\n_Tafsir may not be available for this ayah._' }, { quoted: msg });
    }
};
