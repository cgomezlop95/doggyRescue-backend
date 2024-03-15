const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma");

const cookieSettings = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

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
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const jwtToken = jwt.sign({ sub: req.body.email }, "secret");
      res.cookie("token", jwtToken, cookieSettings).send("Cookie is set");
    } else {
      res.status(401).send("Invalid credentials");
    }
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
      console.log("req.user", req.user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", cookieSettings).send("Cookie is cleared");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
