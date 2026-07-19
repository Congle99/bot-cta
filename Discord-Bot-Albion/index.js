require("dotenv").config();

const processImage = require("./src/image");
const readText = require("./src/ocr");
const checkCTA = require("./src/checkCTA");
const saveCTAResult = require("./src/saveCTAResult");
const ctaSession = require("./src/ctaSession");
const fs = require("fs");
const path = require("path");
const ctafinish =
require("./commands/ctafinish");

const {
    Client,
    GatewayIntentBits
} = require("discord.js");


const checkrole =
require("./commands/checkrole");
const ctareport =
require("./commands/ctareport");


const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ]

});





client.once(
    "clientReady",
    () => {

        console.log(
            `Bot online: ${client.user.tag}`
        );

    }
);






client.on(
    "interactionCreate",
    async interaction => {


        if (!interaction.isChatInputCommand())
            return;



        if (
            interaction.commandName === "checkrole"
        ) {

            await checkrole.execute(
                interaction
            );

        }

        if (
    interaction.commandName === "ctareport"
) {

    await ctareport.execute(
        interaction
    );

}

if (
    interaction.commandName === "ctafinish"
) {

    await ctafinish.execute(
        interaction
    );

}


    }
    
);








// ===============================
// CTA IMAGE CHECK
// ===============================

client.on(
    "messageCreate",
    async message => {


        if(message.author.bot)
            return;



        if(!message.channel.isThread())
            return;



        const CTA_CHANNEL_ID =
            "1524774226756894740";



        if(
            message.channel.parentId !== CTA_CHANNEL_ID
        )
            return;



        if(
            message.attachments.size === 0
        )
            return;



        const image =
            message.attachments.first();



        if(
            !image.contentType?.startsWith("image/")
        )
            return;





        try {


            const tempFolder =
                path.join(
                    __dirname,
                    "temp"
                );



            if(
                !fs.existsSync(tempFolder)
            ){

                fs.mkdirSync(
                    tempFolder,
                    {
                        recursive:true
                    }
                );

            }




            const filePath =
                path.join(
                    tempFolder,
                    `${Date.now()}.png`
                );





            const response =
                await fetch(image.url);



            const buffer =
                Buffer.from(
                    await response.arrayBuffer()
                );



            fs.writeFileSync(
                filePath,
                buffer
            );



            console.log(
                "Đã lưu ảnh:",
                filePath
            );







            // =====================
            // IMAGE PROCESS
            // =====================


            const processedPath =
                await processImage(
                    filePath
                );



            console.log(
                "Ảnh crop:",
                processedPath.left
            );







            // =====================
            // OCR
            // =====================


            const leftText =
                await readText(
                    processedPath.left
                );



            let rightText = "";



            if(processedPath.right){

                rightText =
                    await readText(
                        processedPath.right
                    );

            }







            console.log(
                "========== OCR LEFT =========="
            );


            console.log(leftText);



            console.log(
                "========== OCR RIGHT =========="
            );


            console.log(rightText);



            console.log(
                "=============================="
            );









            // =====================
            // GỘP PLAYER
            // =====================


            const players = [

                ...leftText.split("\n"),

                ...rightText.split("\n")

            ]

            .map(name =>
                name.trim()
            )

            .filter(Boolean);





            const uniquePlayers =
            [
                ...new Set(players)
            ];


const allPlayers =
    ctaSession.addPlayers(
        message.channel.id,
        uniquePlayers
    );

console.log(
    "Tổng player trong thread:",
    allPlayers.length
);






// =====================
// SESSION INFO
// =====================

let reply =
    "✅ Đã thêm ảnh CTA.\n\n";

reply += `📸 Ảnh vừa nhận: ${uniquePlayers.length} player\n`;
reply += `👥 Tổng player trong thread: ${allPlayers.length}\n\n`;
reply += "Khi kết thúc CTA hãy dùng lệnh `/ctafinish` để chốt kết quả.";

await message.reply(reply);

return;



            if(
                result.attended.length > 0
            ){

                reply +=
                "✅ **Đã tham gia:**\n";



                result.attended.forEach(player => {


                    reply +=
                    `- ${player.ign} (${player.discord})\n`;


                });


            }





            if(
                result.absent.length > 0
            ){

                reply +=
                "\n❌ **Vắng mặt:**\n";



                result.absent.forEach(player => {


                    reply +=
                    `- ${player.ign} (${player.discord})\n`;


                });


            }





            await message.reply(
                reply
            );





        }

        catch(err){


            console.error(err);



            await message.reply(
                "❌ OCR thất bại."
            );


        }


    }
);







client.login(
    process.env.DISCORD_TOKEN
);