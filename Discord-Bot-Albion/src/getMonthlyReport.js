const db = require("../database/database");

function getMonthlyReport(month) {

    const monthString =
        String(month).padStart(2, "0");

    const rows =
        db.prepare(`
            SELECT
                p.id,
                p.albion_name,
                p.discord_name,

                SUM(
                    CASE
                        WHEN c.status = 'attended'
                        THEN 1
                        ELSE 0
                    END
                ) AS attended,

                SUM(
                    CASE
                        WHEN c.status = 'absent'
                        THEN 1
                        ELSE 0
                    END
                ) AS absent

            FROM players p

            LEFT JOIN cta_history c

            ON p.id = c.player_id

            AND strftime('%m', c.cta_date) = ?

            GROUP BY p.id

            ORDER BY attended DESC,
                     p.albion_name ASC
        `)
        .all(monthString);

    return rows.map(player => {

        const attended =
            player.attended || 0;

        const absent =
            player.absent || 0;

        const total =
            attended + absent;

        const attendance =
            total === 0
                ? 0
                : Math.round(
                    attended / total * 100
                );

        return {

            ign: player.albion_name,

            discord: player.discord_name,

            attended,

            absent,

            attendance

        };

    });

}

module.exports = getMonthlyReport;