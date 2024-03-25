const User = require("../models/userModel");
const {
  isValidEmail,
  isNotEmpty,
  isValidLength,
} = require("../utils/validator");
const { NODE_ENV, SECRET_KEY } = require("../../../config/env");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname } = req.body;
    if (
      !isValidEmail(email) ||
      !isNotEmpty(username) ||
      !isNotEmpty(firstname) ||
      !isNotEmpty(lastname) ||
      !isValidLength(password, { min: 8 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Datos de registro inválidos.",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe.",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      firstname,
      lastname,
    });
    res.status(201).json({
      success: true,
      message: "El usuario se agregó correctamente.",
      data: { userId: user.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al registrar el usuario.",
      error: NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!isNotEmpty(login) || !isNotEmpty(password)) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario/email y la contraseña son requeridos.",
      });
    }

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas.",
      });
    }
    //Generate the  JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso.",
      data: { token: token, user_id: user.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión.",
      error: error.message,
    });
  }
};
