const {main} = require('./../../utils/mail');

mailPorReserva=async(quien,id_usu,nombre_usu,correo,nombre_prof,apellido_prof,id_prof,fecha,hora)=>{
    if (quien){
        const to = process.env.ADMIN_MAIL;
        const subject = "Reserva de Turno";
        const html = `El usuario: ${id_usu} con nombre: ${nombre_usu} y correo: ${correo} reservo un turno
            para el ${fecha} a las ${hora} con ${nombre_prof} ${apellido_prof} que tiene el id ${id_prof}`;
        const finalObject = {to, subject, html, };
        console.log(finalObject);
        let resultMail = await main({to, subject, html});
        console.log(resultMail);        
    } else {
        const to = correo;
        const subject = "Mi Turno - Reserva de Turno";
        const html = `Se reservo un turno a tu nombre con ${nombre_prof} ${apellido_prof} para el 
            ${fecha} a las ${hora}. Muchas gracias por usar nuestros servicios`;
        const finalObject = {to, subject, html};
        const resultMail = await main({to, subject, html});
    }

}

module.exports={mailPorReserva}