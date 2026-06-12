// import express from "express";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const router = express.Router();
// const JWT_SECRET = "MY_SECRET_KEY"; // put in .env later

// // SIGNUP
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     let user = await User.findOne({ email });

//     if (user) return res.json({ error: "Email already exists" });

//     const hashPass = await bcrypt.hash(password, 10);

//     user = await User.create({ name, email, password: hashPass });

//       const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ success: true });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     let user = await User.findOne({ email });

//     if (!user) return res.json({ error: "User not found" });

//     const valid = await bcrypt.compare(password, user.password);

//     if (!valid) return res.json({ error: "Incorrect password" });

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ success: true, token, name: user.name });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// // VERIFY TOKEN
// router.post("/verify", (req, res) => {
//   try {
//     const { token } = req.body;
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ valid: true, userId: decoded.userId });
//   } catch {
//     res.json({ valid: false });
//   }
// });

// export default router;
