const pool = require("./../utils/db");


loguearse = async (dni,pass)=>{
    try{
        const query="SELECT id, dni, password, nombre, admin FROM ?? WHERE dni = ? AND password = ? AND habilitado=1";
        const params=[process.env.TABLA_USUARIO,dni,pass];
        console.log(query);
        const rows = await pool.query(query,params);
        return rows;
    } catch(error){
        console.log(error);
    }
};

existedni=async(dni)=>{
    try{
        const query="SELECT id, dni FROM ?? WHERE dni = ?";
        const params=[process.env.TABLA_USUARIO,dni];
        console.log(query);
        const rows=await pool.query(query,params);
        return rows;
    } catch(error){


    }
};

create=async(obj)=>{
    try{
        const query="INSERT INTO ?? SET ?";
        const params=[process.env.TABLA_USUARIO,obj];
        const rows=await pool.query(query,params);
        return rows.insertId;
    } catch(error){
        console.log(error);

    }
};

getUsuarios=async()=>{
    try{
        const query="SELECT id, dni, correo, nombre, apellido,admin FROM ?? WHERE habilitado=1";
        const params=[process.env.TABLA_USUARIO];
        const rows=await pool.query(query,params);
        return rows;
    }catch(error){
        console.log(error);

    }
};
getUsuarioModi=async(id)=>{
    try{
        const query="SELECT id, dni, correo, nombre, apellido, domicilio, localidad, codpostal, admin FROM ?? WHERE id=? ";
        const params=[process.env.TABLA_USUARIO,id];
        console.log("query",query);
        const rows=await pool.query(query,params);
        return rows[0];
    } catch(error){
        console.log(error);
    }
};
const update=async(id,obj)=>{
    try{
        const query="UPDATE ?? SET ? WHERE id=?";
        const params=[process.env.TABLA_USUARIO,obj,id];
        return await pool.query(query,params);
    } catch(error){
        console.log(error);
    }
};

module.exports={

    loguearse,
    existedni,
    create,
    getUsuarios,
    getUsuarioModi,
    update,
}