const { response } = require("express");


const rolADMIN = (req, res = response, next) => {

    const {Administrador} = req.usuario

    if (!Administrador) {
        return res.status(401).json({message : 'no esta autorizado para hacer esto, solo ADMIN'});
    }

    next();
};

module.exports = {
    rolADMIN
}