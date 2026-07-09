// .ownermsg <message> — owner-only command to set the custom reply sent
// automatically when someone asks where the owner is, or mentions one of
// the names configured via .ownername. Only fires when the .chatbot AI
// toggle is ON.
async function ownermsgCommand(sock, from, msg, isOwner, botData, saveBotData, userId, q) {
    if (!isOwner) {
        return sock.sendMessage(from, { text: '❌ Sirf *owner* hi ye message change kar sakta hai.' }, { quoted: msg });
    }

    if (!botData.ownerCustomMessage) botData.ownerCustomMessage = {};

    const newMessage = (q || '').trim();

    if (!newMessage) {
        const current = botData.ownerCustomMessage[userId];
        return sock.sendMessage(from, {
            text: `⚙️ *Current Owner Reply Message:*\n${current || '(set nahi kiya gaya, feature abhi inactive hai)'}\n\n` +
                  `Naya message set karne ke liye:\n*.ownermsg <your message>*\n\n` +
                  `Misaal: .ownermsg Owner abhi busy hai, jald reply karega!\n\n` +
                  `Feature band karne ke liye: *.ownermsg reset*\n\n` +
                  `Names manage karne ke liye: .ownername add <name>`
        }, { quoted: msg });
    }

    if (newMessage.toLowerCase() === 'reset') {
        delete botData.ownerCustomMessage[userId];
        saveBotData();
        return sock.sendMessage(from, { text: '✅ Owner reply message clear kar diya gaya, feature ab inactive hai.' }, { quoted: msg });
    }

    botData.ownerCustomMessage[userId] = newMessage;
    saveBotData();

    await sock.sendMessage(from, {
        text: `✅ *Owner Reply Message Updated!*\n\nNaya Message:\n${newMessage}\n\n` +
              `(Yeh message tab bhejega jab koi "owner kaha hai" pucha ya .ownername se add ki hui koi name mention kare. ` +
              `Sirf Chatbot ON hone par kaam karega: .chatbot on. Names add karna na bhoolein: .ownername add <name>)`
    }, { quoted: msg });
}

module.exports = ownermsgCommand;
