function formatCTAReport(data) {

    const { attended, absent, unknown, review } = data.result;

    const totalGuild =
        attended.length +
        absent.length;

    const attendance =
        totalGuild === 0
            ? 0
            : Math.round(
                attended.length /
                totalGuild *
                100
            );

    let report = "";

    report += "📋 **CTA FINISHED**\n\n";

    report += `📅 ${new Date().toLocaleString("vi-VN")}\n`;
    report += `👥 Guild Members: ${totalGuild}\n\n`;

    report += "━━━━━━━━━━━━━━━━━━\n\n";

    report += "📊 **TỔNG KẾT**\n\n";

    report += `✅ Tham gia: ${attended.length}\n`;
    report += `❌ Vắng mặt: ${absent.length}\n`;
    report += `❓ Không có trong Database: ${unknown.length}\n`;
    report += `📈 Attendance: ${attendance}%\n\n`;

    report += "━━━━━━━━━━━━━━━━━━\n\n";

    // ==========================
    // ATTENDED
    // ==========================

    report += `✅ **THAM GIA (${attended.length})**\n\n`;

    if (attended.length === 0) {

        report += "Không có\n";

    } else {

        attended.forEach(player => {

            report += `🟢 ${player.ign}\n`;

        });

    }

    report += "\n━━━━━━━━━━━━━━━━━━\n\n";

    // ==========================
    // REVIEW
    // ==========================

    if (review.length > 0) {

        report += `⚠️ **CẦN KIỂM TRA OCR (${review.length})**\n\n`;

        review.forEach(player => {

            report +=
                `🟡 ${player.ocr}\n`;
            report +=
                `   ↳ ${player.ign} (${player.score}%)\n\n`;

        });

        report += "━━━━━━━━━━━━━━━━━━\n\n";

    }

    // ==========================
    // ABSENT
    // ==========================

    report += `❌ **VẮNG (${absent.length})**\n\n`;

    if (absent.length === 0) {

        report += "Không có\n";

    } else {

        absent.forEach(player => {

            report += `🔴 ${player.ign}\n`;

        });

    }

    report += "\n━━━━━━━━━━━━━━━━━━\n\n";

    // ==========================
    // UNKNOWN
    // ==========================

    report += `❓ **KHÔNG CÓ TRONG DATABASE (${unknown.length})**\n\n`;

    if (unknown.length === 0) {

        report += "Không có\n";

    } else {

        unknown.forEach(player => {

            report += `⚪ ${player}\n`;

        });

    }

    report += "\n━━━━━━━━━━━━━━━━━━\n\n";

    report += "💾 Attendance đã được lưu vào hệ thống.";

    return report;

}

module.exports = formatCTAReport;