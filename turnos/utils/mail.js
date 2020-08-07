"use strict";
const nodemailer = require("nodemailer");

async function main(obj){
    try{
        const transporter = nodemailer.createTransport({
            host : process.env.SMTP,
            port : process.env.PORT_MAIL,
            secure : false,
            auth: {
                user : process.env.USER_MAIL,
                pass : process.env.PASSWORD_MAIL,

            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let info = await transporter.sendMail({
            to:obj.to,
            subject:obj.subject,
            html:obj.html,
        });
        return info.messageId;

    } catch (error){
        console.log(error);
    }

};


module.exports = {

    main,

}; 
