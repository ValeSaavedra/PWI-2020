const express=require('express');
const router=express.Router();
const {getEspProfAllSinRepet,create,getEspProfAllUnProfHab,getEspProfModi,update,borrar}=require('./../../models/espac_prof');
const{getProfesionalAllOnlyHab,getProfesionalModi}=require('./../../models/profesional');
const{getEspacioAllOnlyHab}=require('./../../models/espacio');
//getProfesionalModi lo uso solo para traer el nombre y apellido del profesional que quiero asignarle nuevos registros en altaAsigUnProf

router.post('/modificar/:id/:id_prof',async(req,res)=>{
    try{
        const {id,id_prof} = req.params;
        console.log(req.params);
        console.log(req.body);
        const {id_espacio, dia_sem, hora_desde, hora_hasta, duracion } = req.body;
        const object= {
            id_espacio: id_espacio,
            id_usuario: parseInt(req.session.usuario),
            dia_sem: dia_sem,
            hora_desde: hora_desde,
            hora_hasta: hora_hasta,
            duracion: duracion            
        };
        const result= await update(id,object);
        res.redirect(`/admin/asignacion/verprofesional/${req.params.id_prof}`);
    } catch(error){
        console.log(error);
    }

});

router.get('/modi/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const espProfModi = await getEspProfModi(id);
        const espacioHab = await getEspacioAllOnlyHab()
        res.render('modiAsignacion',{bienvenida: `Hola ${req.session.nombre}`,espProfModi, espacioHab:espacioHab});
    } catch(error){
        console.log(error);
    }

});

router.delete('/baja/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(`El registro a eliminar permanentemente es el ${id}`);
        const result=await borrar(id);
        res.json({success:true});
    } catch(error){
        console.log(error);
        res.json({success:false});
    }


});


router.post('/alta/:id_prof',async(req,res)=>{
    try{
        console.log(req.params);
        console.log(req.body);
        const {id_prof}=req.params;
        const {id_espacio, dia_sem, hora_desde, hora_hasta, duracion}=req.body;
        const object={
            id_espacio: id_espacio,
            id_prof: id_prof,
            id_usuario: parseInt(req.session.usuario),
            dia_sem: dia_sem,
            hora_desde: hora_desde,
            hora_hasta: hora_hasta,
            duracion: duracion
        };
        const result=await create(object);
        res.redirect(`/admin/asignacion/verprofesional/${req.params.id_prof}`);
    } catch(error){
        console.log(error);
    }

});

router.get('/alta/:id_prof',async(req,res)=>{

    try{
        const {id_prof}=req.params;
        const espacioHab=await getEspacioAllOnlyHab();
        const profNomApe=await getProfesionalModi(id_prof);
        console.log(`id_prof vien con ${id_prof}`);
        console.log(`id_prof viene con ${id_prof} y proNomApe tiene ${profNomApe.nombre}`)
        res.render('altaAsigUnProf',{bienvenida: `Hola ${req.session.nombre}`,espacioHab:espacioHab,id_prof:id_prof,
        nombre_profesional:profNomApe.nombre, apellido_profesional:profNomApe.apellido});        
    } catch(error){
        console.log(error);
    }
});





router.get('/verprofesional/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const allUnProfHab=await getEspProfAllUnProfHab(id);
        res.render('asignacionUnProf',{bienvenida: `Hola ${req.session.nombre}`,allUnProfHab:allUnProfHab, 
        nombre: allUnProfHab[0].nombre_profesional, apellido: allUnProfHab[0].apellido, profesional:allUnProfHab[0].id_prof});
    } catch(error){
        console.log(error);
    }
});

router.post('/alta',async(req,res)=>{
    try{
        const {id_profesional, id_espacio, dia_sem, hora_desde, hora_hasta, duracion  } = req.body;
        const object={
            id_espacio: id_espacio,
            id_prof: id_profesional,
            id_usuario: parseInt(req.session.usuario),
            dia_sem: dia_sem,
            hora_desde: hora_desde,
            hora_hasta: hora_hasta,
            duracion: duracion
        }
        const result = await create(object);
        res.redirect('/admin/asignacion');
        console.log(req.body);
    } catch(error){
        console.log(error);
    }

});


router.get('/alta',async(req,res)=>{
    try{
        const profesionalHab=await getProfesionalAllOnlyHab();
        const espacioHab=await getEspacioAllOnlyHab();
        res.render('altaAsignacion',{bienvenida: `Hola ${req.session.nombre}`,profesionalHab:profesionalHab,espacioHab:espacioHab});
    } catch(error){
        console.log(error);
    }
});

router.get('/',async(req,res)=>{
    try{
        const espProfSinRepet=await getEspProfAllSinRepet();
        res.render('adminAsignacion',{bienvenida: `Hola ${req.session.nombre}`, espProfSinRepet:espProfSinRepet});
    } catch(error){
        console.log(error);
    }
});


module.exports=router;