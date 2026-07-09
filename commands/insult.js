const insults = [
    "You bring everyone so much joy... when you leave the room.",
    "I'd call you a tool, but that would imply you're useful.",
    "You're the human version of a Monday morning.",
    "I've seen better decisions made by a magic 8-ball.",
    "You're not the dumbest person alive, but you sure use the buy-one-get-one-free coupon a lot.",
    "You're like a participation trophy — everyone gets one, nobody wants it.",
    "If common sense was a currency, you'd be bankrupt.",
    "You have something on your chin... no, the third one down.",
    "You're proof that even mistakes can be adorable.",
    "I'm not saying you talk too much, but even echoes are tired of you."
];

module.exports = async function (sock, chatId, msg) {
    const insult = insults[Math.floor(Math.random() * insults.length)];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const text = mentioned ? `@${mentioned.split('@')[0]} ${insult}` : insult;

    await sock.sendMessage(chatId, {
        text: `😏 *INSULT*\n\n${text}\n\n_All in good fun!_`,
        mentions: mentioned ? [mentioned] : undefined
    }, { quoted: msg });
};
