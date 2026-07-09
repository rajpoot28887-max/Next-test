const axios = require('axios');

module.exports = async function(sock, from, msg) {
    try {
        await sock.sendMessage(from, { text: '🏏 Fetching live scores...' }, { quoted: msg });

        const { data } = await axios.get('https://api.cricapi.com/v1/currentMatches', {
            params: { apikey: process.env.CRICKET_API_KEY || '', offset: 0 },
            timeout: 10000
        });

        if (!data || !data.data || data.data.length === 0) {
            return await sock.sendMessage(from, { text: '❌ Abhi koi live match nahi mil raha.' }, { quoted: msg });
        }

        const matches = data.data.slice(0, 5);
        let text = `*🏏 LIVE CRICKET SCORES*\n\n`;

        matches.forEach((m) => {
            text += `*${m.name}*\n`;
            text += `📍 ${m.venue || 'N/A'}\n`;
            text += `📊 Status: ${m.status}\n`;
            if (m.score && m.score.length > 0) {
                m.score.forEach(s => {
                    text += `   ${s.inning}: ${s.r}/${s.w} (${s.o} ov)\n`;
                });
            }
            text += `\n`;
        });

        text += `_Powered by CricAPI_`;

        await sock.sendMessage(from, { text }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Error fetching scores. Agar problem rahe to CRICKET_API_KEY set karo (free key: cricapi.com se milti hai).\n\n' + e.message }, { quoted: msg });
    }
};
