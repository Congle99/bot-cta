const ctaSession = require("./ctaSession");
const checkCTA = require("./checkCTA");
const saveCTAResult = require("./saveCTAResult");

function finishCTA(threadId) {

    console.log("========== CTA FINISH ==========");

    const players =
        ctaSession.getPlayers(threadId);

    console.log("Players:", players);

    if (players.length === 0) {

        console.log("Không có session.");

        return {

            success: false,

            message: "❌ Thread này chưa có dữ liệu CTA."

        };

    }

    const result =
        checkCTA(players);

    console.log(result);

    saveCTAResult(result);

    ctaSession.clearSession(threadId);

    console.log("CTA Finish Done");

    return {

        success: true,

        players,

        result

    };

}

module.exports = finishCTA;