const axios = require('axios');

// Categories where the action targets ANOTHER person (mention or reply someone)
const ACTION_VERBS = {
    hug: 'hugged',
    kiss: 'kissed',
    pat: 'patted',
    cuddle: 'cuddled',
    bully: 'bullied',
    lick: 'licked',
    bonk: 'bonked',
    yeet: 'yeeted',
    highfive: 'high-fived',
    handhold: 'held hands with',
    nom: 'nommed on',
    bite: 'bit',
    slap: 'slapped',
    kill: 'killed',
    poke: 'poked'
};

// Categories that are just a self-reaction / mood, no target needed
const SELF_CATEGORIES = [
    'waifu', 'neko', 'shinobu', 'megumin', 'cry', 'awoo',
    'smug', 'blush', 'smile', 'wave', 'happy', 'wink', 'dance', 'cringe'
];

const EMOJI = {
    hug: '🤗', kiss: '😘', pat: '🫳', cuddle: '🥰', bully: '😈', lick: '👅',
    bonk: '🔨', yeet: '🚀', highfive: '🙌', handhold: '🤝', nom: '😋', bite: '😬',
    slap: '👋', kill: '💀', poke: '👉', waifu: '💗', neko: '🐱', shinobu: '🦋',
    megumin: '💥', cry: '😢', awoo: '🐺', smug: '😏', blush: '😳', smile: '😄',
    wave: '👋', happy: '😊', wink: '😉', dance: '💃', cringe: '😬'
};

const ALL_CATEGORIES = [...Object.keys(ACTION_VERBS), ...SELF_CATEGORIES];

async function fetchImage(category) {
    const res = await axios.get(`https://api.waifu.pics/sfw/${category}`, { timeout: 15000 });
    if (!res.data || !res.data.url) throw new Error('No image returned');
    return res.data.url;
}

async function animeReact(sock, chatId, msg, category, senderJid) {
    try {
        const imageUrl = await fetchImage(category);
        const label = category.toUpperCase();
        const emoji = EMOJI[category] || '🎴';

        if (SELF_CATEGORIES.includes(category)) {
            const caption = `*${emoji} ${label}*\n\n@${senderJid.split('@')[0]}`;
            await sock.sendMessage(chatId, { image: { url: imageUrl }, caption, mentions: [senderJid] }, { quoted: msg });
            return;
        }

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
        const target = mentioned[0] || quotedParticipant;
        const verb = ACTION_VERBS[category] || category;

        let caption, mentions;
        if (target) {
            caption = `*${emoji} ${label}*\n\n@${senderJid.split('@')[0]} ${verb} @${target.split('@')[0]}!`;
            mentions = [senderJid, target];
        } else {
            caption = `*${emoji} ${label}*\n\n@${senderJid.split('@')[0]} ${verb} the air!\n_Tag or reply someone to target them._`;
            mentions = [senderJid];
        }

        await sock.sendMessage(chatId, { image: { url: imageUrl }, caption, mentions }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(chatId, { text: `❌ ${category} command error: ` + e.message }, { quoted: msg });
    }
}

module.exports = { animeReact, ALL_CATEGORIES, ACTION_VERBS, SELF_CATEGORIES };
