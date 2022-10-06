const {
    Producto,
    Tipo,
    Inventario, // inventrio entrada
    DetalleInventario
} = require('../models/indexDB');


const CrearDetalleInventario = async(data) => {
    try{
        const detalleInventario = await DetalleInventario.create(data);

        return{
            success: true,
            res: detalleInventario,
            message: "Se ha creado el detalle del inventario correctamente.",
            status: 201
        }

    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al crear el detalle del inventario.",
            status: 500
        }
    }
}

const ObtenerDetalleInventario = async() => {
    try{
        const detalleInventario = await DetalleInventario.findAndCountAll({
            include:[{
                model: Inventario,
                attributes: ["IdInventarioEntrada","Fecha", "NumeroCompra","IdPersonaFk"]
            },
            {
                model: Producto,
                attributes: ["IdProducto","Nombre","CantidadDisponible"],
                include: {
                    model: Tipo,
                    attributes: ["Descripcion"]
                }
            }],
            attributes:["IdDetalleInventario","Precio"]
        });

        return{
            success: true,
            res: detalleInventario,
            message: "Se han listado los detalles del inventario correctamente.",
            status: 200
        }

    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al listar los detalles del inventario.",
            status: 500
        }
    }
}

const ObtenerDetalleInventarioPrecio = async(data) => {
    try{
        const detalleInventario = await DetalleInventario.findAndCountAll({
            where:{
                precio: data
            },
            include:[{
                model: Inventario,
                attributes: ["IdInventarioEntrada","Fecha", "NumeroCompra","IdPersonaFk"]
            },
            {
                model: Producto,
                attributes: ["IdProducto","Nombre","CantidadDisponible"],
                include: {
                    model: Tipo,
                    attributes: ["Descripcion"]
                }
            }],
            attributes:["IdDetalleInventario","Precio"]
        });

        return{
            success: true,
            res: detalleInventario,
            message: "Se han listado los detalles del inventario correctamente.",
            status: 200
        }

    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al listar los detalles del inventario.",
            status: 500
        }
    }
}

const ActualizarDetalleInventario = async(id, data) => {
    try{
        const {Precio} = data;
        await DetalleInventario.update({Precio: Precio},{
            where: {
                idDetalle_Inventario: id
            }
        });

        return{
            success: true,
            message: "Se ha modificado correctamente el detalle inventario",
            status: 200
        }

    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al modificar el detalle inventario",
            status: 500
        }
    }
}



module.exports = {
    CrearDetalleInventario,
    ObtenerDetalleInventario,
    ObtenerDetalleInventarioPrecio,
    ActualizarDetalleInventario,
}