module.exports = async function (sock, chatId, msg) {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const challenger = msg.key.participant || msg.key.remoteJid;

    if (!mentioned) {
        return await sock.sendMessage(chatId, { text: '⚠️ Mention someone to challenge!\nExample: .tictactoe @friend' }, { quoted: msg });
    }

    const board = ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'];
    const boardText = `${board[0]}${board[1]}${board[2]}\n${board[3]}${board[4]}${board[5]}\n${board[6]}${board[7]}${board[8]}`;

    await sock.sendMessage(chatId, {
        text: `❌⭕ *TIC TAC TOE*\n\n@${challenger.split('@')[0]} challenged @${mentioned.split('@')[0]}!\n\n${boardText}\n\n_Full move-by-move play isn't wired up yet — this just starts a friendly challenge._`,
        mentions: [challenger, mentioned]
    }, { quoted: msg });
};
