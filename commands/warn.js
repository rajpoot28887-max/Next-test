module.exports = async function(sock, chatId, msg, isAdmin, botData, saveBotData, q) {
    if (!isAdmin) return await sock.sendMessage(chatId, { text: '❌ Only admin can warn members!' }, { quoted: msg });
    if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Ye command sirf groups mein kaam karta hai.' }, { quoted: msg });

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
    const target = mentioned[0] || quotedParticipant;

    if (!target) return await sock.sendMessage(chatId, { text: '⚠️ Kisi user ko mention ya reply karo warn karne ke liye.\nUsage: .warn @user [reason]' }, { quoted: msg });

    const reason = q ? q.replace(/@\d+/g, '').trim() : 'No reason given';

    if (!botData.warnings) botData.warnings = {};
    if (!botData.warnings[chatId]) botData.warnings[chatId] = {};
    if (!botData.warnings[chatId][target]) botData.warnings[chatId][target] = [];

    botData.warnings[chatId][target].push({ reason, date: new Date().toISOString() });
    const count = botData.warnings[chatId][target].length;
    saveBotData();

    if (count >= 3) {
        try {
            await sock.sendMessage(chatId, {
                text: `🚫 @${target.split('@')[0]} ne 3 warnings complete kar li — auto-removing from group.`,
                mentions: [target]
            }, { quoted: msg });
            await sock.groupParticipantsUpdate(chatId, [target], 'remove');
            botData.warnings[chatId][target] = [];
            saveBotData();
        } catch (e) {
            await sock.sendMessage(chatId, { text: '⚠️ 3 warnings ho gayi lekin remove nahi kar saka (bot admin nahi hai shayad).' }, { quoted: msg });
        }
    } else {
        await sock.sendMessage(chatId, {
            text: `⚠️ *WARNING ${count}/3*\n👤 User: @${target.split('@')[0]}\n📝 Reason: ${reason}\n\n${3 - count} warning(s) left before auto-kick.`,
            mentions: [target]
        }, { quoted: msg });
    }
};
