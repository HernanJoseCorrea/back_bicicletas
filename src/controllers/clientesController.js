const {
  Cliente,
  Persona,
  Telefono,
  Direccion 
} = require('../models/indexDB');


// Solo podre ver los clientes, no crear, modificar ni eliminar
const ObtenerCliente = async() => {
  try{
    const cliente = await Cliente.findAndCountAll({
      // Los atributos son los datos que se van a mostrar de cada modelo
      include:[{
        model: Persona,
        attributes: ["IdPersona","Documento","PrimerNombre","SegundoNombre","PrimerApellido","SegundoApellido"],
        // Atributos que pertenecen a persona
        include:[
        {
          model: Telefono,
          attributes: ["Numero"],
        },
        {
          model: Direccion,
          attributes: ["Carrera","Calle","NombreCalle"],
        }]
      }],
      attributes: ["IdCliente"]
    })

    return{
      success: true,
      res: cliente,
      message: "Ok",
      status: 200
    }
  }catch(e){
    console.log(e)
    return{
      success: false,
      message: "Error",
      status: 500
    }
  }
}

const ObtenerClientePorId = async(id) => {
  try{
    const cliente = await Cliente.findAndCountAll({
      where:{
        id_persona: id
      },
      // Los atributos son los datos que se van a mostrar de cada modelo
      include:[{
        model: Persona,
        attributes: ["IdPersona","Documento","PrimerNombre","SegundoNombre","PrimerApellido","SegundoApellido"],
        // Atributos que pertenecen a persona
        include:[
        {
          model: Telefono,
          attributes: ["Numero"],
        },
        {
          model: Direccion,
          attributes: ["Carrera","Calle","NombreCalle"],
        }]
      }],
      attributes: ["IdCliente"]
    })

    return{
      res: cliente,
      message: "Ok",
      status: 200
    }
  }catch(e){
    console.log(e)
    return{
      message: "Error",
      status: 500
    }
  }
}

module.exports = {
  ObtenerCliente,
  ObtenerClientePorId
}