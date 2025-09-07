const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Kata sandi minimal 6 karakter!" });
  }
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Username telah terdaftar!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email: "",
      imgUser: "",
    });

    res.status(201).json({
      message: "Pendaftaran berhasil",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username dan password wajib diisi" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(400)
        .json({ message: "Username atau kata sandi anda salah!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Username atau kata sandi anda salah!" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        imgUser: user.imgUser,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
