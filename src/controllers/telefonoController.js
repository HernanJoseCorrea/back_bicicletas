const {
    Telefono
} = require('../models/indexDB');

const CrearTelefono = async(data) => {
    try{
        const telefono = await Telefono.create(data);
        if(!telefono){
            console.log("no se pudo crear el telefono.");
        }

        return{
            success: true,
            message: "Se ha creado el numero de telefono correctamente.",
            status: 201
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al crear el numero de telefono",
            status: 500
        }
    }
}

const ObtenerTelefonoPorId = async(id) => {
    try{
        const telefono = await Telefono.findOne({
            where: {
                IdPersonaFk: id
            }
        });
        if(!telefono){
            console.log("no se encontro el numero de telefono");
        }

        return{
            success: true,
            res: telefono,
            message: "Ok.",
            status: 201
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al buscar el numero de telefono.",
            status: 500
        }
    }
}

const ActualizarTelefono = async(id, data) => {
    try{
        const {Numero} = data;
        await Telefono.update({Numero: Numero},{
            where:{
                IdPersonaFk: id
            }
        });

        return{
            success: true,
            message: "Se ha actualizado el numero de telefono correctamente.",
            status: 200
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al modificar el numero de telefono.",
            status: 500
        }
    }
}

module.exports = {
    CrearTelefono,
    ObtenerTelefonoPorId,
    ActualizarTelefono
}