const express=require('express');
const router=express.Router();
const {loguearse}=require("./../models/loginModel");
router.get('/logout',(req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/login');
    } catch(error){
        console.log(error);
    }
});
router.get('/',(req,res)=>{
    try{
        res.render('login',{titulo:'Por favor ingresa tus datos'});
    } catch(error){
        console.log(error);
    }
});
router.post('/', async(req,res)=>{
    try{
        console.log(req.body);
        const dni=req.body.dni;
        const password=req.body.pass;
        console.log("dni",dni);
        console.log("clave",password)
        const result= await loguearse(dni,password);
        console.log(result.length);
        if (result.length>0)  {
            console.log("result",result);
            req.session.id=result[0].id;
            req.session.dni=result[0].dni;
            req.session.admin=result[0].admin;
            req.session.nombre=result[0].nombre;
            req.session.usuario=result[0].id;
            console.log(`El id del usuario que se logueo es: ${req.session.usuario}`)
            console.log(req.session);
            if (req.session.admin==1){
                // usuario administrador
                console.log("usuario administrador");
                console.log(req.session);
                res.redirect('/admin/index');
            }
            else {
                // usuario simple
                console.log("usuario simple");
                res.redirect('/tomar');
            }
        }
        else {
            res.render('login',{titulo:'Datos de acceso incorrectos'});
        };

    } catch(error){
        console.log(error);
    }
});

module.exports=router;