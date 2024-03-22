const User = require("../models/userModel");
const {
  isValidEmail,
  isNotEmpty,
  isValidLength,
} = require("../utils/validator");

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
      error: error.message, // change on production
    });
  }
};
