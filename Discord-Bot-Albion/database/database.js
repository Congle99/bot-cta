const Database = require("better-sqlite3");


const db = new Database("albion.db");


db.pragma("journal_mode = WAL");



// =====================
// PLAYERS
// =====================

db.prepare(`
CREATE TABLE IF NOT EXISTS players (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    discord_id TEXT UNIQUE NOT NULL,

    discord_name TEXT NOT NULL,

    albion_name TEXT NOT NULL

)
`).run();





// =====================
// CTA HISTORY
// =====================

db.prepare(`
CREATE TABLE IF NOT EXISTS cta_history (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    player_id INTEGER NOT NULL,

    cta_date TEXT NOT NULL,

    status TEXT NOT NULL,


    FOREIGN KEY(player_id)
    REFERENCES players(id),


    UNIQUE(player_id, cta_date)

)
`).run();



module.exports = db;