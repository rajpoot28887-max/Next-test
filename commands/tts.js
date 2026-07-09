const axios = require('axios');
const { toOpus } = require('../lib/converter');

module.exports = async function(sock, chatId, msg, q) {
    if (!q) return await sock.sendMessage(chatId, { text: '\u26A0\uFE0F .tts <text>' }, { quoted: msg });
    
    try {
        await sock.sendMessage(chatId, { text: '\u1F442 Generating TTS...' }, { quoted: msg });
        
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(q)}&tl=en&client=tw-ob`;
        
        const response = await axios.get(ttsUrl, {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });
        
        // Google TTS returns MP3 - convert to OGG/Opus so it opens as a proper WhatsApp voice note
        const opusBuffer = await toOpus(Buffer.from(response.data), 'mp3');
        
        await sock.sendMessage(chatId, { 
            audio: opusBuffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: msg });
    } catch (e) {
        console.error('TTS error:', e);
        // Fallback: just send as text message
        await sock.sendMessage(chatId, { text: `\u1F442 TTS: "${q}"` }, { quoted: msg });
    }
};
