const pool=require('./../utils/db');



espacioEnUso=async(id)=>{
    try{
        const query="SELECT id FROM ?? WHERE id_espacio=? AND habilitado=1";
        const params=[process.env.TABLA_ESPAC_PROF,id];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error) {
        console.log(error);
    }
};

create = async(obj)=>{
    try{
        const query="INSERT INTO ?? SET ?";
        const params=[process.env.TABLA_ESPACIO,obj];
        const rows=await pool.query(query,params);
        return rows.insertId;
    } catch(error){
        console.log(error);

    }
};
update = async(id,obj)=>{
    try{
        const query="UPDATE ?? SET ? WHERE id=?";
        const params=[process.env.TABLA_ESPACIO,obj,id];
        return await pool.query(query,params);

    } catch(error){
        console.log(error);
    }

};
getEspacioAll = async()=>{
    try{
        const query="SELECT e.id, e.id_catego_espac, e.id_usuario, e.nombre, e.descripcion, e.cupo, e.habilitado, c.nombre as categoria FROM ?? AS e INNER JOIN ?? AS c ON e.id_catego_espac=c.id";
        const params=[process.env.TABLA_ESPACIO,process.env.TABLA_CATEGO_ESPACIO];
        const rows=await pool.query(query,params);
        return rows;

    } catch(error){
        console.log(error);

    }

};
getEspacioModi = async(id)=>{
    try{
        const query="SELECT e.id, e.id_catego_espac, e.id_usuario, e.nombre, e.descripcion, e.cupo, e.habilitado, c.nombre as categoria FROM ?? AS e INNER JOIN ?? AS c ON e.id_catego_espac=c.id WHERE e.id=?";
        const params=[process.env.TABLA_ESPACIO,process.env.TABLA_CATEGO_ESPACIO,id];
        const rows=await pool.query(query,params);
        return rows[0];
    } catch(error) {
        console.log(error);
    }
};
getEspacioAllOnlyHab = async()=>{
    try{
        const query="SELECT id, nombre FROM ?? WHERE habilitado=1";
        const params=[process.env.TABLA_ESPACIO];
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }

}



module.exports={
    espacioEnUso,
    create,
    update,
    getEspacioAll,
    getEspacioModi,
    getEspacioAllOnlyHab,
}