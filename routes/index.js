const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ title: "DoggyRescue", user: req.user });
});

router.use("/auth", require("./auth"));
//https://doggyrescue-backend.onrender.com/auth/
router.use("/dogs", require("./dogs"));
router.use("/dog", require("./singleDog"));
router.use("/request-dog", require("./adoptionRequest"));
router.use("/create-new-dog", require("./createNewDog"));
router.use("/update-dog", require("./updateDog"));
router.use("/adoption-requests", require("./adoptionRequestAdminView"));
router.use("/adoption-request", require("./singleAdoptionRequest"));
router.use("/users", require("./users"));
router.use("/user", require("./user"));
router.use("/my-adoption-requests", require("./myAdoptionRequests"));

module.exports = router;
