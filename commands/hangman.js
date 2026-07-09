const words = [
    'javascript', 'elephant', 'pyramid', 'guitar', 'bicycle', 'volcano',
    'sandwich', 'umbrella', 'dinosaur', 'telescope', 'penguin', 'chocolate'
];

const stages = [
    '```\n  +---+\n      |\n      |\n      |\n     ===```',
    '```\n  +---+\n  O   |\n      |\n      |\n     ===```',
    '```\n  +---+\n  O   |\n  |   |\n      |\n     ===```',
    '```\n  +---+\n  O   |\n /|   |\n      |\n     ===```',
    '```\n  +---+\n  O   |\n /|\\  |\n      |\n     ===```',
    '```\n  +---+\n  O   |\n /|\\  |\n /    |\n     ===```',
    '```\n  +---+\n  O   |\n /|\\  |\n / \\  |\n     ===```'
];

module.exports = async function (sock, chatId, msg) {
    const word = words[Math.floor(Math.random() * words.length)];
    const masked = word.replace(/[a-z]/gi, '_ ').trim();

    await sock.sendMessage(chatId, {
        text: `🎯 *HANGMAN*\n\n${stages[0]}\n\nWord: ${masked}\nLetters: ${word.length}\n\n_This starts a round with a random word. Guessing/turn-tracking across messages isn't wired up yet — treat it as a word-reveal teaser for now._`
    }, { quoted: msg });
};
