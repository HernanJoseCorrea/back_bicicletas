const { Router } = require("express");
const router = Router();

const { login } = require("../controllers/loginController");

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const resp = await login(data);
    res.status(resp.status).json(resp);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
