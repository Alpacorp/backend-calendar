// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require("express");
const { createUser, loginUsuario, renewToken } = require("../controllers/auth");
const router = Router();

router.post("/new", createUser);

router.post("/", loginUsuario);

router.get("/renew", renewToken);

module.exports = router;
