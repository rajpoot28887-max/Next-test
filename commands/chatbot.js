module.exports = async function(sock, chatId, msg, session, args) {
    const action = args[0]?.toLowerCase();
    const numberArg = args[1]?.replace(/\D/g, '');

    if (action === 'on') {
        session.aiEnabled = true;
        if (numberArg) {
            session.aiTargetNumber = numberArg;
            await sock.sendMessage(chatId, { text: `\u1F916 Chatbot AI ON only for +${numberArg}! The bot will auto-reply only to that number.` }, { quoted: msg });
        } else {
            session.aiTargetNumber = null;
            await sock.sendMessage(chatId, { text: '\u1F916 Chatbot AI ON! The bot will auto-reply to personal messages.' }, { quoted: msg });
        }
    } else if (action === 'off') {
        session.aiEnabled = false;
        session.aiTargetNumber = null;
        await sock.sendMessage(chatId, { text: '\u274C Chatbot AI OFF!' }, { quoted: msg });
    } else {
        await sock.sendMessage(chatId, { 
            text: `*\u1F3AE Chatbot Settings*\n\n` +
                `Status: ${session.aiEnabled ? 'ON' : 'OFF'}\n` +
                `Mode: ${session.aiEnabled ? (session.aiTargetNumber ? `Single number (+${session.aiTargetNumber})` : 'All chats') : '-'}\n\n` +
                `Use .chatbot on/off\n` +
                `Use .chatbot on <number> to enable for one number only\n` +
                `Use .chatbotmsg <message> to set a fixed reply for single-number mode\n\n` +
                `\u{2139}\uFE0F Auto-pause: agar aap khud kisi chat mein manually message bhejte ho, chatbot us chat mein 5 minute ke liye khud-ba-khud band ho jayega, phir wapis apne aap on ho jayega.` 
        }, { quoted: msg });
    }
};
