module.exports = async function(sock, chatId, msg, isAdmin, botData, saveBotData, q) {
    if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Ye command sirf groups mein kaam karta hai.' }, { quoted: msg });

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
    const target = mentioned[0] || quotedParticipant || msg.key.participant || msg.key.remoteJid;

    // Admin clear: .warnings @user clear
    if (isAdmin && q && q.includes('clear')) {
        if (botData.warnings?.[chatId]?.[target]) {
            botData.warnings[chatId][target] = [];
            saveBotData();
        }
        return await sock.sendMessage(chatId, { text: `✅ Warnings cleared for @${target.split('@')[0]}`, mentions: [target] }, { quoted: msg });
    }

    const list = botData.warnings?.[chatId]?.[target] || [];

    if (list.length === 0) {
        return await sock.sendMessage(chatId, { text: `✅ @${target.split('@')[0]} ki koi warning nahi hai.`, mentions: [target] }, { quoted: msg });
    }

    let text = `⚠️ *WARNINGS for @${target.split('@')[0]}* (${list.length}/3)\n\n`;
    list.forEach((w, i) => {
        text += `${i + 1}. ${w.reason}\n   📅 ${new Date(w.date).toLocaleDateString()}\n`;
    });

    await sock.sendMessage(chatId, { text, mentions: [target] }, { quoted: msg });
};
