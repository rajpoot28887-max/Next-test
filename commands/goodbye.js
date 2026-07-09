const { addGoodbye, delGoodBye, isGoodByeOn, getGoodbyeMessage } = require('../lib/index');
const settings = require('../settings');

// .goodbye on / .goodbye off / .goodbye set <message>
// Ported (and adapted to this project's lib/index.js helpers) from a friend's
// project. Covers "goodbye" AND "setgoodbye" both, via the "set" sub-command.
async function goodbyeCommand(sock, from, msg, isAdmin, q) {
    if (!from.endsWith('@g.us')) {
        return sock.sendMessage(from, { text: 'Yeh command sirf *groups* mein use ho sakti hai.' }, { quoted: msg });
    }

    if (!isAdmin) {
        return sock.sendMessage(from, { text: '❌ Sirf *group admin* hi is command ko use kar sakte hain.' }, { quoted: msg });
    }

    const match = (q || '').trim();

    if (!match) {
        return sock.sendMessage(from, {
            text: `📤 *Goodbye Message Setup*\n\n` +
                  `✅ *${settings.prefix}goodbye on* — Goodbye messages ON\n` +
                  `🛠️ *${settings.prefix}goodbye set <message>* — Custom message set karein\n` +
                  `🚫 *${settings.prefix}goodbye off* — Goodbye messages OFF\n\n` +
                  `*Available Variables:*\n• {user} — leave hone wale member ko mention karta hai\n• {group} — group ka naam`
        }, { quoted: msg });
    }

    const [sub, ...rest] = match.split(' ');
    const lower = sub.toLowerCase();
    const customMessage = rest.join(' ');

    if (lower === 'on') {
        if (await isGoodByeOn(from)) {
            return sock.sendMessage(from, { text: '⚠️ Goodbye messages pehle se *ON* hain.' }, { quoted: msg });
        }
        await addGoodbye(from, true, 'Goodbye {user} 👋');
        return sock.sendMessage(from, {
            text: `✅ Goodbye messages *ON* ho gaye.\nCustom message ke liye: *${settings.prefix}goodbye set <message>*`
        }, { quoted: msg });
    }

    if (lower === 'off') {
        if (!(await isGoodByeOn(from))) {
            return sock.sendMessage(from, { text: '⚠️ Goodbye messages pehle se *OFF* hain.' }, { quoted: msg });
        }
        await delGoodBye(from);
        return sock.sendMessage(from, { text: '✅ Goodbye messages *OFF* kar diye gaye.' }, { quoted: msg });
    }

    if (lower === 'set') {
        if (!customMessage) {
            return sock.sendMessage(from, {
                text: `⚠️ Message likhein. Misaal: *${settings.prefix}goodbye set Goodbye, take care!*`
            }, { quoted: msg });
        }
        await addGoodbye(from, true, customMessage);
        return sock.sendMessage(from, { text: '✅ Custom goodbye message *set* ho gaya.' }, { quoted: msg });
    }

    return sock.sendMessage(from, {
        text: `❌ Ghalat command. Use:\n*${settings.prefix}goodbye on*\n*${settings.prefix}goodbye set <message>*\n*${settings.prefix}goodbye off*`
    }, { quoted: msg });
}

// Fired from the group-participants-update event when someone leaves/is removed.
async function handleLeaveEvent(sock, id, participants) {
    try {
        const enabled = await isGoodByeOn(id);
        if (!enabled) return;

        const customMessage = await getGoodbyeMessage(id);
        const groupMetadata = await sock.groupMetadata(id);
        const groupName = groupMetadata.subject;

        for (const participant of participants) {
            try {
                const participantString = typeof participant === 'string' ? participant : (participant.id || participant.toString());
                const user = participantString.split('@')[0];

                const finalMessage = (customMessage || 'Goodbye {user} 👋')
                    .replace(/{user}/g, `@${user}`)
                    .replace(/{group}/g, groupName);

                await sock.sendMessage(id, { text: finalMessage, mentions: [participantString] });
            } catch (sendErr) {
                console.error('Goodbye message send failed:', sendErr && sendErr.stack ? sendErr.stack : sendErr);
            }
        }
    } catch (error) {
        console.error('Error in handleLeaveEvent:', error && error.stack ? error.stack : error);
    }
}

module.exports = { goodbyeCommand, handleLeaveEvent };
