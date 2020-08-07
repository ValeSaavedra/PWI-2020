const express=require('express');
const router=express.Router();
const {getUsuarios,getUsuarioModi,update,existedni,create}=require('./../../models/loginModel');

router.put('/baja/:id',async(req,res)=>{
    const {id} = req.params;
    console.log(`El id que viene para la baja es ${id}`);
    const resultado=await update(id,{habilitado:0});
    res.json({success:true});
});
router.get('/modi/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        console.log (`El id que viene en la URL ${id}`);
        const usuarioModi=await getUsuarioModi(id);
        
        res.render("modiUsers",{bienvenida: `Hola ${req.session.nombre}`,usuarioModi});
        } catch(error) {
            console.log(error);
        }
});
router.post('/modificar/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const {nombre,apellido,dni,correo,domicilio,localidad,codpostal,admin } = req.body;
        const buscodni=await existedni(dni);
        if (buscodni.length==0){
            const object = {
                nombre:nombre,
                apellido:apellido,
                dni:parseInt(dni),
                correo:correo,
                domicilio:domicilio,
                localidad:localidad,
                codpostal:codpostal,
                admin:parseInt(admin)
            };
            const result=await update(id,object);
            res.redirect("/admin/usuarios");
            console.log("OK, cambio DNI pero no existia, todo bien");
        }
        else {
            // console.log(`DNI está en el id ${buscodni.id} y el id del usuario a modificar es el ${id}`);
            console.log(`A ver el id de la DB es  ${buscodni[0].id} y el id del dato a modificar es ${id}`);
            if (id==buscodni[0].id){
                const object = {
                    nombre:nombre,
                    apellido:apellido,
                    dni:parseInt(dni),
                    correo:correo,
                    domicilio:domicilio,
                    localidad:localidad,
                    codpostal:codpostal,
                    admin:parseInt(admin)
                };
                const result=await update(id,object);
                res.redirect("/admin/usuarios");
                console.log("OK, es él, está cambiando otro dato, todo bien");                
            }
            else{
                res.render("modiUsers",{mensaje: `El DNI  ${dni} ya existe. Vuelva a Panel de Usuarios`});
            } 
        }
    } catch(error){
        console.log(error);
    }
});

router.get('/alta',(req,res)=>{
    try{
        res.render('altaUsers',{bienvenida:`Hola ${req.session.nombre}`});

    } catch(error){
        console.log(error);
    }
});
router.post('/alta',async(req,res)=>{
    const {nombre,apellido,dni,correo,domicilio,localidad,codpostal,admin } = req.body;
    const buscodni=await existedni(dni);
    if (buscodni.length==0){
        console.log("No hay DNI, puedo agregarlo");
        const object = {
            nombre:nombre,
            apellido:apellido,
            dni:parseInt(dni),
            password:dni,
            correo:correo,
            domicilio:domicilio,
            localidad:localidad,
            codpostal:codpostal,
            admin:parseInt(admin)
        };

        const result=await create(object);

        res.redirect("/admin/usuarios");

    }
    else {
        console.log("Hay DNI o doy otro error",buscodni.length);
        res.render("altaUsers",{mensaje: `El DNI  ${dni} ya existe. Vuelva a cargar los datos`});

    }


});

router.get('/', async(req,res)=>{
    try{
        
        const usuarios=await getUsuarios();        
        res.render('adminUsers',{bienvenida: `Hola ${req.session.nombre}`, usuarios : usuarios });


    } catch(error){
        console.log(error);

    }
});

module.exports=router;