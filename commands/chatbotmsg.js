// .chatbotmsg <message> — owner-only command to set a fixed custom reply
// that gets sent instead of the AI response when Chatbot is running in
// single-number mode (see .chatbot on <number>). If no custom message is
// set, the default AI response is used (unchanged original behavior).
async function chatbotmsgCommand(sock, from, msg, isOwner, session, q) {
    if (!isOwner) {
        return sock.sendMessage(from, { text: '❌ Sirf *owner* hi chatbot reply message change kar sakta hai.' }, { quoted: msg });
    }

    const newMessage = (q || '').trim();

    if (!newMessage) {
        const current = session.aiCustomMessage;
        return sock.sendMessage(from, {
            text: `⚙️ *Current Chatbot Reply:*\n${current || '(default AI response use ho raha hai)'}\n\n` +
                  `Sirf single number mode mein use hota hai: .chatbot on <number>\n\n` +
                  `Naya fixed message set karne ke liye:\n*.chatbotmsg <your message>*\n\n` +
                  `Misaal: .chatbotmsg Abhi busy hoon, jald reply karunga!\n\n` +
                  `Default AI reply par wapis jane ke liye: *.chatbotmsg reset*`
        }, { quoted: msg });
    }

    if (newMessage.toLowerCase() === 'reset') {
        session.aiCustomMessage = null;
        return sock.sendMessage(from, { text: '✅ Chatbot reply *default AI response* par wapis set kar diya gaya.' }, { quoted: msg });
    }

    session.aiCustomMessage = newMessage;

    await sock.sendMessage(from, {
        text: `✅ *Chatbot Reply Updated!*\n\nNaya Fixed Message:\n${newMessage}\n\n` +
              `(Yeh message tab bhejega jab Chatbot single-number mode mein us number ko reply karega. ` +
              `Single number mode on karna na bhoolein: .chatbot on <number>)`
    }, { quoted: msg });
}

module.exports = chatbotmsgCommand;
