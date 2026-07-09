const mumaker = require('mumaker');

module.exports = async function(sock, chatId, msg, q) {
    if (!q) return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .hacker <text>' }, { quoted: msg });

    try {
        const result = await mumaker.ephoto("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", q);
        if (!result || !result.image) throw new Error('No image URL received from the API');

        await sock.sendMessage(chatId, {
            image: { url: result.image },
            caption: `\u2728 Hacker Text: ${q}`
        }, { quoted: msg });
    } catch (e) {
        console.error('Error in hacker command:', e);
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message }, { quoted: msg });
    }
};
