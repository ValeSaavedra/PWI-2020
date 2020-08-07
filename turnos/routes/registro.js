const express = require('express');
const router = express.Router();
const {existedni,create} = require("./../models/loginModel");
const {main} = require("./../utils/mail");
router.get('/', (req,res)=>{
    try {
        res.render('registro',{titulo: "Registrate para ser usuario de nuestra web. Gracias"})

    } catch(error){
        console.log(error);
    }
});
router.post('/',async(req,res)=>{
    try {
        const {dni,pass,correo,nombre,apellido, domicilio} =req.body
        // console.log(req.body);
        const buscodni=await existedni(dni);
        if (buscodni.length==0){
            console.log("No hay DNI, puedo agregarlo");
            const object={
                dni:dni,
                password:pass,
                correo:correo,
                nombre:nombre,
                apellido:apellido,
                domicilio:domicilio,
            };
            console.log("Inserto si puedo",object);
            console.log("Correo del usuario",correo);
            const result=await create(object);

            // ENVIO MAIL AL USUARIO QUE SE REGISTRO Y AL ADMINITRADOR DEL SITIO
            let to = process.env.ADMIN_MAIL;
            let subject = "Nuevo usuario registrado en el sitio web";
            let html = `Se registro ${nombre} ${apellido}  desde ${correo} con el DNI ${dni} `;
            let finalObject = {to, subject, html, };
            console.log(finalObject);
            let resultMail = await main({to, subject, html});
            console.log(resultMail);

            to = correo;
            subject = "MiTurno Web - Nuevo registro";
            html = `Gracias ${nombre} ${apellido} por registrarte en nuestro sitio con el DNI ${dni}, tu contraseña es ${pass} `;
            finalObject = {to, subject, html, };
            console.log(finalObject);
            resultMail = await main({to, subject, html});
            console.log(resultMail);


            res.redirect("/login");

        }
        else {
            console.log("Hay DNI o doy otro error",buscodni.length);
            res.render('registro',{titulo:"DNI existente, contactate con nosotros"});

        }
    } catch(error){
        console.log(error);
    }



});

module.exports=router;