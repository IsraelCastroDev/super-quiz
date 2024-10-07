import { Router } from "express";
import { confirmAccount, createAccount } from "../controllers/user.controllers";
import { body } from "express-validator";
import { validateErrors } from "../middlewares/validateErrors.middleware";

const router = Router();

router.post(
  "/create-account",
  body("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("lastname")
    .notEmpty()
    .withMessage("El apellido es requerido")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto"),
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es requerido")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto"),
  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es requerido")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("El correo electrónico no es válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
    ),
  body("confirm_password")
    .notEmpty()
    .withMessage("El campo es requerido")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
  validateErrors,
  createAccount
);

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isString()
    .withMessage("El token debe ser una cadena de texto"),
  validateErrors,
  confirmAccount
);

export default router;
