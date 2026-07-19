const sharp = require("sharp");
const { createWorker } = require("tesseract.js");


async function readText(imagePath) {


    const imageBuffer =
        await sharp(imagePath)

            .grayscale()

            .normalize()

            .sharpen({
                sigma: 2
            })

            .resize({
                width: 1600
            })

            .png()

            .toBuffer();



    const worker =
        await createWorker("eng");



    try {


        await worker.setParameters({

            tessedit_pageseg_mode: "6",

            preserve_interword_spaces: "1",

            tessedit_char_whitelist:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        });



        const {
            data:{
                text
            }
        } =
        await worker.recognize(imageBuffer);



        const blacklist = [

            "Party",
            "Priority",
            "First",
            "Access",
            "Guild",
            "Alliance",
            "Member",
            "within",
            "overcrowded"

        ];



        const players =
            text
            .split("\n")
            .map(line => {


                let name =
                    line.replace(
                        /[^a-zA-Z0-9]/g,
                        ""
                    );



                // bỏ ký tự rác đầu dòng
                name =
    name.replace(
        /^[FJIl15w]+(?=[A-Z])/,
        ""
    );


// trường hợp OCR đọc "15wizir"
name =
    name.replace(
        /^[15]+(?=[a-z])/,
        ""
    );



                // cắt phần UI dính sau tên

                name =
    name.replace(
        /(Ml|Ll|lL|Fa|aF|ED7|EDsgl|EDwl|LED0l|LED0|LED|ED0|ED|E0)$/i,
        ""
    );



                return name;


            })

            .filter(name => {


                if(
                    name.length < 4 ||
                    name.length > 16
                )
                    return false;



                return !blacklist.some(word =>
                    name
                    .toLowerCase()
                    .includes(
                        word.toLowerCase()
                    )
                );


            });



        return [
            ...new Set(players)
        ]
        .join("\n");



    }

    catch(err){

        console.error(
            "OCR Error:",
            err
        );

        throw err;

    }

    finally{

        await worker.terminate();

    }


}


module.exports = readText;