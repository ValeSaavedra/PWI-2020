const express=require('express');
const router=express.Router();
const {main}=require("./../utils/mail");

router.get('/',(req,res)=>{

    res.render('contacto',{titulo: "Consultanos cualquier duda por aquí"});    

});

router.post('/', async(req,res)=>{

    console.log('Se enviaron datos al servidor');
    const {nombre, correo, asunto, mensaje} = req.body;
    console.log({nombre, correo, asunto, mensaje});
    const to = process.env.ADMIN_MAIL;
    const subject = "Nuevo mensaje desde el sitio web";
    const html = `Se contacto ${nombre} desde ${correo} con el asunto ${asunto} y la siguiente consulta: ${mensaje}`;

    const finalObject = {to, subject, html, };
    console.log(finalObject);
    const resultMail = await main({to, subject, html});
    console.log(resultMail);

    res.render('contacto',{titulo: "Nos contactaremos a la brevedad. Muchas gracias."});    
});


module.exports=router;