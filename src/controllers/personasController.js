const bcrypt = require('bcrypt');
const validator = require('validator');

const {
  Cliente,
  Persona,
  TipoDocumento,
  Telefono,
  TipoTelefono,
  Direccion
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



const ObtenerPersona = async() => {
  try{
    const persona = await Persona.findAndCountAll({
      // solo mostraremos a las personas activas
      where:{
        Activo: 1
      },
      
      attributes: ["IdPersona","PrimerNombre","SegundoNombre","PrimerApellido","SegundoApellido"]
    })

    return{
      success: true,
      res: persona,
      message: "Ok.",
      status: 200
    }
  }catch(e){
    console.log(e); // en caso de errores
    return{
      success: false,
      message: "Error.",
      status: 500
    }
  }
}

const ObtenerPersonaPorId = async(id) => {
  try{
    const persona = await Persona.findAndCountAll({
      // solo mostraremos a las personas activas
      where:{
        activo: 1,
        idPersona: id
      },
      
      attributes: ["IdPersona","Documento","PrimerNombre","SegundoNombre","PrimerApellido","SegundoApellido"]
    })

    return{
      success: true,
      res: persona,
      message: "Ok.",
      status: 200
    }
  }catch(e){
    console.log(e); // en caso de errores
    return{
      success: false,
      message: "Error.",
      status: 500
    }
  }
}

const CrearPersona = async(user) =>{
  const { 
    Documento, 
    PrimerNombre, 
    SegundoNombre, 
    PrimerApellido, 
    SegundoApellido,
    Usuario,
    Contrasenna
  } = user; // Aqui solo se muestran los datos a crear

  // Variable para almacenar los errores manualmente
  const Errors = [];

  try{
    console.log(user)
    // const nums = ['1','2','3','4','5','6','7','8','9','0'];
    // console.log(nums.includes([...documento]));

    // if(!nums.includes(documento)){
    //   Errors.push({path:"document", message: "El documento debe contener solo numeros."});
    // }

    if(Documento.length < 7 || Documento.length > 10){
      Errors.push({path:"document", message: "El documento debe tener entre 7 y 10 numeros."});
    }

    if(!validator.isEmail(Usuario)){
      Errors.push({path:"email", message: "Por favor introduce un email valido."});
    }

    if(Contrasenna.length > 16 || Contrasenna.length < 8){
      Errors.push({path:"password", message: "La contraseña debe tener entre 8 y 16 caracteres."});
    }
    // Si es efectivo el siguiente if, salta error en el programa
    if(Errors.length){
      throw Errors;
    }
    // Encriptamos la contraseña
    const hashPassword = await bcrypt.hash(Contrasenna, 10);

    const newPersona = await Persona.create({ 
      Documento, 
      PrimerNombre, 
      SegundoNombre, 
      PrimerApellido, 
      SegundoApellido, 
      Usuario,
      Contrasena: hashPassword
    });

    if(newPersona){
      // Tabla Clientes
      await Cliente.create({IdPersonaFk: newPersona.dataValues.IdPersona});
    }


    // En caso de cumplir las condiciones anteriores, retornamos un mensaje exitoso
    return{
      success: true,
      message: "Registro exitoso.",
      status: 201
    }
  }catch(e){
    console.log(e); // en caso de errores
    return{
      success: false,
      message: "Error al registrarse.",
      errors: formatErrors(e, Errors),
      status: 500   
    }
  }
}

// Solo se actualiza persona
const ActualizarPersona = async(id, user) => {
  const { 
    Documento,
    PrimerNombre, 
    SegundoNombre, 
    PrimerApellido, 
    SegundoApellido,
  } = user;

  try{

    await Persona.update({Documento: Documento},{
      where: {
        IdPersona: id
      }
    });

    // primer nombre
      await Persona.update({PrimerNombre: PrimerNombre},{
        where: {
          IdPersona: id
        }
      });

      // segundo nombre
      await Persona.update({SegundoNombre: SegundoNombre},{
        where: {
          IdPersona: id
        }
      });

      // primer apellido
      await Persona.update({PrimerApellido: PrimerApellido},{
        where: {
          IdPersona: id
        }
      })

      // segundo apellido
      await Persona.update({SegundoApellido: SegundoApellido},{
        where: {
          IdPersona: id
        }
      });

    return{
      success: true,
      message: "Modificacion exitosa.",
      status: 200
    }
    
  }catch(e){
    console.log(e); // en caso de algun error
    return{
      success: true,
      message:"Error en la modificacion.",
      errors: formatErrors(e, Errors),
      status: 500
    }    
  }
}

// Solo se actualiza correo
const updatePersonaEmail = async(id, user) => {
  const { 
    correo
  } = user;

  const Errors = [];
  try{


    if(!validator.isEmail(correo)){
      Errors.push({path:"email", message: "Por favor introduce un email valido."});
    }

    if(Errors.length){
      throw Errors;
    }
    
    // correo
    await Persona.update({correo: correo},{
      where: {
        idPersona: id
      }
    });

    return{
      message: "Modificacion exitosa.",
      status: 200
    }
    
  }catch(e){
    console.log(e); // en caso de algun error
    return{
      message:"Error en la modificacion.",
      errors: formatErrors(e, Errors),
      status: 500
    }    
  }
}

// Solo se actualiza persona
const updatePersonaPass = async(id, user) => {
  const { 
    orgContrasena, /// Original
    newContrasena  // Nueva
  } = user;

  const Errors = [];
  try{

    const persona = await Persona.findOne({
      where: {
        idPersona: id
      }
    })

    if(!persona){
      Errors.push({path: 'persona', message: 'No se encontro el usuario.'});
    }

    // Obtenemos la contraseña y la evaluamos con la original
    const {contrasenna} = persona.dataValues;
    const hashPassword = await bcrypt.compare(orgContrasena, contrasenna);
    // Verificamos que exista
    if(!hashPassword){
      Errors.push({path: 'confirmationPassword', message: 'Contraseña incorrecta.'});
    }

    if(newContrasena.length > 16 || newContrasena.length < 8){
      Errors.push({path:"password", message: "La contraseña debe tener entre 8 y 16 caracteres."});
    }

    if(Errors.length){
      throw Errors;
    }

    // Encriptamos y actualizamos
    const newHasPassword = await bcrypt.hash(newContrasena, 10);
    await Persona.update({contrasenna: newHasPassword},{
      where: {
        idPersona: id
      }
    });

    return{
      message: "Modificacion exitosa.",
      status: 200
    }
    
  }catch(e){
    console.log(e); // en caso de algun error
    return{
      message:"Error en la modificacion.",
      errors: formatErrors(e, Errors),
      status: 500
    }    
  }
}

// El usuario no se elimina, solo pasamos su estado activo a 0
const DesactivarPersona = async(id) => {
  
  try{
    await Persona.update({Activo: 0},{
      where:{
        IdPersona: id
      }
    });

    return{
      success: true,
      message: "Eliminado correctamente.",
      status: 200
    }
  }catch(e){
    return{
      success: false,
      message: "Ha ocurrido un error.",
      status: 500
    }
  }
}

module.exports = {
  CrearPersona,
  ObtenerPersonaPorId,
  ObtenerPersona,
  ActualizarPersona,
  updatePersonaEmail,
  updatePersonaPass,
  DesactivarPersona
}