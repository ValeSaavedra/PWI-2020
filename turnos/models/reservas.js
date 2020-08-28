const pool=require('./../utils/db');

getUnTurAllProfesPorCate=async(id)=>{
    try {
        const query="select distinct (a.id_prof), p.nombre, p.apellido, a.id " +
            "from ?? as a " +
            "inner join ?? as p " +
            "on p.id=a.id_prof " +
            "where p.id_catego_profes= ? " +
            "group by a.id_prof";
        const params=[process.env.TABLA_AGENDA,process.env.TABLA_PROFESIONAL,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error) {
        console.log(error);
    }
}

getTurnosHoy=async()=>{
    try {
        const query="SELECT c.nombre as categoria, p.nombre as profesnom, p.apellido as profesape, " +
        "e.nombre as espacio, " +
        "a.id, a.hora, u.nombre as usunom, u.apellido as usuape, a.ocupado,a.asistio,u.admin  " +
        "from ?? a " +
        "inner join ?? p " +
        "on p.id = a.id_prof " +
        "inner join ?? u " +
        "on u.id = a.id_usuario " +
        "inner join ?? c " +
        "on p.id_catego_profes=c.id " +
        "inner join ?? ep " +
        "on ep.id=a.id_espac_prof " +
        "inner join ?? e " +
        "on e.id=ep.id_espacio " +
        "where a.habilitado=1 " +
        "and day(dia)= day(now()) and month(dia)=month(now()) and year(dia)=year(now()) " +
        "order by c.nombre, a.id_prof,dia,hora";
        const params=[process.env.TABLA_AGENDA,process.env.TABLA_PROFESIONAL,process.env.TABLA_USUARIO,
            process.env.TABLA_CATEGO_PROFES,process.env.TABLA_ESPAC_PROF,process.env.TABLA_ESPACIO];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error) {
        console.log(error);
    }
}

getTurAllPorProfes=async(id)=>{
    try {
        const query="select c.nombre as categoria, p.nombre as profesnom, p.apellido as profesape, p.id_catego_profes as id_catego_profes, " +
        "e.nombre as espacio, a.id, a.fecha, a.hora, u.nombre as usunom, u.apellido as usuape, a.ocupado,a.asistio,u.admin " +   
        "from ?? as a " +
        "inner join ?? p " +
        "on p.id = a.id_prof " +
        "inner join ?? u " +
        "on u.id = a.id_usuario " +
        "inner join ?? c " +
        "on p.id_catego_profes=c.id " +
        "inner join ?? ep " +
        "on ep.id=a.id_espac_prof " +
        "inner join ?? e " +
        "on e.id=ep.id_espacio " +
        "where a.habilitado=1 " +
        "and a.id_prof=? " +
        "order by a.dia,a.hora";
        const params=[process.env.TABLA_AGENDA,process.env.TABLA_PROFESIONAL,process.env.TABLA_USUARIO,
            process.env.TABLA_CATEGO_PROFES,process.env.TABLA_ESPAC_PROF,process.env.TABLA_ESPACIO,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error) {
        console.log(error);
    }

}

getTurVencidosPorProfes=async(id)=>{
    try {
        const query="select c.nombre as categoria, p.nombre as profesnom, p.apellido as profesape, p.id_catego_profes as id_catego_profes, " +
        "e.nombre as espacio, a.id, a.fecha, a.hora, u.nombre as usunom, u.apellido as usuape, a.ocupado,a.asistio,u.admin " +
        "from ?? as a " +
        "inner join ?? p " +
        "on p.id = a.id_prof " +
        "inner join ?? u " +
        "on u.id = a.id_usuario " +
        "inner join ?? c " +
        "on p.id_catego_profes=c.id " +
        "inner join ?? ep " +
        "on ep.id=a.id_espac_prof " +
        "inner join ?? e " +
        "on e.id=ep.id_espacio " +
        "where a.habilitado=1 " +
        "and a.id_prof=? " +
        "and now()>a.dia " +
        "order by a.dia,a.hora";
        const params=[process.env.TABLA_AGENDA, process.env.TABLA_PROFESIONAL, process.env.TABLA_USUARIO, process.env.TABLA_CATEGO_PROFES,
            process.env.TABLA_ESPAC_PROF,process.env.TABLA_ESPACIO,id];
        const rows=await pool.query(query,params);
        return rows;    
    } catch(error) {
        console.log(error);
    }
}

module.exports={getUnTurAllProfesPorCate, getTurnosHoy, getTurAllPorProfes,getTurVencidosPorProfes}