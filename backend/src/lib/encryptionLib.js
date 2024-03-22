const crypto = require("crypto");
const { SECRET_KEY } = require("../config/env");

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
const SALT_WORK_FACTOR = 10;

/**
 * Generates a hash of the provided password.
 *
 * @param {string} password The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/**
 * Compares a provided password with a hash.
 *
 * @param {string} candidatePassword The provided password.
 * @param {string} hash The stored hash.
 * @returns {Promise<boolean>} True if passwords match, otherwise False.
 */
const comparePassword = async (candidatePassword, hash) => {
  return await bcrypt.compare(candidatePassword, hash);
};

const keyBuffer = Buffer.from(SECRET_KEY, "base64");

/**
 * Encrypts a given text using AES-256-CBC encryption algorithm.
 * The encryption process includes generating an initialization vector (IV),
 * creating a cipher instance with the secret key and IV, and then
 * performing the encryption on the input text. The IV is prepended to
 * the encrypted text and returned as a single string, separated by a colon.
 *
 * @param {string} text The plain text to be encrypted.
 * @return {string} The encrypted text, including the IV and the cipher text, separated by a colon.
 */
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

/**
 * Decrypts a given text using AES-256-CBC encryption algorithm.
 * The input is expected to be a string containing the IV and the
 * encrypted text, separated by a colon. The function splits this input,
 * extracts the IV and the encrypted text, creates a decipher instance
 * with the secret key and IV, and then performs the decryption.
 *
 * @param {string} text The encrypted text to be decrypted, including the IV.
 * @return {string} The decrypted plain text.
 */
const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { hashPassword, comparePassword, encrypt, decrypt };
