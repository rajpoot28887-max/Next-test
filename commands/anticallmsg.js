// .anticallmsg <message> — owner-only command to set a fixed reject message
// used ONLY when Anti-Call is running in single-number mode
// (see .anticall on <number>). If no custom single-number message is set,
// the normal default/rejectmsg behavior is used (unchanged original behavior).
async function anticallmsgCommand(sock, from, msg, isOwner, botData, saveBotData, userId, q) {
    if (!isOwner) {
        return sock.sendMessage(from, { text: '❌ Sirf *owner* hi anticall single-number message change kar sakta hai.' }, { quoted: msg });
    }

    if (!botData.antiCallSingleMessage) botData.antiCallSingleMessage = {};

    const newMessage = (q || '').trim();

    if (!newMessage) {
        const current = botData.antiCallSingleMessage[userId];
        return sock.sendMessage(from, {
            text: `⚙️ *Current Single-Number Anti-Call Message:*\n${current || '(default reject message use ho raha hai)'}\n\n` +
                  `Sirf single number mode mein use hota hai: .anticall on <number>\n\n` +
                  `Naya fixed message set karne ke liye:\n*.anticallmsg <your message>*\n\n` +
                  `Misaal: .anticallmsg Yeh number calls receive nahi karta, text karein!\n\n` +
                  `Default reject message par wapis jane ke liye: *.anticallmsg reset*`
        }, { quoted: msg });
    }

    if (newMessage.toLowerCase() === 'reset') {
        delete botData.antiCallSingleMessage[userId];
        saveBotData();
        return sock.sendMessage(from, { text: '✅ Single-number anti-call message *default* par wapis set kar diya gaya.' }, { quoted: msg });
    }

    botData.antiCallSingleMessage[userId] = newMessage;
    saveBotData();

    await sock.sendMessage(from, {
        text: `✅ *Single-Number Anti-Call Message Updated!*\n\nNaya Message:\n${newMessage}\n\n` +
              `(Yeh message tab bhejega jab Anti-Call single-number mode mein us number ki call reject karega. ` +
              `Single number mode on karna na bhoolein: .anticall on <number>)`
    }, { quoted: msg });
}

module.exports = anticallmsgCommand;
