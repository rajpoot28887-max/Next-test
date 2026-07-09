const flirts = [
    "You have a smile that could light up the darkest room.",
    "Talking to you is my favorite part of the day.",
    "You're the kind of person people write songs about.",
    "I didn't believe in love at first sight until I saw you.",
    "You must be an artist, because you drew me in instantly.",
    "Every time you laugh, the room gets brighter.",
    "You're proof that perfect people exist.",
    "If being amazing was a crime, you'd be in trouble.",
    "You have that rare kind of charm that's impossible to ignore.",
    "I think you just made my whole week better."
];

module.exports = async function (sock, chatId, msg) {
    const flirt = flirts[Math.floor(Math.random() * flirts.length)];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const text = mentioned ? `@${mentioned.split('@')[0]} ${flirt}` : flirt;

    await sock.sendMessage(chatId, {
        text: `😍 *FLIRT*\n\n${text}`,
        mentions: mentioned ? [mentioned] : undefined
    }, { quoted: msg });
};
