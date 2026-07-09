module.exports = async function (sock, chatId, msg) {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const challenger = msg.key.participant || msg.key.remoteJid;

    if (!mentioned) {
        return await sock.sendMessage(chatId, { text: '⚠️ Mention someone to challenge!\nExample: .chess @friend' }, { quoted: msg });
    }

    const board =
        '♜♞♝♛♚♝♞♜\n' +
        '♟♟♟♟♟♟♟♟\n' +
        '⬜⬛⬜⬛⬜⬛⬜⬛\n' +
        '⬛⬜⬛⬜⬛⬜⬛⬜\n' +
        '⬜⬛⬜⬛⬜⬛⬜⬛\n' +
        '⬛⬜⬛⬜⬛⬜⬛⬜\n' +
        '♙♙♙♙♙♙♙♙\n' +
        '♖♘♗♕♔♗♘♖';

    await sock.sendMessage(chatId, {
        text: `♟️ *CHESS*\n\n@${challenger.split('@')[0]} challenged @${mentioned.split('@')[0]}!\n\n${board}\n\n_This shows the starting position — full move tracking across messages isn't wired up yet._`,
        mentions: [challenger, mentioned]
    }, { quoted: msg });
};
