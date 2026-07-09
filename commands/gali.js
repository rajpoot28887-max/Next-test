module.exports = async function(sock, from, msg, session, args) {
    const text = args.join(' ');
    if (!text) return await sock.sendMessage(from, { text: "❌ Kinu lambiyan paana ae? Naam te likh!" }, { quoted: msg });

    try {
        await sock.sendMessage(from, { react: { text: '🤬', key: msg.key } });
        
        // Next level ultimate pakistani/punjabi roasting prompt
        const systemPrompt = "You are a frustrated, hardcore backbencher and street-smart guy from Lahore/Punjab. When given a name, generate a brutal, hilarious, and high-damage desi insult/gali. Use deep local slangs, raw jugtan, and aggressive words (like 'Khoti de puttar', 'Gashti deya', 'Kanjra', 'Kuttay de wair', 'Chawal de beej', 'Dheet', 'Lanti'). Make it feel like a real street fight or WhatsApp group lafda. IMPORTANT: Reply ONLY in aggressive Roman Urdu/Punjabi. Keep it 1-2 lines, extremely sharp, savage, and unfiltered. Do not add any intros, just hit directly.";
        const userMessage = `Target to destroy: ${text}`;
        
        const response = await session.getAIResponse(from, userMessage, systemPrompt);
        const cleanResponse = response.replace(/["']/g, "").trim();

        await sock.sendMessage(from, { text: cleanResponse }, { quoted: msg });
        
    } catch (e) {
        await sock.sendMessage(from, { text: "❌ gali ki ma ki chut ho gali ha ab owner ko bol is ko set kara ya kam wohi kar sakta ha : " + e.message }, { quoted: msg });
    }
};