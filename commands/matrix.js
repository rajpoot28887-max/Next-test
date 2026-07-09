const mumaker = require('mumaker');

module.exports = async function(sock, chatId, msg, q) {
    if (!q) return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .matrix <text>' }, { quoted: msg });

    try {
        const result = await mumaker.ephoto("https://en.ephoto360.com/matrix-text-effect-154.html", q);
        if (!result || !result.image) throw new Error('No image URL received from the API');

        await sock.sendMessage(chatId, {
            image: { url: result.image },
            caption: `\u2728 Matrix Text: ${q}`
        }, { quoted: msg });
    } catch (e) {
        console.error('Error in matrix command:', e);
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message }, { quoted: msg });
    }
};
