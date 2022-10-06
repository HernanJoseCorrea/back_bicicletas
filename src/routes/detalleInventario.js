const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearDetalleInventario,
  ObtenerDetalleInventario,
  ActualizarDetalleInventario,
  ObtenerDetalleInventarioPrecio,
} = require("../controllers/detalleInventarioController");


router.post("/inventoryDetails", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const data = req.body;

    const resp = await CrearDetalleInventario(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/inventoryDetails", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const resp = await ObtenerDetalleInventario();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/inventoryDetails/:price",[VerificarToken, rolADMIN], async (req, res) => {
    try {
      const { price } = req.params;

      const resp = await ObtenerDetalleInventarioPrecio(price);
      res.status(resp.status).json(resp);
    } catch (e) {
      console.log(e);
    }
  }
);

router.put("/inventoryDetails/:id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await ActualizarDetalleInventario(id, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
