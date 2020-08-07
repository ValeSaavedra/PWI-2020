const express=require('express');
const router=express.Router();
const {getCateProfesAll,create,getCateProfesModi,update,cateProfEnUso}=require('./../../models/cateProfes');

router.put('/baja/:id/:habilitado',async(req,res)=>{
    try{
        const {id,habilitado}=req.params;
        let puedo=false;
        if (habilitado==0){
            const PEnUso=await cateProfEnUso(id);
            if (PEnUso.length==0){
                puedo=true;

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
        const {id}=req.params;
        const {nombre,descripcion}=req.body;
        const object={
            nombre: nombre,
            descripcion: descripcion,
            id_usuario: parseInt(req.session.usuario)

        };
        const result=await update(id,object);
        res.redirect('/admin/cateProfes');


    } catch(error){
        console.log(error);
    }
});
router.get('/modi/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const cateProfesModi=await getCateProfesModi(id);
        res.render('modiCateProfes',{bienvenida: `Hola ${req.session.nombre}`,cateProfesModi});
    } catch(error){
        console.log(error);
    }
});

router.post('/alta',async(req,res)=>{
    try{
        const {nombre,descripcion}=req.body;
        console.log(req.body);
        const object={
            nombre : nombre,
            descripcion : descripcion,
            id_usuario : parseInt(req.session.usuario)
        }
        const result=await create(object);
        res.json({success:true});

    } catch(error){
        console.log(error);
        res.json({success:false});
    }
});
router.get('/alta',(req,res)=>{
    try{
        res.render('altaCateProfes',{bienvenida: `Hola ${req.session.nombre}`});

    } catch(error){
        console.log(error);
    }
});
router.get('/',async(req,res)=>{
    try{
        const cateProfes=await getCateProfesAll();
        res.render('adminCateProfes',{bienvenida: `Hola ${req.session.nombre}`,cateProfes:cateProfes});


    } catch(error) {
        console.log(error);

    }
});
module.exports=router;