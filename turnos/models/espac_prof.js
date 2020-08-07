const pool=require('./../utils/db');


getEspProfAllSinRepet = async()=>{
    try{
        // const query="SELECT ep.id, ep.id_espacio, ep.id_prof, ep.id_usuario, ep.dia_sem, ep.hora_desde, " +
        // " ep.hora_hasta, ep.duracion, ep.habilitado, e.nombre as nombre_espacio, p.nombre as nombre_profesional, p. apellido FROM ?? AS ep " +
        // " INNER JOIN ?? AS e ON ep.id_espacio=e.id " +
        // " INNER JOIN ?? AS p ON ep.id_prof=p.id " +
        // " WHERE ep.habilitado=1";
        // const params=[process.env.TABLA_ESPAC_PROF, process.env.TABLA_ESPACIO, process.env.TABLA_PROFESIONAL];
        const query="SELECT DISTINCT(ep.id_prof), p.nombre, p.apellido, p.correo, p.telefono, p.cuit FROM ?? AS ep" +
        " INNER JOIN ?? AS p ON ep.id_prof=p.id" +
        " WHERE ep.habilitado=1";
        const params=[process.env.TABLA_ESPAC_PROF,process.env.TABLA_PROFESIONAL];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
}

getEspProfAllUnProfHab = async(id)=>{
    try{
        const query="SELECT  ep.id, ep.id_espacio, ep.id_prof, ep.id_usuario, ep.dia_sem, ep.hora_desde, " +
        " ep.hora_hasta, ep.duracion, ep.habilitado, e.nombre as nombre_espacio,  " +
        " left(p.nombre,10) as nombre_profesional, left(p. apellido,10) as apellido" +
        " FROM ?? AS ep " +
        " INNER JOIN ?? AS e ON ep.id_espacio=e.id " +
        " INNER JOIN ?? AS p ON ep.id_prof=p.id " + 
        " WHERE ep.habilitado=1 AND ep.id_prof=? "
        const params=[process.env.TABLA_ESPAC_PROF, process.env.TABLA_ESPACIO, process.env.TABLA_PROFESIONAL,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }

}

getEspProfModi = async(id)=>{
    try{
        const query="SELECT ep.id, ep.id_espacio, ep.id_prof, ep.id_usuario, ep.dia_sem, ep.hora_desde, " +
        " ep.hora_hasta, ep.duracion, ep.habilitado, e.nombre as nombre_espacio, p.nombre as nombre_profesional, p. apellido FROM ?? AS ep " +
        " INNER JOIN ?? AS e ON ep.id_espacio=e.id " +
        " INNER JOIN ?? AS p ON ep.id_prof=p.id " +
        " WHERE ep.habilitado=1 AND ep.id=?";
        const params=[process.env.TABLA_ESPAC_PROF, process.env.TABLA_ESPACIO, process.env.TABLA_PROFESIONAL,id];
        const rows=await pool.query(query,params);
        return rows[0];
    } catch(error){
        console.log(error);
    }
}

create = async(obj)=>{
    try {
        const query="INSERT INTO ?? SET ?";
        const params=[process.env.TABLA_ESPAC_PROF,obj];
        const rows=await pool.query(query,params);
        return rows.insertId;
    } catch(error){
        console.log(error);
    }
}

update =async(id,obj)=>{
    try {
        const query="UPDATE ?? SET ? WHERE id=?"
        const params=[process.env.TABLA_ESPAC_PROF,obj,id];
        return await pool.query(query,params);
    } catch(error){
        console.log(error);
    }

}

borrar = async(id)=>{
    try{
        const query="DELETE FROM ?? WHERE id=?"
        const params=[process.env.TABLA_ESPAC_PROF,id];
        return await pool.query(query,params);
    } catch(error){
        console.log(error);
    }
}






module.exports={
    getEspProfAllSinRepet,
    getEspProfModi,
    create,
    update,
    getEspProfAllUnProfHab,
    borrar,

}