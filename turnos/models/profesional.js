const pool=require('./../utils/db');


profesionalEnUso=async(id)=>{
    try{
        const query="SELECT id FROM ?? WHERE id_prof=? AND habilitado=1";
        const params=[process.env.TABLA_ESPAC_PROF,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
}
getProfesionalAll=async()=>{

    try{
        const query="SELECT p.id, p.id_catego_profes, p.id_usuario, p.nombre, p.apellido, p.correo, p.habilitado, c.nombre as categoria FROM ?? AS p INNER JOIN ?? AS c ON p.id_catego_profes=c.id";
        const params=[process.env.TABLA_PROFESIONAL, process.env.TABLA_CATEGO_PROFES];
        console.log(`el query es  ${query} `);
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
}
getProfesionalModi=async(id)=>{
    try{
        const query="SELECT p.id, p.id_catego_profes, p.id_usuario, p.nombre, p.apellido, p.correo, p.telefono, p.cuit, p.habilitado, c.nombre as categoria FROM ?? AS p INNER JOIN ?? AS c ON p.id_catego_profes=c.id WHERE p.id=?";
        const params=[process.env.TABLA_PROFESIONAL,process.env.TABLA_CATEGO_PROFES,id];
        const rows=await pool.query(query,params);
        return rows[0];

    } catch(error){
        console.log(error);
    }
}

create=async(obj)=>{
    try{
        const query="INSERT INTO ?? SET ?";
        const params=[process.env.TABLA_PROFESIONAL,obj];
        const rows=await pool.query(query,params);
        return rows.insertId;

    } catch(error){
        console.log(error);
    }
}

update=async(id,obj)=>{
    try{
        const query="UPDATE ?? SET ? WHERE id=?";
        const params=[process.env.TABLA_PROFESIONAL,obj,id];
        return await pool.query(query,params);
    } catch(error){
        console.log(error);
    }
}

getProfesionalAllOnlyHab=async()=>{
    try{
        const query="SELECT id, nombre, apellido FROM ?? WHERE habilitado=1";
        const params=[process.env.TABLA_PROFESIONAL];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
}




module.exports={
    profesionalEnUso,
    getProfesionalAll,
    getProfesionalModi,
    create,
    update,
    getProfesionalAllOnlyHab,
}