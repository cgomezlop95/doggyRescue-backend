const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const transporter = require("../config/nodemailer");

/**
 * @swagger
 * /request-dog/{id}:
 *   get:
 *     summary: Adoption Request Form
 *     description: Renders the adoption request form for a specific dog.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the dog for adoption.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the adoption request form for the specified dog.
 *       302:
 *         description: Temporary Redirect.
 */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dogById = await prisma.dog.findUnique({
      where: {
        id,
      },
    });
    res.render("adoptionRequest", {
      dog: dogById,
      user: req.user,
      title: "DoggyRescue",
    });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

/**
 * @swagger
 * /request-dog/{id}:
 *   post:
 *     summary: Submit Adoption Request
 *     description: Submits an adoption request for a specific dog.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the dog for adoption.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestApproved:
 *                 type: boolean
 *               adopterAge:
 *                 type: number
 *               hasExperience:
 *                 type: boolean
 *               dailyHoursAway:
 *                 type: number
 *               hasOtherPets:
 *                 type: boolean
 *               OtherPets:
 *                 type: string
 *               hasKids:
 *                 type: boolean
 *               hasGarden:
 *                 type: boolean
 *               numberOfTrips:
 *                 type: number
 *               monthlyMoney:
 *                 type: number
 *               numberOfPeople:
 *                 type: number
 *               adopterDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Adoption request submitted successfully.
 *       400:
 *         description: Bad request or server error.
 */

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dogById = await prisma.dog.findUnique({
      where: {
        id,
      },
    });
    const ifExperience = "hasExperience" in req.body;
    const ifOtherPets = "hasOtherPets" in req.body;
    const ifKids = "hasKids" in req.body;
    const ifGarden = "hasGarden" in req.body;
    const newRequest = await prisma.adoptionRequest.create({
      data: {
        requestApproved: null,
        adopterAge: parseFloat(req.body.adopterAge),
        hasExperience: ifExperience,
        dailyHoursAway: parseFloat(req.body.dailyHoursAway),
        hasOtherPets: ifOtherPets,
        OtherPets: req.body.OtherPets,
        hasKids: ifKids,
        hasGarden: ifGarden,
        numberOfTrips: parseFloat(req.body.numberOfTrips),
        monthlyMoney: parseFloat(req.body.monthlyMoney),
        numberOfPeople: parseFloat(req.body.numberOfPeople),
        adopterDescription: req.body.adopterDescription,
        userId: req.user.id,
        dogId: dogById.id,
      },
    });

    let mailOptions = {
      from: "tuemail@gmail.com",
      to: "c.gomezlop95@gmail.com",
      subject: "New adoption request",
      html: `
    <p>Dear admin,</p>
    <p>A new adoption request has been submitted.</p>
    <p>Please click <a href="https://doggyrescue.onrender.com/auth/login-page">here</a> to login.</p>
  `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.redirect("/my-adoption-requests");
  } catch (error) {
    console.error(error);
    res.json(
      "Server error. Check if you have already submitted an application for this dog."
    );
  }
});

module.exports = router;
