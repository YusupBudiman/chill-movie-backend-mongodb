const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Kata sandi minimal 6 karakter!" });
  }
  try {
    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "Username telah terdaftar!" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email: "",
      imgUser: "",
    });

    res.status(201).json({ message: "Pendaftaran berhasil", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Username tidak ditemukan!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Kata sandi anda salah!" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        imgUser: user.imgUser,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
