const pool = require("../utils/db");

getCateProfesAllHab=async()=>{
    try{
        const query="SELECT id, nombre FROM ?? WHERE habilitado=1";
        const params=[process.env.TABLA_CATEGO_PROFES];
        console.log(query);
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }


}
getPriTurAllProfesPorCate=async(id)=>{
    try{
        const query="select distinct (a.id_prof), min(a.dia) as dia, min(a.hora) as hora, a.fecha, " +
            "p.nombre, p.apellido, a.id from ?? as a " +
            "inner join ?? as p "+
            "on p.id=a.id_prof "+
            "where p.id_catego_profes=? " +
            "and a.ocupado=0 " +
            "and a.habilitado=1 " +
            "and now() < dia " +
            "group by a.id_prof";
        const params=[process.env.TABLA_AGENDA, process.env.TABLA_PROFESIONAL,id];
        const rows=await pool.query(query,params);
        return rows;        
    } catch(error){
        console.log(error);
    }
}
getTurAllUnProfe=async(id)=>{
    try{
        const query="select a.dia, a.hora, a.fecha, p.nombre, p.apellido, a.id, a.id_prof, p.id_catego_profes,c.nombre as categoria " +
        "from ?? as p " +
        "inner join ?? as a " +
        "on p.id=a.id_prof " +
        "inner join ?? as c " +
        "on c.id=p.id_catego_profes " +
        "where a.id_prof= ? " +
        "and a.ocupado=0 " +
        "and a.habilitado=1 " +
        "and now() < a.dia " +
        "order by a.dia, a.hora";        
        const params=[process.env.TABLA_PROFESIONAL, process.env.TABLA_AGENDA, process.env.TABLA_CATEGO_PROFES,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
}
buscoCorreoUsuario=async(id)=>{
    try{
        const query="SELECT correo FROM ?? WHERE id=?";
        const params=[process.env.TABLA_USUARIO,id];
        const rows=await pool.query(query,params);
        return rows[0];
    } catch(error) {
        console.log(error);
    }
}

reservoTurno=async(id,obj)=>{
    try {
        const query="UPDATE ?? SET ? WHERE id=?";
        const params=[process.env.TABLA_AGENDA,obj,id];
        return await pool.query(query,params);
    } catch(error) {
        console.log(error);
    }
}
buscoNombreProf=async(id)=>{
    //try {
        const query="SELECT nombre, apellido FROM ?? WHERE id=?";
        console.log(`el query del profesional es ${query} el id que viene es ${id}` );
        const params=[process.env.TABLA_PROFESIONAL,id];
        const rows=await pool.query(query,params);
        return rows[0];
    //} catch(error) {
    //    console.log(error);
    //}
}
buscoFechaHoraTurnoReservado=async(id)=>{
    try {
        const query="SELECT fecha, hora FROM ?? WHERE id=?";
        const params=[process.env.TABLA_AGENDA,id];
        const rows=await pool.query(query,params);
        return rows[0];
    } catch(error) {
        console.log(error);
    }
}
module.exports={ getCateProfesAllHab,getPriTurAllProfesPorCate, getTurAllUnProfe, buscoCorreoUsuario,
    reservoTurno, buscoNombreProf, buscoFechaHoraTurnoReservado}