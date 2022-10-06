const {
    Persona,
    Producto,
    Tipo,
    Inventario, // inventrio entrada
    DetalleInventario
} = require('../models/indexDB');


const CrearInventario = async(data) => {
    try{
        const inventario = await Inventario.create(data);
        
        return{
            success: true,
            res: inventario,
            message: "Se ha creado el inventario correctamente.",
            status: 201
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al crear el inventario.",
            status: 500
        }
    }
}

const ObtenerInventario = async() => {
    try{
        const inventario = await Inventario.findAndCountAll({
            include:[{
                model: Persona,
                attributes: ["Documento","PrimerNombre","PrimerApellido"]
            },{
                model: DetalleInventario,
                attributes: ["IdDetalleInventario","Precio"],
                include:{
                    model: Producto,
                    attributes: ["IdProducto","Nombre","CantidadDisponible"],
                    include: {
                        model: Tipo,
                        attributes: ["Descripcion"]
                    }
                },
            }],
            attributes: ["IdInventarioEntrada","Fecha","NumeroCompra"]
        });
        
        return{
            success: true,
            res: inventario,
            message: "Ok.",
            status: 200
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al listar el inventario.",
            status: 500
        }
    }
}

const ObtenerInventarioPorId = async(id) => {
    try{
        const inventario = await Inventario.findAndCountAll({
            where:{
                IdInventarioEntrada: id
            },
            include:[{
                model: Persona,
                attributes: ["Documento","PrimerNombre","PrimerApellido"]
            },{
                model: DetalleInventario,
                attributes: ["IdDetalleInventario","Precio"],
                include:{
                    model: Producto,
                    attributes: ["IdProducto","Nombre","CantidadDisponible"],
                    include: {
                        model: Tipo,
                        attributes: ["Descripcion"]
                    }
                },
            }],
            attributes: ["IdInventarioEntrada","Fecha","NumeroCompra"]
        });
        
        return{
            success: true,
            res: inventario,
            message: "Ok.",
            status: 200
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al listar el inventario.",
            status: 500
        }
    }
}

const ActualizarInventario = async(id, data) => {
    try{
        const {Fecha, NumeroCompra} = data;
        await Inventario.update({Fecha: Fecha},{
            where: {
                IdInventrarioEntrada: id
            }
        });

        await Inventario.update({NumeroCompra: NumeroCompra},{
            where: {
                IdInventrarioEntrada: id
            }
        });

        return{
            success: true,
            message: "Se ha modificado el inventario correctamente.",
            status: 200
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al modificar el inventario.",
            status: 500
        }
    }
}

module.exports = {
    CrearInventario,
    ObtenerInventario,
    ObtenerInventarioPorId,
    ActualizarInventario
}