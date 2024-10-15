import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { body, param } from "express-validator";
import { validateErrors } from "../middlewares/validateErrors.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";

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
    .withMessage("El email es requerido")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("El email no es válido"),
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
  UserController.createAccount
);

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isString()
    .withMessage("El token debe ser una cadena de texto"),
  validateErrors,
  UserController.confirmAccount
);

router.post(
  "/request-new-confirmation-token",
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("El email no es válido"),
  validateErrors,
  UserController.requestNewConfirmationToken
);

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  validateErrors,
  UserController.login
);

router.post("/logout", authenticate, UserController.logout);

router.post(
  "/request-token-to-recover-password",
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("El email no es válido"),
  validateErrors,
  UserController.requestTokenToRecoverPassword
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("El token es requerido"),
  validateErrors,
  UserController.validateToken
);

router.post(
  "/reset-password",
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
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isString()
    .withMessage("El token debe ser una cadena de texto"),
  validateErrors,
  UserController.resetPassword
);

export default router;
