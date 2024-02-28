const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma");

const cookieSettings = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
};

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
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

router.get(
  "/logged-in",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      res.json({ user: req.user });
      console.log(req.user);
      console.log(req.user.isAdmin);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Log out functionality

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

//Google login

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

module.exports = router;
