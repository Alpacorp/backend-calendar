// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, loginUsuario, renewToken } = require("../controllers/auth");
const { validateInputs } = require("../middlewares/validate-inputs");
const { validateJWT } = require("../middlewares/validate-jwt");

router.post(
  "/new",
  [
    // Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe tener mínimo 6 caracteres"
    ).isLength({ min: 6 }),
    validateInputs,
  ],
  createUser
);

router.post(
  "/",
  [
    check(
      "email",
      "El email es obligatorio y debe ser en formato email"
    ).isEmail(),
    check(
      "password",
      "El password es obligatorio y debe tener mínimo 6 caracteres"
    ).isLength({ min: 6 }),
    validateInputs,
  ],
  loginUsuario
);

router.get("/renew", [validateJWT], renewToken);

module.exports = router;
