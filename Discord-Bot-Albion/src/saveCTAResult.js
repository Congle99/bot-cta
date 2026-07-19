const db = require("../database/database");



function getToday() {

    return new Date()
        .toISOString()
        .split("T")[0];

}





function saveCTAResult(result) {


    const date =
        getToday();




    const save =
        db.prepare(`

        INSERT INTO cta_history

        (
            player_id,
            cta_date,
            status
        )

        VALUES
        (
            ?,
            ?,
            ?
        )

        ON CONFLICT(player_id, cta_date)

        DO UPDATE SET

        status = excluded.status

    `);






    // =====================
    // NGƯỜI ĐI
    // =====================

    for (const player of result.attended) {


        save.run(

            player.id,

            date,

            "attended"

        );


    }






    // =====================
    // NGƯỜI VẮNG
    // =====================

    for (const player of result.absent) {


        save.run(

            player.id,

            date,

            "absent"

        );


    }



}



module.exports = saveCTAResult;