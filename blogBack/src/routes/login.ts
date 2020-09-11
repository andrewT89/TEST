import { Router, Request, Response } from "express";
import {
  hashSync as hash,
  genSaltSync as saltSync,
  compareSync as comparePasswords,
} from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const salt = saltSync(10);

// Inicialización del router express
const router = Router();

/** Importaciones de modelos */
import { userModel } from "../models/index";

router.post('/user-login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await userModel.findOne({ email });

  if (!user) {
    return handleLoginFailed(res, "Usuario no registrado");
  }

  if (!comparePasswords(password, user.password)) {
    return handleLoginFailed(res, "El correo y/o contraseña no coinciden ");
  }

  const token = createToken(user);
    return res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        userName: user.userName,
        email: user.email
    })
});

const createToken = (user: any) => jwt.sign({ user }, process.env.SEED as string, { expiresIn: '2h' });

router.post("/register", async (req: Request, res: Response) => {
  const body = req.body;

  const userRegister = new userModel({
    userName: body.userName,
    email: body.email,
    password: hash(body.password, salt),
  });

  userRegister.save((err, _userSave) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear usuario",
        errors: err,
      });
    }

    res.status(201).json({
      ok: true,
      usuario: _userSave,
      usuarioTkoen: req.body.user,
    });
  });
});

function handleLoginFailed(res: any, message: any) {
  return res.status(401).json({
    message,
    error: message || "Email and password don't match",
  });
}

export default router;
