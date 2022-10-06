const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");
const {
  CrearCarrito,
  ObtenerCarritoPorId,
} = require("../controllers/carritoController");

router.post("/carrito", [VerificarToken], async (req, res) => {
  const data = req.body;
  try {
    const resp = await CrearCarrito(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/carrito/id", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;
  try {
    const resp = await ObtenerCarritoPorId(IdPersona);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
