const mumaker = require('mumaker');

module.exports = async function(sock, chatId, msg, q) {
    if (!q) return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .light <text>' }, { quoted: msg });

    try {
        const result = await mumaker.ephoto("https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html", q);
        if (!result || !result.image) throw new Error('No image URL received from the API');

        await sock.sendMessage(chatId, {
            image: { url: result.image },
            caption: `\u2728 Light Text: ${q}`
        }, { quoted: msg });
    } catch (e) {
        console.error('Error in light command:', e);
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message }, { quoted: msg });
    }
};
