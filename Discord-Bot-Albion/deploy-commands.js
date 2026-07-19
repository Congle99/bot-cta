require("dotenv").config();

const ctafinish =
require("./commands/ctafinish");

const {
    REST,
    Routes
} = require("discord.js");



const checkrole =
require("./commands/checkrole");


const ctareport =
require("./commands/ctareport");





const commands = [

    checkrole.data.toJSON(),

    ctareport.data.toJSON(),

    ctafinish.data.toJSON()

];





const rest = new REST({

    version:"10"

}).setToken(

    process.env.DISCORD_TOKEN

);





(async()=>{


try{


console.log(
    "Đang đăng ký command..."
);




await rest.put(


    Routes.applicationGuildCommands(

        process.env.CLIENT_ID,

        process.env.GUILD_ID

    ),


    {

        body: commands

    }


);




console.log(
    "Đăng ký thành công!"
);




}

catch(error){


    console.log(error);


}


})();