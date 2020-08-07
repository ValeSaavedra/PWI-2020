const express=require('express');
const router=express.Router();
const {getEspacioAll,create,getEspacioModi,update,espacioEnUso}=require("./../../models/espacio");
const {getCateEspacioAll}=require("./../../models/cateEspacio");

router.put('/baja/:id/:habilitado',async(req,res)=>{
    try{
        const {id,habilitado} = req.params;
        let puedo=false;
        if (habilitado==0){
            const enUso=await espacioEnUso(id);
            if (enUso.length==0){
                puedo=true;
            }
        }
        else {
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
router.get('/modi/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const espacioModi=await getEspacioModi(id);
        const cateEspacio=await getCateEspacioAll();
        res.render("modiEspacio",{bienvenida:`Hola ${req.session.nombre}`,espacioModi,cateEspacio:cateEspacio});
    } catch(error){
        console.log(error);
    }
});
router.post('/modificar/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const {nombre, descripcion, cupo, id_catego_espac} = req.body;
        const object = {
            id_catego_espac:parseInt(id_catego_espac),
            id_usuario:parseInt(req.session.usuario),
            nombre:nombre,
            descripcion:descripcion,
            cupo:cupo
        }
        const result = await update(id,object);
        res.redirect('/admin/espacio');

    } catch(error){
        console.log(error);
    }

});

router.post('/alta',async(req,res)=>{
    try{
        const {nombre, descripcion, cupo, id_catego_espac}=req.body;
        const object = {
            id_catego_espac:parseInt(id_catego_espac),
            id_usuario:parseInt(req.session.usuario),
            nombre:nombre,
            descripcion:descripcion,
            cupo:cupo
        }
        const result= await create(object);
        res.redirect('/admin/espacio'); 
    } catch(error){
        console.log(error);
    }
});
router.get('/alta',async(req,res)=>{
    try {
        const cateEspacio=await getCateEspacioAll();
        res.render("altaEspacio",{bienvenida: `Hola ${req.session.nombre}`,cateEspacio:cateEspacio});
    } catch(error) {
        console.log(error);
    }
});
router.get('/',async(req,res)=>{
    try{
        const espacio=await getEspacioAll();
        res.render("adminEspacio",{bienvenida: `Hola ${req.session.nombre}`,espacio:espacio} );

    } catch(error){
        console.log(error);
    }
});


module.exports=router;