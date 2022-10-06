const {
    Producto,
    Tipo,
    DetalleInventario
} = require('../models/indexDB');
  

const formatErrors = (e, Errors) => {
    const errors = e.errors;
    let objErrors = [];
    
    if(errors){
      Object.entries(errors).map(e => {
        const {path, message} = e[1];
        objErrors.push({path, message});
      })
  
      objErrors = objErrors.concat(Errors);
      return objErrors;
    }else if(Errors.length){
      return Errors;
    }
}

const CrearProducto = async(product) => {
    try{
        const {Nombre, CantidadDisponible, IdTipoFk, ImgUrl, Descripcion} = product;
        console.log(product)

        const producto = await Producto.create({Nombre, CantidadDisponible, IdTipoFk, ImgUrl, Descripcion});

        return{
            success: true,
            res: producto,
            message: "Producto registrado con exito",
            status: 201
        }
    }catch(e){
        console.log(e); // en caso de errores
        return{
            success: false,
            message: "Error al registrar registrar el producto",
            status: 500   
        }
    }
}

// Todos los productos, activos o inactivos para vista admin
const ObtenerProducto = async() => {
    try{
        const producto = await Producto.findAndCountAll({
            include:[{
                model: DetalleInventario,
                attributes: ["Precio"]
            },
            {
                model: Tipo,
                attributes: ["Descripcion"]
            }],
            attributes: ["IdProducto","Nombre","CantidadDisponible", "ImgUrl", "Descripcion"]
        });


        return{
            success: true,
            res: producto,
            message: "Ok",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al solicitar lista productos",
            status: 500
        }
    }
}

// Solo para vista usuarios
const ObtenerProductoActivo = async() => {
    try{
        const producto = await Producto.findAndCountAll({
            where: {
                Activo: 1
            },
            include:[{
                model: DetalleInventario,
                attributes: ["Precio"]
            },
            {
                model: Tipo,
                attributes: ["Descripcion"]
            }],
            attributes: ["IdProducto","Nombre","CantidadDisponible","ImgUrl", "Descripcion"]
        });

        return{
            success: true,
            res: producto,
            message: "Ok",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al solicitar lista productos",
            status: 500
        }
    }
}

const ObtenerProductoPorId = async(id) => {
    try{
        const producto = await Producto.findOne({
            where: {
                IdProducto: id,
            },
            include:[{
                model: DetalleInventario,
                attributes: ["Precio"]
            },
            {
                model: Tipo,
                attributes: ["IdTipo","Descripcion"]
            }],
            attributes: ["IdProducto","Nombre","CantidadDisponible","Activo","ImgUrl","Descripcion"]
        });

        return{
            success: true,
            res: producto,
            message: "Ok",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al solicitar el producto",
            status: 500
        }
    }
}

// const getProductoByTipo = async(data) => {
//     try{
//         const producto = await Producto.findAndCountAll({
//             where: {
//                 descripcion: data
//             },
//             include:[{
//                 model: DetalleInventario,
//                 attributes: ["precio"]
//             },
//             {
//                 model: Tipo,
//                 attributes: ["descripcion"]
//             }],
//             attributes: ["idProducto","nombre","cantidad_disponible","contenido_ml","url"]
//         });

//         return{
//             success: true,
//             res: producto,
//             message: "Ok",
//             status: 200
//         }
//     }catch(e){
//         console.log(e);
//         return{
//             success: false,
//             message: "Error al solicitar el producto",
//             status: 500
//         }
//     }
// }

const ActualizarProducto = async(id, data) => {
    try{
        const {Nombre, CantidadDisponible, Activo, ImgUrl, Descripcion} = data;
        await Producto.update({Nombre: Nombre},{
            where: {
                IdProducto: id
            }
        });

        await Producto.update({CantidadDisponible: CantidadDisponible},{
            where: {
                IdProducto: id
            }
        });

        await Producto.update({Activo: Activo},{
            where: {
                IdProducto: id
            }
        });

        await Producto.update({ImgUrl: ImgUrl},{
            where: {
                IdProducto: id
            }
        });

        await Producto.update({Descripcion: Descripcion},{
            where: {
                IdProducto: id
            }
        });

        return{
            success: true,
            message: "Se ha actualizado correctamente el producto",
            status: 200
        }

    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al actualizar el producto",
            status: 500
        }
    }
}

// Esto descontara la cantidad cuando el producto sea comprado
const ActualizarProductoCantidad = async(id, data) => {
    try{
        const {Cantidad} = data;

        const producto = await Producto.findOne({
            where: {
                IdProducto: id
            },
            attributes: ["CantidadDisponible"],
        })
        const {CantidadDisponible} = producto.dataValues;
        const newCantidad = CantidadDisponible - Cantidad;

        await Producto.update({CantidadDisponible: newCantidad},{
            where: {
                IdProducto: id
            }
        });

        return{
            success: true,
            message: "Se ha actualizado correctamente el producto",
            status: 200
        }

    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al actualizar el producto",
            status: 500
        }
    }
}

const DesactivarProducto = async(id) => {
    try{
        const producto = await Producto.update({Activo: 0},{
            where:{
                IdProducto: id
            }
        });

        return{
            success: true,
            res: producto,
            message: "Producto desactivado",
            status: 200
        }
    }catch(e){
        console.log(e);
        return{
            success: false,
            message: "Error al solicitar el producto",
            status: 500
        }
    }
}


module.exports = {
    CrearProducto,
    ObtenerProducto,
    ObtenerProductoPorId,
    ObtenerProductoActivo,
    ActualizarProducto,
    ActualizarProductoCantidad,
    DesactivarProducto
}