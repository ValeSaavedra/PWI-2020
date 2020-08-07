const pool=require('./../utils/db');



// cateEspEnUso se fija si la categoria esta en uso en tabla Espacio, si esta, NO deja deshabilitarla
cateEspEnUso = async(id)=>{
    try {
        const query="SELECT id FROM ?? WHERE id_catego_espac=? AND habilitado=1";
        const params=[process.env.TABLA_ESPACIO,id];
        const rows=await pool.query(query,params);
        return rows;

    } catch(error) {
        console.log(error);
    }
}; 

create = async(obj)=>{
    try{
        const query="INSERT INTO ?? SET ?";
        const params=[process.env.TABLA_CATEGO_ESPACIO,obj];
        const rows=await pool.query(query,params);
        return rows.insertId;

    } catch(error) {
        console.log(error);

    }
};

update = async(id,obj)=>{
    try{
        const query="UPDATE ?? SET ? WHERE id=?";
        const params=[process.env.TABLA_CATEGO_ESPACIO,obj,id];
        return await pool.query(query,params);

    } catch(error) {
        console.log(error);
    }
};
getCateEspacioAll = async()=>{
    try{
        const query="SELECT id, id_usuario, nombre, descripcion, habilitado FROM ??";
        const params=[process.env.TABLA_CATEGO_ESPACIO];
        const rows=await pool.query(query,params);
        return rows;        

    } catch(error){
        console.log(error);
    }
};
getCateEspacioModi = async(id)=>{
    try{
        const query="SELECT id, id_usuario, nombre, descripcion FROM ?? WHERE id=?";
        const params=[process.env.TABLA_CATEGO_ESPACIO,id];
        const rows=await pool.query(query,params);
        return rows[0];

    } catch(error){
        console.log(error);

    }
};


module.exports={
    cateEspEnUso,
    create,
    update,
    getCateEspacioAll,
    getCateEspacioModi,
};