const express=require('express');
const router=express.Router();
const {getCateProfesAllHab}=require('./../../models/tomar'); 
// existe el model de reservas.js pero ya tenia la consulta getCateProfesAllHab en tomar.js que me servia
const {getUnTurAllProfesPorCate, getTurnosHoy,getTurAllPorProfes,getTurVencidosPorProfes}=require('./../../models/reservas');

router.get('/todos/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const hoy=new Date();
        const hoyhoy=hoy.getDate() + "/" + (hoy.getMonth() +1) + "/" + hoy.getFullYear();
        const turUnProf=await getTurAllPorProfes(id);
        res.render('adminResUnProf',{bienvenida:`Hola ${req.session.nombre}`,turUnProf:turUnProf,hoyhoy,
            categoria:turUnProf[0].categoria, id_catego_profes:turUnProf[0].id_catego_profes,
            apellido:turUnProf[0].profesape,nombre:turUnProf[0].profesnom,
            clasif:'Todos los Turnos de'});

    } catch(error) {
        console.log(error);
    }
});
router.get('/vencidos/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const hoy=new Date();
        const hoyhoy=hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/"  + hoy.getFullYear();
        const turUnProf=await getTurVencidosPorProfes(id);
        res.render('adminResUnProf',{bienvenida:`Hola ${req.session.nombre}`,turUnProf:turUnProf,hoyhoy,
            categoria:turUnProf[0].categoria, id_catego_profes:turUnProf[0].id_catego_profes,
            apellido:turUnProf[0].profesape,nombre:turUnProf[0].profesnom,
            clasif:'Turnos Vencidos de'});       
    } catch(error) {
        console.log(error);
    }

})
    

router.get('/:id/:cat',async(req,res)=>{
    try {
        const {id,cat}=req.params;
        const profesPorCate=await getUnTurAllProfesPorCate(id);
        if (profesPorCate.length==0){
            res.render('adminResProfes', {bienvenida: `Hola ${req.session.nombre}`,mensOK:1,
                mensaje:"No hay agendados ningun tipo de turnos para esta categoria",
                categoria:cat});
            }
        else {
            res.render('adminResProfes', {bienvenida: `Hola ${req.session.nombre}`,
                profesPorCate:profesPorCate,categoria:cat});
            }
    } catch(error) {
        console.log(error);
    }
});


router.get('/turnoshoy',async(req,res)=>{
    try {
        const hoy=new Date();
        const hoyhoy=(hoy.getDate() + "/" + (hoy.getMonth() +1) + "/" + hoy.getFullYear());
        console.log(`Hoy es ${hoy} ${hoyhoy}`);
        const turHoy=await getTurnosHoy();
        res.render('adminResHoy',{bienvenida: `Hola ${req.session.nombre}`,turHoy:turHoy,hoyhoy});
    } catch(error) {
        console.log(error);
    }
});


router.get('/',async(req,res)=>{
    try{
        const cateProfesHab=await getCateProfesAllHab();
        const turHoy=await getTurnosHoy();
        let flgturHoy=false;
        turHoy.length==0 ? flgturHoy=false : flgturHoy=true;
        res.render('adminResCate',{bienvenida: `Hola ${req.session.nombre}`, cateProfesHab:cateProfesHab,flgturHoy});
    } catch(error){
        console.log(error);
    }
});



module.exports=router;
