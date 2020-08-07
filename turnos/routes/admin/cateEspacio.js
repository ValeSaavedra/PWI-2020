const express=require('express');
const router=express.Router();
const {getCateEspacioAll,create,cateEspEnUso,update,getCateEspacioModi}=require('./../../models/cateEspacio');

router.put('/baja/:id/:habilitado',async(req,res)=>{
    try {
    
        const {id,habilitado} = req.params;
        
        
        
        console.log(`El id que viene para la baja es ${id} y habilitado que viene es ${habilitado}`);
        console.log(`El req.body trae: ${req.body}`);
        // EN EL CASO QUE HABILITADO SEA CERO, VERIFICO QUE LA CATEGORIA NO ESTE EN USO EN ESPACIO
        let puedo=false;
        // const object={
        //     habilitado:habilitado
        // };
        // console.log(`El objeto es: ${object}`);
        if (habilitado==0) {
            console.log("Consulto primero en tabla Espacio");    
            const enUso=await cateEspEnUso(id);
            if (enUso.length==0){
                puedo=true;
                console.log("La categoria no está en uso");
            }
        }
        else{
            puedo=true;
        }
        if (puedo){
            const resultado=await update(id,{habilitado:habilitado,id_usuario:req.session.usuario});
            console.log("Se actualizó");
        }
        res.json({success:true});
    } catch(error){
        console.log(error);
        res.json({success:false});
    }
});

router.get('/modi/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const cateEspacioModi=await getCateEspacioModi(id);
        res.render('modiCateEspacio',{bienvenida: `Hola ${req.session.nombre}`,cateEspacioModi});

    } catch(error){
        console.log(error);
    }
});

router.post('/modificar/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const {nombre, descripcion} = req.body;
        const object = {
            nombre: nombre,
            descripcion: descripcion,
            id_usuario: req.session.usuario
        };
        // console.log(`El object es: ${object}` );
        const result=await update(id,object);        
        res.redirect('/admin/cateEspacio');
    } catch(error) {
        console.log(error);

    }
});

router.get('/alta',(req,res)=>{
    try{
        res.render('altaCateEspacio',{bienvenida: `Hola ${req.session.nombre}`});

        
    } catch(error){
        console.log(error);
    }
});
router.post('/alta',async(req,res)=>{
    try{
        const { nombre,descripcion } = req.body;
        const object = {
            nombre:nombre,
            descripcion : descripcion,
            id_usuario: parseInt(req.session.usuario)
        };
        console.log(object);
        const result=await create(object);
        res.json({success:true});
        console.log(`El usuario es: ${req.session.nombre} y su id ${req.session.usuario}`);
    } catch(error) {
        console.log(error);
        res.json({success:false});
    }
});
router.get('/',async(req,res)=>{
    try{
        const cateEspacio=await getCateEspacioAll();

        res.render('adminCateEspacio',{bienvenida: `Hola ${req.session.nombre}`,cateEspacio:cateEspacio});
    } catch(error){
        console.log(error);
    }
});


module.exports=router;