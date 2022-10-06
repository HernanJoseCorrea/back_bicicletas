const { Router } = require("express");
const router = Router();

const { VerificarToken } = require("../auth");
const { rolADMIN } = require("../middlewares/rolAdmin");

const {
  CrearProducto,
  ObtenerProducto,
  ObtenerProductoActivo,
  ObtenerProductoPorId,
  ActualizarProducto,
  ActualizarProductoCantidad,
  DesactivarProducto,
} = require("../controllers/productoController");

router.post("/products", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const data = req.body;

    const resp = await CrearProducto(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

// Producto para vista admin
router.get("/products", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    // consulta a la base de datos
    const resp = await ObtenerProducto();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

// router.get('/products/:id',[
//   checkJWT,
//   rolADMIN
// ],async(req, res) => {
//   const {id} = req.params;
//   try{
//     // consulta a la base de datos
//     const resp = await getProductoById(id);
//     res.status(resp.status).json(resp)
//   }catch(e){
//     console.log(e);
//   }
// });

// Productos para vista usuarios
router.get("/products/active", async (req, res) => {
  try {
    // consulta a la base de datos
    const resp = await ObtenerProductoActivo();
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/products/active/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Llenamos los parametros
    const resp = await ObtenerProductoPorId(id);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

// Para descontar la cantidad despues de realizar una compra
router.put("/products/sell/:id", [VerificarToken], async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // Llenamos los parametros
    const resp = await ActualizarProductoCantidad(id, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.put("/products/:id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // Llenamos los parametros
    const resp = await ActualizarProducto(id, data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/products/:id", [VerificarToken, rolADMIN], async (req, res) => {
  try {
    const { id } = req.params;

    const resp = await DesactivarProducto(id);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
