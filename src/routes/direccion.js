const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearDireccion,
  ObtenerDireccionPorId,
  ActualizarDireccion,
} = require("../controllers/direccionController");

router.post("/address", [VerificarToken], async (req, res) => {
  const data = req.body;

  try {
    const resp = await CrearDireccion(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/address/id", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;

  try {
    const resp = await ObtenerDireccionPorId(IdPersona);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/address", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;
  const data = req.body;

  try {
    const resp = await ActualizarDireccion(IdPersona, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
