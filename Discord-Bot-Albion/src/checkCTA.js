const db = require("../database/database");

function normalizeName(name) {

    return name
        .toLowerCase()
        .replace(/0/g, "o")
        .replace(/1/g, "i")
        .replace(/[^a-z0-9]/g, "");

}

function levenshtein(a, b) {

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {

        for (let j = 1; j <= a.length; j++) {

            if (b[i - 1] === a[j - 1]) {

                matrix[i][j] =
                    matrix[i - 1][j - 1];

            }
            else {

                matrix[i][j] = Math.min(

                    matrix[i - 1][j - 1] + 1,

                    matrix[i][j - 1] + 1,

                    matrix[i - 1][j] + 1

                );

            }

        }

    }

    return matrix[b.length][a.length];

}

function similarity(a, b) {

    if (!a || !b)
        return 0;

    return (
        1 -
        levenshtein(a, b) /
        Math.max(a.length, b.length)
    );

}

function containsScore(a, b) {

    if (
        a.includes(b) ||
        b.includes(a)
    ) {
        return 0.95;
    }

    return 0;

}

function checkCTA(playersFromOCR) {

    const databasePlayers =
        db.prepare(`
            SELECT
                id,
                discord_name,
                albion_name
            FROM players
        `).all();

    const attended = [];
    const review = [];
    const absent = [];
    const unknown = [];

    const usedOCR = new Set();
    const matchedPlayer = new Set();

    // ===========================
    // MATCH DATABASE <-> OCR
    // ===========================

    for (const player of databasePlayers) {

        const dbName =
            normalizeName(player.albion_name);

        let bestScore = 0;
        let bestIndex = -1;

        for (let i = 0; i < playersFromOCR.length; i++) {

            if (usedOCR.has(i))
                continue;

            const ocrName =
                normalizeName(playersFromOCR[i]);

            let score =
                similarity(
                    ocrName,
                    dbName
                );

            score = Math.max(
                score,
                containsScore(
                    ocrName,
                    dbName
                )
            );

            if (score > bestScore) {

                bestScore = score;
                bestIndex = i;

            }

        }

        if (bestIndex === -1)
            continue;

        if (bestScore >= 0.85) {

            attended.push({

                id: player.id,

                ign: player.albion_name,

                discord: player.discord_name,

                score: Math.round(bestScore * 100)

            });

            usedOCR.add(bestIndex);
            matchedPlayer.add(player.id);

        }
        else if (bestScore >= 0.70) {

            review.push({

                id: player.id,

                ign: player.albion_name,

                discord: player.discord_name,

                ocr: playersFromOCR[bestIndex],

                score: Math.round(bestScore * 100)

            });

            usedOCR.add(bestIndex);
            matchedPlayer.add(player.id);

        }

    }

    // ===========================
    // ABSENT
    // ===========================

    for (const player of databasePlayers) {

        if (!matchedPlayer.has(player.id)) {

            absent.push({

                id: player.id,

                ign: player.albion_name,

                discord: player.discord_name

            });

        }

    }

    // ===========================
    // UNKNOWN
    // ===========================

    for (let i = 0; i < playersFromOCR.length; i++) {

        if (!usedOCR.has(i)) {

            unknown.push(
                playersFromOCR[i]
            );

        }

    }

    return {

        attended,
        review,
        absent,
        unknown

    };

}

module.exports = checkCTA;