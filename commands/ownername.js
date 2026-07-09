// .ownername add|remove|list|clear <name> — owner-only command to manage the
// list of names that, when mentioned or asked about in a chat, trigger the
// custom owner-location auto-reply (set via .ownermsg). Only fires when the
// .chatbot AI toggle is ON.
async function ownernameCommand(sock, from, msg, isOwner, botData, saveBotData, userId, args) {
    if (!isOwner) {
        return sock.sendMessage(from, { text: '❌ Sirf *owner* hi owner names manage kar sakta hai.' }, { quoted: msg });
    }

    if (!botData.ownerNames) botData.ownerNames = {};
    if (!botData.ownerNames[userId]) botData.ownerNames[userId] = [];

    const action = args[0]?.toLowerCase();
    const nameArg = args.slice(1).join(' ').trim();

    if (action === 'add') {
        if (!nameArg) {
            return sock.sendMessage(from, { text: '❌ Usage: .ownername add <name>' }, { quoted: msg });
        }
        const exists = botData.ownerNames[userId].some(n => n.toLowerCase() === nameArg.toLowerCase());
        if (exists) {
            return sock.sendMessage(from, { text: `⚠️ "${nameArg}" pehle se list mein hai.` }, { quoted: msg });
        }
        botData.ownerNames[userId].push(nameArg);
        saveBotData();
        return sock.sendMessage(from, {
            text: `✅ "${nameArg}" owner names list mein add ho gaya!\n\n` +
                  `Current names: ${botData.ownerNames[userId].join(', ')}\n\n` +
                  `(Reply set karna na bhoolein: .ownermsg <message>)`
        }, { quoted: msg });
    }

    if (action === 'remove') {
        if (!nameArg) {
            return sock.sendMessage(from, { text: '❌ Usage: .ownername remove <name>' }, { quoted: msg });
        }
        const before = botData.ownerNames[userId].length;
        botData.ownerNames[userId] = botData.ownerNames[userId].filter(n => n.toLowerCase() !== nameArg.toLowerCase());
        saveBotData();
        if (botData.ownerNames[userId].length === before) {
            return sock.sendMessage(from, { text: `⚠️ "${nameArg}" list mein nahi mila.` }, { quoted: msg });
        }
        return sock.sendMessage(from, { text: `✅ "${nameArg}" list se remove kar diya gaya.` }, { quoted: msg });
    }

    if (action === 'clear') {
        botData.ownerNames[userId] = [];
        saveBotData();
        return sock.sendMessage(from, { text: '✅ Sari owner names clear kar di gayi.' }, { quoted: msg });
    }

    // default: list
    const names = botData.ownerNames[userId];
    const currentMsg = (botData.ownerCustomMessage && botData.ownerCustomMessage[userId]) || '(set nahi kiya, .ownermsg use karein)';
    return sock.sendMessage(from, {
        text: `*\u{1F464} Owner Names Settings*\n\n` +
              `Names: ${names.length ? names.join(', ') : '(koi bhi nahi)'}\n` +
              `Reply Message: ${currentMsg}\n\n` +
              `Usage:\n` +
              `.ownername add <name>\n` +
              `.ownername remove <name>\n` +
              `.ownername clear\n` +
              `.ownername list\n\n` +
              `Reply message set karne ke liye: .ownermsg <message>`
    }, { quoted: msg });
}

module.exports = ownernameCommand;
