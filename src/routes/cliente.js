const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");
const {
  ObtenerCliente,
  ObtenerClientePorId,
} = require("../controllers/clientesController");

router.get("/clients", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    // consulta a la base de datos
    const resp = await ObtenerCliente();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/clients/id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { IdPersona } = req.usuario;
    // consulta a la base de datos
    const resp = await ObtenerClientePorId(IdPersona);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
