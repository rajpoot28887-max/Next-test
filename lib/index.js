const fs = require('fs-extra');
const path = require('path');

const WELCOME_FILE = path.join(__dirname, '../data/welcome_settings.json');
const GOODBYE_FILE = path.join(__dirname, '../data/goodbye_settings.json');
const ANTILINK_FILE = path.join(__dirname, '../data/antilink_settings.json');
const SUDO_FILE = path.join(__dirname, '../data/sudo_users.json');

// Helper to ensure data directory exists
const ensureDataDir = () => {
    fs.ensureDirSync(path.join(__dirname, '../data'));
};

// Welcome Functions
async function addWelcome(chatId, status, message) {
    ensureDataDir();
    let data = {};
    if (fs.existsSync(WELCOME_FILE)) data = fs.readJsonSync(WELCOME_FILE);
    data[chatId] = { status, message };
    fs.writeJsonSync(WELCOME_FILE, data);
}

async function delWelcome(chatId) {
    if (!fs.existsSync(WELCOME_FILE)) return;
    let data = fs.readJsonSync(WELCOME_FILE);
    delete data[chatId];
    fs.writeJsonSync(WELCOME_FILE, data);
}

async function isWelcomeOn(chatId) {
    if (!fs.existsSync(WELCOME_FILE)) return false;
    let data = fs.readJsonSync(WELCOME_FILE);
    return data[chatId] ? data[chatId].status : false;
}

async function getWelcomeMessage(chatId) {
    if (!fs.existsSync(WELCOME_FILE)) return null;
    let data = fs.readJsonSync(WELCOME_FILE);
    return data[chatId] ? data[chatId].message : null;
}

// Goodbye Functions
async function addGoodbye(chatId, status, message) {
    ensureDataDir();
    let data = {};
    if (fs.existsSync(GOODBYE_FILE)) data = fs.readJsonSync(GOODBYE_FILE);
    data[chatId] = { status, message };
    fs.writeJsonSync(GOODBYE_FILE, data);
}

async function delGoodBye(chatId) {
    if (!fs.existsSync(GOODBYE_FILE)) return;
    let data = fs.readJsonSync(GOODBYE_FILE);
    delete data[chatId];
    fs.writeJsonSync(GOODBYE_FILE, data);
}

async function isGoodByeOn(chatId) {
    if (!fs.existsSync(GOODBYE_FILE)) return false;
    let data = fs.readJsonSync(GOODBYE_FILE);
    return data[chatId] ? data[chatId].status : false;
}

async function getGoodbyeMessage(chatId) {
    if (!fs.existsSync(GOODBYE_FILE)) return null;
    let data = fs.readJsonSync(GOODBYE_FILE);
    return data[chatId] ? data[chatId].message : null;
}

// Antilink Functions
async function getAntilink(chatId) {
    if (!fs.existsSync(ANTILINK_FILE)) return null;
    let data = fs.readJsonSync(ANTILINK_FILE);
    return data[chatId] || null;
}

// Sudo Functions (persisted list of extra users granted owner-level access)
function readSudoList() {
    if (!fs.existsSync(SUDO_FILE)) return [];
    try {
        return fs.readJsonSync(SUDO_FILE);
    } catch (e) {
        return [];
    }
}

async function getSudoList() {
    return readSudoList();
}

async function addSudo(jid) {
    ensureDataDir();
    const list = readSudoList();
    if (!list.includes(jid)) {
        list.push(jid);
        fs.writeJsonSync(SUDO_FILE, list);
    }
    return true;
}

async function removeSudo(jid) {
    ensureDataDir();
    let list = readSudoList();
    list = list.filter(j => j !== jid);
    fs.writeJsonSync(SUDO_FILE, list);
    return true;
}

async function isSudo(sender) {
    const list = readSudoList();
    const senderClean = String(sender).replace(/[^0-9]/g, '');
    return list.some(j => String(j).replace(/[^0-9]/g, '') === senderClean);
}

module.exports = {
    addWelcome,
    delWelcome,
    isWelcomeOn,
    getWelcomeMessage,
    addGoodbye,
    delGoodBye,
    isGoodByeOn,
    getGoodbyeMessage,
    getAntilink,
    isSudo,
    addSudo,
    removeSudo,
    getSudoList,
    incrementWarningCount: async () => 1, // Placeholders to prevent crashes
    resetWarningCount: async () => {},
};
