const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearInventario,
  ObtenerInventario,
  ObtenerInventarioPorId,
  ActualizarInventario,
} = require("../controllers/inventarioController");

router.post("/inventory", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const data = req.body;

    const resp = await CrearInventario(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/inventory", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const resp = await ObtenerInventario();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/inventory/:id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { id } = req.params;

    const resp = await ObtenerInventarioPorId(id);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/inventory/:id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await ActualizarInventario(id, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
