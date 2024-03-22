const crypto = require("crypto");
const { SECRET_KEY } = require("../config/env");

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; // Longitud del vector de inicialización para AES-256-CBC

// Asegúrate de que la clave sea un Buffer de 32 bytes directamente desde base64
const keyBuffer = Buffer.from(SECRET_KEY, "base64");

// Función para cifrar texto
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Función para descifrar texto
const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { encrypt, decrypt };
