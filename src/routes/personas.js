const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearPersona,
  ObtenerPersona,
  ObtenerPersonaPorId,
  ActualizarPersona,
  DesactivarPersona,
  updatePersonaEmail,
  updatePersonaPass,
} = require("../controllers/personasController");

router.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const resp = await CrearPersona(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/person", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    // consulta a la base de datos
    const resp = await ObtenerPersona();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/person/id", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;
  try {
    // consulta a la base de datos
    const resp = await ObtenerPersonaPorId(IdPersona);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/person/id", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;
  const data = req.body;

  try {
    const resp = await ActualizarPersona(IdPersona, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/person/email/id", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;
  const data = req.body;

  try {
    const resp = await updatePersonaEmail(IdPersona, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/person/password/id", [VerificarToken], async (req, res) => {
  const { IdPersona } = req.usuario;
  const data = req.body;

  try {
    const resp = await updatePersonaPass(IdPersona, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/person/:id", [VerificarToken, rolADMIN], async (req, res) => {
  const { IdPersona } = req.usuario;
  const {id} = req.params;

  try {
    const resp = await DesactivarPersona(id);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
