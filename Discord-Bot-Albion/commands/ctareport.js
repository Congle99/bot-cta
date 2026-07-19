const {
    SlashCommandBuilder
} = require("discord.js");

const getMonthlyReport =
    require("../src/getMonthlyReport");

const formatMonthlyReport =
    require("../src/formatMonthlyReport");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("ctareport")

        .setDescription("Xem thống kê CTA theo tháng")

        .addIntegerOption(option =>
            option
                .setName("month")
                .setDescription("Tháng cần xem (1-12)")
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(12)
        ),

    async execute(interaction) {

        const month =
            interaction.options.getInteger("month")
            ?? (new Date().getMonth() + 1);

        const players =
            getMonthlyReport(month);

        if (players.length === 0) {

            return interaction.editReply("...");

        }

        const report =
            formatMonthlyReport(players, month);

        await interaction.editReply(report);

    }

};