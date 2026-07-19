const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../database/database");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("checkrole")
        .setDescription("Đăng ký tên Albion của bạn")
        .addStringOption(option =>
            option
                .setName("ign")
                .setDescription("Tên nhân vật Albion")
                .setRequired(true)
        ),

    async execute(interaction) {

        try {

            // Đổi đúng tên role của bạn
            const roleName = "Albion Poy";

            // Lấy member mới nhất từ Discord
            const member = await interaction.guild.members.fetch(
                interaction.user.id
            );

            // ==========================
            // DEBUG ROLE
            // ==========================
            console.log("========== ROLE DEBUG ==========");

            member.roles.cache.forEach(role => {
                console.log(`Role: "${role.name}" | ID: ${role.id}`);
            });

            console.log("================================");

            const hasRole = member.roles.cache.some(
                role => role.name === roleName
            );

            if (!hasRole) {

                return interaction.reply({
                    content: `❌ Bạn chưa có role ${roleName}.`,
                    ephemeral: true
                });

            }

            const ign = interaction.options
                .getString("ign")
                .trim();

            db.prepare(`
                INSERT INTO players
                (
                    discord_id,
                    discord_name,
                    albion_name
                )
                VALUES
                (?, ?, ?)

                ON CONFLICT(discord_id)

                DO UPDATE SET

                    discord_name = excluded.discord_name,

                    albion_name = excluded.albion_name
            `).run(

                interaction.user.id,
                interaction.user.username,
                ign

            );

            const embed = new EmbedBuilder()
                .setColor(0x2ECC71)
                .setTitle("✅ Đăng ký thành công")
                .addFields(
                    {
                        name: "Discord",
                        value: `${interaction.user}`
                    },
                    {
                        name: "Albion IGN",
                        value: ign
                    },
                    {
                        name: "Role",
                        value: roleName
                    }
                )
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

        }
        catch (err) {

            console.error(err);

            if (interaction.replied || interaction.deferred) {

                await interaction.followUp({
                    content: "❌ Có lỗi xảy ra.",
                    ephemeral: true
                });

            } else {

                await interaction.reply({
                    content: "❌ Có lỗi xảy ra.",
                    ephemeral: true
                });

            }

        }

    }

};