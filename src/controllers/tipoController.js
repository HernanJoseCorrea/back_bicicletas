const {
    Tipo,
    Producto,
    Inventario,
    DetalleInventario
} = require('../models/indexDB');


const CrearTipo = async(data) => {
    try{
        const tipo = await Tipo.create(data);
        return{
            success: true,
            res: tipo,
            message: "Se ha creado el tipo de producto correctamente.",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al crear el tipo de producto.",
            status: 500
        }
    }
}

const ObtenerTipo = async() =>{
     try{
        const tipo = await Tipo.findAndCountAll({
            attributes:["IdTipo","Descripcion"]
        })
        return{
            success: true,
            res: tipo,
            message: "Ok.",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al listar los tipos de productos.",
            status: 500
        }
    }
}

const ObtenerTipoProducto = async(data) =>{
    try{
        const {Descripcion} = data;


        const tipo = await Tipo.findAndCountAll({
            where:{
                Descripcion: data
            },
            include:[
            {
                model: Producto,
                attributes: ["IdProducto","Nombre","CantidadDisponible"],
                include: {
                    model: DetalleInventario,
                    attributes: ["Precio"]
                }
            }],
            attributes:["IdTipo","Descripcion"]
        })
        return{
            success: true,
            res: tipo,
            message: "Ok.",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al listar los tipos de productos.",
            status: 500
        }
    }
}

const ActualizarTipo = async(id, data) => {
    try{
        const {Descripcion} = data;
        const tipo = await Tipo.update({Descripcion: Descripcion},{
            where: {
                IdTipo: id
            }
        });

        return{
            success: true,
            res: tipo,
            message: "Se ha modificado correctamente el tipo de producto.",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al modificar el tipo de producto",
            status: 500
        }
    }
}

module.exports = {
    CrearTipo,
    ObtenerTipo,
    ObtenerTipoProducto,
    ActualizarTipo
}