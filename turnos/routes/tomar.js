const express=require('express');
const router=express.Router();
const {getCateProfesAllHab,getPriTurAllProfesPorCate,getTurAllUnProfe,buscoCorreoUsuario, 
    buscoNombreProf, reservoTurno, buscoFechaHoraTurnoReservado} = require('./../models/tomar');
const {mailPorReserva}=require('./../public/javascripts/turnomail');


router.get('/reservar/:id/:id_prof',async(req,res)=>{
    try {
        const {id,id_prof}=req.params;
        console.log(`id de agenda es ${id} y id_prof de profesional es ${id_prof}`);
        const {correo}=await buscoCorreoUsuario(parseInt(req.session.usuario));
        console.log(`Trae correo ${correo}`);
        const {nombre,apellido}=await buscoNombreProf(id_prof);
        console.log(`Trae nombre y apellido ${nombre} ${apellido}`);
        const object = {
            ocupado: 1,
            id_usuario: parseInt(req.session.usuario)
        };
        const result=await reservoTurno(id,object);
        const {fecha,hora}=await buscoFechaHoraTurnoReservado(id);
        console.log(`Trae fecha y hora ${fecha} ${hora}`);
        const resultMailAdmin=await mailPorReserva(true,req.session.usuario,req.session.nombre,
            correo,nombre,apellido,id_prof,fecha,hora);
        const resultMailSimple=await mailPorReserva(false,req.session.usuario,req.session.nombre,
            correo,nombre,apellido,id_prof,fecha,hora);
        res.render('turnoReservado',{bienvenida: `Hola ${req.session.nombre}`, mensaje: 
            `Has reservado un turno con ${nombre} ${apellido} para el ${fecha} a las ${hora} 
            Se enviara un correo a ${correo} con esta informacion. Cualquier cosa comunicate con
            nosotros desde CONTACTO. Gracias`});
    } catch(error) {
        console.log(error);
    }
    
});

router.get('/todoprof/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(` Llega a tomarTurnUnProfe con el id: ${req.params.id}`);
        const turUnProfe=await getTurAllUnProfe(id);
        res.render('tomarTurUnProfe',{bienvenida: `Hola ${req.session.nombre}`,turUnProfe:turUnProfe,
        nombre:turUnProfe[0].nombre, apellido:turUnProfe[0].apellido,
        id_catego_profes:turUnProfe[0].id_catego_profes,categoria:turUnProfe[0].categoria});
    } catch(error) {
        console.log(error);
    }
});

router.get('/:id/:cat',async(req,res)=>{
    try {
        const {id,cat}=req.params;
        const priTurProfes=await getPriTurAllProfesPorCate(id);
        if (priTurProfes.length==0){
            res.render('tomarPriTurDisp',{bienvenida: `Hola ${req.session.nombre}`, mensOK:1,
            mensaje:`No hay turnos disponible para esta Categoria`,categoria:cat});
        }
        else {
            res.render('tomarPriTurDisp',{bienvenida: `Hola ${req.session.nombre}`,priTurProfes:priTurProfes, categoria:cat});
        }
    } catch(error){
        console.log(error);
    }

});

router.get('/',async(req,res)=>{
    try{
        const cateProfesHab=await getCateProfesAllHab();
        res.render('tomarCateProfes',{bienvenida: `Hola ${req.session.nombre}`, cateProfesHab:cateProfesHab});
    } catch(error){
        console.log(error);
    }

});

module.exports=router;