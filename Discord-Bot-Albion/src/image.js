const sharp = require("sharp");
const path = require("path");
const fs = require("fs");


async function processImage(inputPath) {


    const outputFolder =
        path.join(__dirname, "..", "temp");


    if (!fs.existsSync(outputFolder)) {

        fs.mkdirSync(outputFolder, {
            recursive: true
        });

    }


    const timestamp = Date.now();


    const leftOutput =
        path.join(
            outputFolder,
            `party_left_${timestamp}.png`
        );


    const rightOutput =
        path.join(
            outputFolder,
            `party_right_${timestamp}.png`
        );



    // ===== LEFT PARTY =====

    await sharp(inputPath)

        .extract({

            left: 26,

            top: 147,

            width: 107,

            height: 270

        })


        .resize({

            width: 1000

        })


        .grayscale()

        .normalize()

        .threshold(120)

        .sharpen({
            sigma:2
        })


        .png()

        .toFile(leftOutput);



    // ===== RIGHT PARTY =====

    await sharp(inputPath)

        .extract({

            left:242,

            top:147,

            width:120,

            height:270

        })


        .resize({

            width:1000

        })


        .grayscale()

        .normalize()

        .threshold(120)

        .sharpen({
            sigma:2
        })


        .png()

        .toFile(rightOutput);



    console.log(
        "LEFT:",
        leftOutput
    );


    console.log(
        "RIGHT:",
        rightOutput
    );



    return {

        left:leftOutput,

        right:rightOutput

    };

}



module.exports = processImage;