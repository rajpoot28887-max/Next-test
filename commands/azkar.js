const azkarMorning = [
    { arabic: "\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u064E\u0627 \u0648\u064E\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u064E \u0627\u0644\u0652\u0645\u064F\u0644\u0652\u0643\u064F \u0644\u0650\u0644\u0651\u0647\u0650، \u0648\u064E\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650", meaning: "We have entered the morning and the dominion belongs to Allah, and all praise is for Allah.", count: "1x" },
    { arabic: "\u0627\u0644\u0644\u0651\u0647\u064F\u0645\u0651\u064E \u0628\u0650\u0643\u064E \u0623\u064E\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u064E\u0627 \u0648\u064E\u0628\u0650\u0643\u064E \u0623\u064E\u0645\u0652\u0633\u064E\u064A\u0652\u0646\u064E\u0627", meaning: "O Allah, by You we enter the morning and by You we enter the evening.", count: "1x" },
    { arabic: "\u0623\u064E\u0639\u064F\u0648\u0630\u064F \u0628\u0650\u0643\u064E\u0644\u0650\u0645\u064E\u0627\u062A\u0650 \u0627\u0644\u0644\u0651\u0647\u0650 \u0627\u0644\u062A\u0651\u064E\u0627\u0645\u0651\u064E\u0627\u062A\u0650 \u0645\u0650\u0646\u0652 \u0634\u064E\u0631\u0651\u0650 \u0645\u064E\u0627 \u062E\u064E\u0644\u064E\u0642\u064E", meaning: "I seek refuge in the perfect words of Allah from the evil of what He has created.", count: "3x" },
    { arabic: "\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646َ \u0627\u0644\u0644\u0651\u0647\u0650 \u0648\u064E\u0628\u0650\u062D\u064E\u0645\u0652\u062F\u0650\u0647\u0650", meaning: "Glory be to Allah and praise be to Him.", count: "100x" },
    { arabic: "\u0644\u0627 \u0625\u0650\u0644\u064E\u0647َ \u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0644\u0651\u0647\u064F \u0648\u064E\u062D\u0652\u062F\u064E\u0647\u064F \u0644\u0627 \u0634\u064E\u0631\u064A\u0643َ \u0644\u064E\u0647\u064F", meaning: "There is no deity except Allah, alone, without any partner.", count: "10x" }
];

const azkarEvening = [
    { arabic: "\u0623َمْسَيْنَا \u0648َأَمْسَى \u0627\u0644\u0652\u0645\u064F\u0644\u0652\u0643\u064F \u0644\u0650\u0644\u0651\u0647\u0650، \u0648َ\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650", meaning: "We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.", count: "1x" },
    { arabic: "\u0627\u0644\u0644\u0651\u0647\u064F\u0645\u0651َ \u0628ِكَ \u0623َمْسَيْنَا \u0648َبِكَ \u0623َصْبَحْنَا", meaning: "O Allah, by You we enter the evening and by You we enter the morning.", count: "1x" },
    { arabic: "\u0623َعُوذُ بِكَلِمَاتِ \u0627\u0644\u0644َّهِ \u0627\u0644\u062A\u0651َامَّاتِ \u0645ِنْ \u0634َرِّ \u0645َا خَلَقَ", meaning: "I seek refuge in the perfect words of Allah from the evil of what He has created.", count: "3x" },
    { arabic: "\u0627\u0644\u0644َّهُمَّ \u0625ِنِّي \u0623َسْأَلُكَ \u0627\u0644\u0639َافِيَةَ \u0641ِي \u0627\u0644\u062F\u0651ُنْيَا \u0648َ\u0627\u0644\u0622خِرَةِ", meaning: "O Allah, I ask You for well-being in this world and the Hereafter.", count: "1x" },
    { arabic: "\u062D\u064E\u0633ْبِيَ \u0627\u0644\u0644َّهُ \u0644\u0627 \u0625ِلَهَ \u0625ِلَّا \u0647\u064F\u0648َ عَلَيْهِ \u062A\u064E\u0648َكَّلْتُ \u0648َهُوَ \u0631َبُّ \u0627\u0644\u0639َرْشِ \u0627\u0644\u0639َظِيمِ", meaning: "Allah is sufficient for me. There is no deity except Him. Upon Him I have relied, and He is the Lord of the Mighty Throne.", count: "7x" }
];

module.exports = async function(sock, chatId, msg, q) {
    const type = q ? q.toLowerCase().trim() : '';
    let list, label, emoji;

    if (type === 'evening' || type === 'sham' || type === 'maghrib') {
        list = azkarEvening;
        label = 'Evening Azkar';
        emoji = '\u1F307';
    } else if (type === 'morning' || type === 'subh' || type === 'fajr') {
        list = azkarMorning;
        label = 'Morning Azkar';
        emoji = '\u1F305';
    } else {
        const hour = new Date().getHours();
        const isEvening = hour >= 15 || hour < 4;
        list = isEvening ? azkarEvening : azkarMorning;
        label = isEvening ? 'Evening Azkar' : 'Morning Azkar';
        emoji = isEvening ? '\u1F307' : '\u1F305';
    }

    let text = `*${emoji} ${label}*\n\n`;
    list.forEach((z, i) => {
        text += `*${i + 1}.* ${z.arabic}\n`;
        text += `_${z.meaning}_\n`;
        text += `\u1F501 Recite: ${z.count}\n\n`;
    });
    text += `_Use .azkar morning or .azkar evening to choose a set._`;

    await sock.sendMessage(chatId, { text }, { quoted: msg });
};
