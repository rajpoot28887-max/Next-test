const { addWelcome, delWelcome, isWelcomeOn, getWelcomeMessage } = require('../lib/index');
const settings = require('../settings');

// .welcome on / .welcome off / .welcome set <message>
// Ported (and adapted to this project's lib/index.js helpers) from a friend's
// project. Covers "welcome" AND "setwelcome" both, via the "set" sub-command.
async function welcomeCommand(sock, from, msg, isAdmin, q) {
    if (!from.endsWith('@g.us')) {
        return sock.sendMessage(from, { text: 'Yeh command sirf *groups* mein use ho sakti hai.' }, { quoted: msg });
    }

    if (!isAdmin) {
        return sock.sendMessage(from, { text: '❌ Sirf *group admin* hi is command ko use kar sakte hain.' }, { quoted: msg });
    }

    const match = (q || '').trim();

    if (!match) {
        return sock.sendMessage(from, {
            text: `📥 *Welcome Message Setup*\n\n` +
                  `✅ *${settings.prefix}welcome on* — Welcome messages ON\n` +
                  `🛠️ *${settings.prefix}welcome set <message>* — Custom message set karein\n` +
                  `🚫 *${settings.prefix}welcome off* — Welcome messages OFF\n\n` +
                  `*Available Variables:*\n• {user} — naye member ko mention karta hai\n• {group} — group ka naam\n• {description} — group ki description`
        }, { quoted: msg });
    }

    const [sub, ...rest] = match.split(' ');
    const lower = sub.toLowerCase();
    const customMessage = rest.join(' ');

    if (lower === 'on') {
        if (await isWelcomeOn(from)) {
            return sock.sendMessage(from, { text: '⚠️ Welcome messages pehle se *ON* hain.' }, { quoted: msg });
        }
        await addWelcome(from, true, 'Welcome {user} to {group}! 🎉');
        return sock.sendMessage(from, {
            text: `✅ Welcome messages *ON* ho gaye.\nCustom message ke liye: *${settings.prefix}welcome set <message>*`
        }, { quoted: msg });
    }

    if (lower === 'off') {
        if (!(await isWelcomeOn(from))) {
            return sock.sendMessage(from, { text: '⚠️ Welcome messages pehle se *OFF* hain.' }, { quoted: msg });
        }
        await delWelcome(from);
        return sock.sendMessage(from, { text: '✅ Welcome messages *OFF* kar diye gaye.' }, { quoted: msg });
    }

    if (lower === 'set') {
        if (!customMessage) {
            return sock.sendMessage(from, {
                text: `⚠️ Message likhein. Misaal: *${settings.prefix}welcome set Welcome to the group!*`
            }, { quoted: msg });
        }
        await addWelcome(from, true, customMessage);
        return sock.sendMessage(from, { text: '✅ Custom welcome message *set* ho gaya.' }, { quoted: msg });
    }

    return sock.sendMessage(from, {
        text: `❌ Ghalat command. Use:\n*${settings.prefix}welcome on*\n*${settings.prefix}welcome set <message>*\n*${settings.prefix}welcome off*`
    }, { quoted: msg });
}

// Fired from the group-participants-update event when someone joins.
async function handleJoinEvent(sock, id, participants) {
    try {
        const enabled = await isWelcomeOn(id);
        if (!enabled) return;

        const customMessage = await getWelcomeMessage(id);
        const groupMetadata = await sock.groupMetadata(id);
        const groupName = groupMetadata.subject;
        const groupDesc = groupMetadata.desc || 'No description available';

        for (const participant of participants) {
            try {
                const participantString = typeof participant === 'string' ? participant : (participant.id || participant.toString());
                const user = participantString.split('@')[0];

                const finalMessage = (customMessage || 'Welcome {user} to {group}! 🎉')
                    .replace(/{user}/g, `@${user}`)
                    .replace(/{group}/g, groupName)
                    .replace(/{description}/g, groupDesc);

                await sock.sendMessage(id, { text: finalMessage, mentions: [participantString] });
            } catch (sendErr) {
                console.error('Welcome message send failed:', sendErr && sendErr.stack ? sendErr.stack : sendErr);
            }
        }
    } catch (error) {
        console.error('Error in handleJoinEvent:', error && error.stack ? error.stack : error);
    }
}

module.exports = { welcomeCommand, handleJoinEvent };
