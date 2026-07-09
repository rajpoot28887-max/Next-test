const fs = require('fs');
const path = require('path');
const settings = require('../settings');

// .prefix <symbol> — owner-only command to change the bot's command prefix.
// Accepts any 1-3 characters/emoji (e.g. "!", "#", "..", "🔥", etc.).
// Change is applied immediately in memory AND persisted to settings.js
// so it survives a bot restart.
async function prefixCommand(sock, from, msg, isOwner, q) {
    if (!isOwner) {
        return sock.sendMessage(from, {
            text: '❌ Sirf *owner* hi prefix change kar sakta hai.'
        }, { quoted: msg });
    }

    const newPrefix = (q || '').trim();

    if (!newPrefix) {
        return sock.sendMessage(from, {
            text: `⚙️ *Current Prefix:* ${settings.prefix}\n\n` +
                  `Naya prefix set karne ke liye:\n*${settings.prefix}prefix <symbol>*\n\n` +
                  `Misaal: ${settings.prefix}prefix !\n` +
                  `Emoji bhi chalega: ${settings.prefix}prefix 🔥`
        }, { quoted: msg });
    }

    if (newPrefix.includes(' ')) {
        return sock.sendMessage(from, {
            text: '❌ Prefix mein *space* allowed nahi hai.'
        }, { quoted: msg });
    }

    // Count actual characters correctly (so a single emoji, which can be
    // made of multiple UTF-16 code units, still counts as 1 character).
    const charCount = [...newPrefix].length;
    if (charCount < 1 || charCount > 3) {
        return sock.sendMessage(from, {
            text: '❌ Prefix *1 se 3* characters/emoji ke darmiyan hona chahiye.'
        }, { quoted: msg });
    }

    const oldPrefix = settings.prefix;

    // Persist to settings.js on disk so the new prefix survives a restart.
    try {
        const settingsPath = path.join(__dirname, '..', 'settings.js');
        const content = fs.readFileSync(settingsPath, 'utf8');
        const updated = content.replace(
            /prefix:\s*(['"]).*?\1/,
            `prefix: '${newPrefix.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
        );
        fs.writeFileSync(settingsPath, updated, 'utf8');
    } catch (e) {
        console.error('Failed to persist prefix change:', e && e.stack ? e.stack : e);
    }

    // Update the in-memory settings object immediately — since every file
    // requires the same cached `settings` module, this takes effect for the
    // whole bot right away without needing a restart.
    settings.prefix = newPrefix;

    await sock.sendMessage(from, {
        text: `✅ *Prefix Updated!*\n\n` +
              `Purana Prefix: ${oldPrefix}\n` +
              `Naya Prefix: ${newPrefix}\n\n` +
              `Ab commands is tarah likhein: *${newPrefix}menu*`
    }, { quoted: msg });
}

module.exports = prefixCommand;
