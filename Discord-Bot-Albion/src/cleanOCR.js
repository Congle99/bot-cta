function cleanOCR(lines) {

    return lines
        .map(name => {


            name = name.trim();


            // bỏ ký tự đầu rác
            name = name.replace(/^[^a-zA-Z0-9]+/, "");


            // lỗi OCR phổ biến Albion
            name = name
                .replace(/^4/, "V")
                .replace(/2$/,"z")
                .replace(/0/g,"O")
                .replace(/1/g,"I");


            // bỏ hậu tố rác OCR
            name = name.replace(
                /(GD|QJ|DJ|CG)$/i,
                ""
            );


            // chỉ giữ IGN
            name = name.replace(
                /[^a-zA-Z0-9]/g,
                ""
            );


            return name;


        })
        .filter(
            name => name.length >= 3
        );

}


module.exports = cleanOCR;