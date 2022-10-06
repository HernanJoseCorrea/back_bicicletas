const {
    Direccion
} = require('../models/indexDB');

const CrearDireccion = async(data) => {
    try{
        const direccion = await Direccion.create(data);
        if(!direccion){
            console.log("no se pudo crear la direccion");
        }

        return{
            success: true,
            message: "Se ha creado la direccion correctamente.",
            status: 201
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al crear la direccion.",
            status: 500
        }
    }
}

const ObtenerDireccionPorId = async(id) => {
    try{
        const direccion = await Direccion.findOne({
            where:{
                IdPersonaFk: id
            }
        });

        if(!direccion){
            console.log("no se encontro la direccion.");
        }

        return{
            success: true,
            res: direccion,
            message: "Ok",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al buscar la direccion.",
            status: 500
        }
    }
}

const ActualizarDireccion = async(id, data) => {
    try{
        const {Carrera, Calle, NombreCalle} = data;
        await Direccion.update({Carrera: Carrera},{
            where:{
                IdPersonaFk: id
            }
        });

        await Direccion.update({Calle: Calle},{
            where:{
                IdPersonaFk: id
            }
        });

        await Direccion.update({NombreCalle: NombreCalle},{
            where:{
                IdPersonaFk: id
            }
        });

        return{
            success: true,
            message: "Se ha modificado la direccion correctamente.",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al modificar la direccion.",
            status: 500
        }
    }
}


module.exports = {
    CrearDireccion,
    ObtenerDireccionPorId,
    ActualizarDireccion
}