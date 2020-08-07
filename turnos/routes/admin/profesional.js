const express = require('express');
const router=express.Router();
const {getProfesionalAll,create,getProfesionalModi,update,profesionalEnUso}=require('./../../models/profesional');
const {getCateProfesAll}=require('./../../models/cateProfes');


router.put('/baja/:id/:habilitado',async(req,res)=>{
    try{
        const {id,habilitado} = req.params;
        puedo=false;
        if (habilitado==0){
            const enUso=await profesionalEnUso(id);
            if (enUso.length==0){
                puedo=true;
                console.log("Paso por aca");
            }
        }
        else{
            puedo=true;
        }
        if (puedo){
            const result=await update(id,{habilitado:habilitado,id_usuario:req.session.usuario});
        }
        res.json({success:true});
    } catch(error){
        console.log(error);
        res.json({success:false});
    }

});

router.post('/modificar/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const {id_catego_profes, nombre, apellido, correo, telefono, cuit} = req.body;
        const object = {id_catego_profes: parseInt(id_catego_profes),
                        id_usuario: parseInt(req.session.usuario),
                        nombre: nombre,
                        apellido: apellido,
                        correo: correo,
                        telefono: telefono,
                        cuit: cuit
                    }
        const result = await update(id,object);
        res.redirect('/admin/profesional');            

    } catch(error){
        console.log(error);
    }
});

router.get('/modi/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const profesionalModi= await getProfesionalModi(id);
        const cateProfesional=await getCateProfesAll();
        res.render("modiProfesional",{bienvenida: `Hola ${req.session.nombre}`, profesionalModi, cateProfesional:cateProfesional});
    } catch(error){
        console.log(error);
    }
});

router.post('/alta', async(req,res)=>{
    try{
        const {id_catego_profes,nombre,apellido,correo, telefono, cuit} = req.body;
        const object = {id_catego_profes: parseInt(id_catego_profes),
                        id_usuario: parseInt(req.session.usuario),
                        nombre: nombre,
                        apellido: apellido,
                        correo: correo,
                        telefono: telefono,
                        cuit: cuit
        }
        const result=await create(object);
        res.redirect('/admin/profesional');
    } catch(error){
        console.log(error);
    }
});

router.get('/alta',async(req,res)=>{
    try{
        const cateProfesional=await getCateProfesAll();
        res.render("altaProfesional",{bienvenida: `Hola ${req.session.nombre}`,cateProfesional:cateProfesional});

    } catch(error){
        console.log(error);
    }
});

router.get('/', async(req,res)=>{
    try{
        const profesional= await getProfesionalAll();
        res.render("adminProfesional",{bienvenida: `Hola ${req.session.nombre}`,profesional:profesional});
        
    } catch(error){
        console.log(error);
    }

});

module.exports=router;