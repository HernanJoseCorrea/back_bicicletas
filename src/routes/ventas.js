const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearVenta,
  ObtenerVentas,
  ObtenerVentasPorId,
} = require("../controllers/gestionVentasController");

router.post("/sales", [VerificarToken], async (req, res) => {
  const data = req.body;
  try {
    const resp = await CrearVenta(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/sales", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    // consulta a la base de datos
    const resp = await ObtenerVentas();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/sales/id", [VerificarToken], async (req, res) => {
  try {
    const { IdPersona } = req.usuario;
    // consulta a la base de datos
    const resp = await ObtenerVentasPorId(IdPersona);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
