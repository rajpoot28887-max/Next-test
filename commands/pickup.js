const lines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Do you have a map? I keep getting lost in your eyes.",
    "Is your name Google? Because you have everything I've been searching for.",
    "If you were a vegetable, you'd be a cute-cumber.",
    "Are you a parking ticket? Because you've got fine written all over you.",
    "Do you believe in love at first sight, or should I walk by again?",
    "Are you made of copper and tellurium? Because you're Cu-Te.",
    "Is it hot in here, or is it just you?",
    "You must be tired, because you've been running through my mind all day.",
    "Are you a camera? Because every time I look at you, I smile."
];

module.exports = async function (sock, chatId, msg) {
    const line = lines[Math.floor(Math.random() * lines.length)];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const text = mentioned ? `@${mentioned.split('@')[0]} ${line}` : line;

    await sock.sendMessage(chatId, {
        text: `💘 *PICKUP LINE*\n\n${text}`,
        mentions: mentioned ? [mentioned] : undefined
    }, { quoted: msg });
};
