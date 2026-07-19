const {
    SlashCommandBuilder
} = require("discord.js");

const finishCTA =
require("../src/finishCTA");

const formatCTAReport =
require("../src/formatCTAReport");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("ctafinish")

        .setDescription("Kết thúc CTA"),


    async execute(interaction) {

        const data =
            finishCTA(
                interaction.channel.id
            );

        if (!data.success) {

            return interaction.reply({

                content: data.message,

                ephemeral: true

            });

        }

        await interaction.reply(

            formatCTAReport(data)

        );

    }

};