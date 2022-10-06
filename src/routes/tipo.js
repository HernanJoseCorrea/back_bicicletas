const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearTipo,
  ObtenerTipo,
  ObtenerTipoProducto,
  ActualizarTipo,
} = require("../controllers/tipoController");

router.post("/types", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const data = req.body;

    const resp = await CrearTipo(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/types", async (req, res) => {
  try {
    const resp = await ObtenerTipo();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/types/:descripcion", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { descripcion } = req.params;

    const resp = await ObtenerTipoProducto(descripcion);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/types/:id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await ActualizarTipo(id, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
