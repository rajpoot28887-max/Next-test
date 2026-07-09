const roasts = [
    "You're like a cloud. When you disappear, it's a beautiful day!",
    "I'd agree with you but then we'd both be wrong.",
    "You're not stupid; you just have bad luck thinking.",
    "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
    "You're the reason the gene pool needs a lifeguard.",
    "If laughter is the best medicine, your face must be curing the world.",
    "You're not dumb. You just have bad luck when it comes to thinking.",
    "I'd explain it to you, but I left my crayons at home.",
    "You're like a software update. Whenever I see you, I think 'Not now'.",
    "If I had a dollar for every time you said something smart, I'd be broke.",
    "You're proof that evolution can go in reverse.",
    "I'm jealous of people who don't know you.",
    "You're not ugly, you're just not your type.",
    "If brains were dynamite, you wouldn't have enough to blow your nose.",
    "You're like a penny - two-faced and not worth much."
];

module.exports = async function(sock, chatId, msg) {
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const text = mentioned ? `@${mentioned.split('@')[0]} ${roast}` : roast;
    
    await sock.sendMessage(chatId, { 
        text: `*\u1F525 ROAST*\n\n${text}\n\n_Just for fun!_`,
        mentions: mentioned ? [mentioned] : undefined
    }, { quoted: msg });
};
