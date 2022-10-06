const bcrypt = require('bcrypt');

const {
    Persona
} = require('../models/indexDB');

const {
    GenerarToken
} = require('../auth');


const login = async(data) => {
    try{
        const {Usuario, Contrasenna} = data;

        const persona = await Persona.findOne({
            where: {
                Usuario: Usuario
            }
        })
        if(!persona){
            return{
                success: false,
                message: 'Este correo no se encuentra asociado a ninguna informacion',
                status: 400
            }
        }
        
        const {IdPersona, Contrasena} = persona.dataValues // contraseña a comparar
        if(!Contrasena){
            return{
                success: false,
                message: 'Usuario y Contraseña son incorrectos.',
                status: 400
            }
        }

        // Comparamos si la contrasena introducida se encuentra en algun has en mongo
        const hasPassword = await bcrypt.compare(Contrasenna, Contrasena);
        if(!hasPassword){
            return{
                success: false,
                message: 'Usuario y Contraseña son incorrectos.',
                status: 400
            }
        }
        // Generando json web token
        const token = GenerarToken(IdPersona);
        return{
            success: true,
            res: persona,
            token: token,
            message: 'Se ha iniciado sesion correctamente.',
            status: 200
        }

    }catch(e){
        console.log(e);
        return{
            success: false,
            message: 'Error al iniciar la sesion.',
            status: 500
        }
    }
}


module.exports = {
    login
}
