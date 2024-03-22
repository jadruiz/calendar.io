const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../../../lib/encryptionLib");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Middleware that runs before saving the user to encrypt the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = encrypt(this.password);
  }
  next();
});

// Decrypt password
userSchema.methods.getDecryptedPassword = function () {
  return decrypt(this.password);
};

//Function to compare passwords during login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  const decryptedPassword = decrypt(this.password);
  cb(null, candidatePassword === decryptedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
