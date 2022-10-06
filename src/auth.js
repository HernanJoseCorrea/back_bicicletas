const { request } = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { Persona } = require("./models/indexDB");
const { compareSync } = require("bcrypt");

const GenerarToken = (id) => {
  try {
    // Encriptamos el id que recibimos
    const payload = CryptoJS.AES.encrypt(
      JSON.stringify(id),
      "1234567890"
    ).toString();

    const token = jwt.sign({ payload }, "2133edasw12323dwqeqweq.", {
      expiresIn: "1 day",
    });
    return token;
  } catch (e) {
    console.log(e);
  }
};

const VerificarToken = async (req, res = request, next) => {
  const token = req.header("Authorization");
  try {
    // Verificamos que exista un token.
    if (token === undefined)
      return res.status(400).json({ message: "Por favor inicie sesion." });

    // Extraemos el id encriptado del token y verificamos
    const { payload } = jwt.verify(token, "2133edasw12323dwqeqweq.");

    // desencriptamos el id
    const idcryp = CryptoJS.AES.decrypt(payload, "1234567890");
    const id = idcryp.toString(CryptoJS.enc.Utf8);

    // Verificamos si existe la persona en la base de datos.
    const persona = await Persona.findOne({ where: { IdPersona: id } });
    if (!persona) {
      return res.status(400).json({ message: "No se encontro el usuario." });
    }

    req.usuario = persona.dataValues;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Error validando token." });
  }
};

module.exports = {
  GenerarToken,
  VerificarToken,
}
