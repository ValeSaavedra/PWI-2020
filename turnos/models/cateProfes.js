const pool=require('./../utils/db');


cateProfEnUso=async(id)=>{
    try{
        const query="SELECT id FROM ?? WHERE id_catego_profes=? AND habilitado=1";
        const params=[process.env.TABLA_PROFESIONAL,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
};
create=async(obj)=>{
    try{
        const query="INSERT INTO ?? SET ?";
        const params=[process.env.TABLA_CATEGO_PROFES,obj];
        const rows=await pool.query(query,params);
        return rows.insertId;
    } catch(error){
        console.log(error);

    }
};
update=async(id,obj)=>{
    try{
        const query="UPDATE ?? SET ? WHERE id=?";
        const params=[process.env.TABLA_CATEGO_PROFES,obj,id];
        return await pool.query(query,params);

    } catch(error){
        console.log(error);
    }
};
getCateProfesAll=async()=>{
    try{
        const query="SELECT id, id_usuario, nombre, descripcion, habilitado FROM ??";
        const params=[process.env.TABLA_CATEGO_PROFES];
        const rows=await pool.query(query,params);
        return rows;


    } catch(error){
        console.log(error);
    }
};

getCateProfesModi=async(id)=>{
    try{
        const query="SELECT id, id_usuario, nombre, descripcion, habilitado FROM ?? WHERE id=?";
        const params=[process.env.TABLA_CATEGO_PROFES,id];
        const rows=await pool.query(query,params);
        return rows[0];
    } catch(error) {
        console.log(error);
    }
};




module.exports={
    cateProfEnUso,
    create,
    update,
    getCateProfesAll,
    getCateProfesModi,

}