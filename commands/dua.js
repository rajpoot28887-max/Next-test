const duas = [
    {
        title: "Dua for Morning",
        arabic: "\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u064E\u0627 \u0648\u064E\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u064E \u0627\u0644\u0652\u0645\u064F\u0644\u0652\u0643\u064F \u0644\u0650\u0644\u0651\u0647\u0650",
        translit: "Asbahna wa asbahal mulku lillah",
        meaning: "We have entered the morning and the dominion belongs to Allah."
    },
    {
        title: "Dua Before Eating",
        arabic: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u0647\u0650",
        translit: "Bismillah",
        meaning: "In the name of Allah."
    },
    {
        title: "Dua After Eating",
        arabic: "\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623َ\u0637\u0652\u0639َ\u0645َنِي \u0647\u064E\u0630\u064E\u0627 \u0648َ\u0631َ\u0632َ\u0642َنِيه\u0650 \u0645\u0650\u0646\u0652 \u063A\u064E\u064A\u0652\u0631\u0650 \u062D\u064E\u0648\u0652\u0644\u064D \u0645\u0650\u0646\u0651\u064A \u0648\u064E\u0644\u0627 \u0642\u064F\u0648\u0651\u064E\u0629\u064D",
        translit: "Alhamdu lillahil-lathee at'amanee hatha wa razaqaneehi min ghayri hawlin minnee wa la quwwah",
        meaning: "Praise be to Allah who fed me this and provided it without any might or power from me."
    },
    {
        title: "Dua Before Sleeping",
        arabic: "\u0628\u0650\u0627\u0633\u0652\u0645\u0650\u0643َ \u0627\u0644\u0644\u0651\u0647\u064F\u0645\u0651َ \u0623\u064E\u0645\u064F\u0648\u062A\u064F \u0648\u064E\u0623\u064E\u062D\u0652\u064A\u064E\u0627",
        translit: "Bismika Allahumma amootu wa ahya",
        meaning: "In Your name, O Allah, I die and I live."
    },
    {
        title: "Dua After Waking Up",
        arabic: "\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623َحْيَانَا \u0628َعْدَ \u0645َا \u0623َمَاتَنَا \u0648\u064E\u0625\u0650\u0644َيْهِ \u0627\u0644\u0646\u064F\u0651\u0634\u064F\u0648\u0631\u064F",
        translit: "Alhamdu lillahil-lathee ahyana ba'da ma amatana wa ilayhin-nushoor",
        meaning: "Praise be to Allah who gave us life after having taken it from us, and unto Him is the resurrection."
    },
    {
        title: "Dua for Entering the Home",
        arabic: "\u0628ِسْمِ \u0627\u0644\u0644َّهِ \u0648َلَجْنَا، \u0648َبِسْمِ \u0627\u0644\u0644َّهِ \u062Eَرَجْنَا، \u0648َعَلَى \u0631َبِّنَا \u062A\u064E\u0648َكَّلْنَا",
        translit: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna",
        meaning: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust."
    },
    {
        title: "Dua for Forgiveness",
        arabic: "\u0631َبِّ \u0627\u063A\u0652\u0641\u0650\u0631\u0652 \u0644\u0650\u064A \u0648َتُبْ \u0639َلَيَّ \u0625ِنَّكَ \u0623َنْتَ \u0627\u0644\u062A\u0651َوَّابُ \u0627\u0644\u0631َّحِيمُ",
        translit: "Rabbighfir lee wa tub 'alayya innaka antat-Tawwabur-Raheem",
        meaning: "My Lord, forgive me and accept my repentance. You are the Ever-Relenting, the Most Merciful."
    },
    {
        title: "Dua for Anxiety and Sorrow",
        arabic: "\u0627\u0644\u0644َّهُمَّ \u0625ِنِّي \u0623َعُوذُ بِكَ \u0645ِنَ \u0627\u0644\u0647َمِّ \u0648َ\u0627\u0644\u062D\u064E\u0632َنِ",
        translit: "Allahumma inni a'oothu bika minal-hammi wal-hazan",
        meaning: "O Allah, I seek refuge in You from anxiety and sorrow."
    },
    {
        title: "Dua for Travel",
        arabic: "\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646َ \u0627\u0644َّذِي \u0633َخَّرَ \u0644َنَا \u0647َذَا \u0648َمَا \u0643\u064F\u0646َّا \u0644َهُ \u0645\u064F\u0642\u0652\u0631ِنِينَ",
        translit: "Subhanallathee sakhkhara lana hatha wa ma kunna lahu muqrineen",
        meaning: "Glory to Him who has subjected this to us, and we could never have accomplished it by ourselves."
    },
    {
        title: "Dua Seeking Knowledge",
        arabic: "\u0631َبِّ \u0632ِدْنِي \u0639ِلْمًا",
        translit: "Rabbi zidnee 'ilma",
        meaning: "My Lord, increase me in knowledge."
    }
];

module.exports = async function(sock, chatId, msg, q) {
    let dua;
    if (q) {
        dua = duas.find(d => d.title.toLowerCase().includes(q.toLowerCase()));
        if (!dua) {
            const list = duas.map(d => `\u2022 ${d.title}`).join('\n');
            return await sock.sendMessage(chatId, { text: `\u26A0\uFE0F Dua not found. Try one of these:\n\n${list}` }, { quoted: msg });
        }
    } else {
        dua = duas[Math.floor(Math.random() * duas.length)];
    }

    const text = `*\u1F54F ${dua.title}*\n\n` +
        `${dua.arabic}\n\n` +
        `_${dua.translit}_\n\n` +
        `"${dua.meaning}"`;

    await sock.sendMessage(chatId, { text }, { quoted: msg });
};
