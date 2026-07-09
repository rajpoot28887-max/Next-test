// .rejectmsg <message> — owner-only command to customize the message sent
// to callers when Anti-Call rejects their call (see .anticall). Persisted in
// botData.callRejectMessage so it survives a restart.
async function rejectmsgCommand(sock, from, msg, isOwner, botData, saveBotData, userId, q) {
    if (!isOwner) {
        return sock.sendMessage(from, { text: '❌ Sirf *owner* hi reject message change kar sakta hai.' }, { quoted: msg });
    }

    const newMessage = (q || '').trim();

    if (!newMessage) {
        const current = botData.callRejectMessage[userId];
        return sock.sendMessage(from, {
            text: `⚙️ *Current Reject Message:*\n${current || '(default message use ho raha hai)'}\n\n` +
                  `Naya message set karne ke liye:\n*.rejectmsg <your message>*\n\n` +
                  `Misaal: .rejectmsg Sorry, main calls receive nahi karta. Text karein!\n\n` +
                  `Default message par wapis jane ke liye: *.rejectmsg reset*`
        }, { quoted: msg });
    }

    if (newMessage.toLowerCase() === 'reset') {
        delete botData.callRejectMessage[userId];
        saveBotData();
        return sock.sendMessage(from, { text: '✅ Reject message *default* par wapis set kar diya gaya.' }, { quoted: msg });
    }

    botData.callRejectMessage[userId] = newMessage;
    saveBotData();

    await sock.sendMessage(from, {
        text: `✅ *Reject Message Updated!*\n\nNaya Message:\n${newMessage}\n\n` +
              `(Yeh message tab bhejega jab Anti-Call kisi call ko reject karega. Anti-call on karna na bhoolein: .anticall on)`
    }, { quoted: msg });
}

module.exports = rejectmsgCommand;
