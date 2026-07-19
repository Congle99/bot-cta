function formatMonthlyReport(players, month) {

    let report = "";

    report += `📊 **CTA REPORT - THÁNG ${month}**\n\n`;

    report += `👥 Tổng member: ${players.length}\n\n`;

    report += "━━━━━━━━━━━━━━━━━━\n\n";

    players.forEach((player, index) => {

        let icon = "⚪";

        if (player.attendance >= 90) {

            icon = "🟢";

        }
        else if (player.attendance >= 80) {

            icon = "🟡";

        }
        else if (player.attendance >= 60) {

            icon = "🟠";

        }
        else {

            icon = "🔴";

        }

        report +=
`${index + 1}. ${icon} **${player.ign}**

✅ Đi: ${player.attended}
❌ Vắng: ${player.absent}
📈 Attendance: ${player.attendance}%

`;

    });

    report += "━━━━━━━━━━━━━━━━━━\n\n";

    const lowAttendance =
        players.filter(player =>
            player.attendance < 80
        );

    if (lowAttendance.length > 0) {

        report += "⚠️ **Attendance dưới 80%**\n\n";

        lowAttendance.forEach(player => {

            report +=
`• ${player.ign} (${player.attendance}%)
`;

        });

    }
    else {

        report +=
"🎉 Không có thành viên nào dưới 80%.";

    }

    return report;

}

module.exports = formatMonthlyReport;