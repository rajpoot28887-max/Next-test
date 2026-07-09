async function anticallCommand(sock, from, msg, isAdmin, botData, saveBotData, userId, args) {
    if (!isAdmin) return await sock.sendMessage(from, { text: "❌ Only owner can use this command." }, { quoted: msg });
    
    const action = args[0]?.toLowerCase();
    const numberArg = args[1]?.replace(/\D/g, '');

    if (!botData.antiCallNumber) botData.antiCallNumber = {};

    if (action === 'on') {
        botData.antiCall[userId] = true;
        if (numberArg) {
            botData.antiCallNumber[userId] = numberArg;
            saveBotData();
            await sock.sendMessage(from, { text: `✅ Anti-Call Enabled only for +${numberArg}!` }, { quoted: msg });
        } else {
            botData.antiCallNumber[userId] = null;
            saveBotData();
            await sock.sendMessage(from, { text: "✅ Anti-Call Enabled!" }, { quoted: msg });
        }
    } else if (action === 'off') {
        botData.antiCall[userId] = false;
        botData.antiCallNumber[userId] = null;
        saveBotData();
        await sock.sendMessage(from, { text: "❌ Anti-Call Disabled!" }, { quoted: msg });
    } else {
        const status = botData.antiCall[userId] ? 'ON' : 'OFF';
        const mode = botData.antiCall[userId] ? (botData.antiCallNumber[userId] ? `Single number (+${botData.antiCallNumber[userId]})` : 'All calls') : '-';
        await sock.sendMessage(from, { 
            text: `❌ Usage: .anticall [on/off]\n\n` +
                `Status: ${status}\nMode: ${mode}\n\n` +
                `Use .anticall on <number> to block calls from one number only\n` +
                `Use .anticallmsg <message> to set a fixed reject reply for single-number mode`
        }, { quoted: msg });
    }
}

module.exports = anticallCommand;
