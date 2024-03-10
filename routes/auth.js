const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma");

// const cookieSettings = {
//   httpOnly: true,
//   secure: false,
//   sameSite: "strict",
// };
//Option 1: No hace el login en PROD

const cookieSettings = {
  httpOnly: true,
  secure: false, // Because you're using HTTPS
  sameSite: "None", // Necessary for cross-site access when using 'secure: true'
};
//No me elimina el cookie (no me hace el logout)
//Hace el logout en local
//Problemas con login/logout en PROD

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        userPhotoURL: req.body.userPhotoURL,
      },
    });
    const jwtToken = jwt.sign({ sub: req.body.email }, "secret");
    res.cookie("token", jwtToken, cookieSettings).send("Cookie is set");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const jwtToken = jwt.sign({ sub: req.body.email }, "secret");
    res.cookie("token", jwtToken, cookieSettings).send("Cookie is set");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//Getting the error 401 in Render

router.get(
  "/logged-in",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      res.json({ user: req.user });
      console.log("req.user", req.user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token").send("Cookie is cleared");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
