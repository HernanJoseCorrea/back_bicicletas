const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearTelefono,
  ObtenerTelefonoPorId,
  ActualizarTelefono,
} = require("../controllers/telefonoController");

router.post("/phoneNumber", [VerificarToken], async (req, res) => {
  try {
    const data = req.body;
    const resp = await CrearTelefono(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/phoneNumber/id", [VerificarToken], async (req, res) => {
  try {
    const { IdPersona } = req.usuario;
    const resp = await ObtenerTelefonoPorId(IdPersona);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/phoneNumber/id", [VerificarToken], async (req, res) => {
  try {
    const { IdPersona } = req.usuario;
    const data = req.body;
    const resp = await ActualizarTelefono(IdPersona, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
