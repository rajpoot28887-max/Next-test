const os = require('os');

function formatTime(seconds) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = async function(sock, chatId, msg) {
    const uptime = process.uptime();

    const text = `╭───「 ⏱️ *UPTIME* 」───╮\n\n` +
        `⚡ *Bot is running since:*\n` +
        `➤ ${formatTime(uptime)}\n\n` +
        `╰───────────────╯\n` +
        `_🤖 Rajpoot MD Bot - Always Active_`;

    await sock.sendMessage(chatId, { text }, { quoted: msg });
};
