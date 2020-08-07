const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    try{
        console.log(req.session.nombre);
        res.render('indexAdmin',{bienvenida: `Bienvenido: ${req.session.nombre}`});
    } catch(error){
        console.log(error);
    }
});





module.exports=router;