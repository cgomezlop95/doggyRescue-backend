const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

const upload = require("../config/multer");
const handleUpload = require("../middlewares/handleUpload");

/**
 * @swagger
 * /create-new-dog:
 *   post:
 *     summary: Create and Add a New Dog
 *     description: Creates and adds a new dog to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               dogPhotoURL:
 *                 type: string
 *                 format: binary
 *               dogName:
 *                 type: string
 *               dogAge:
 *                 type: string
 *               dogWeight:
 *                 type: string
 *               dogSex:
 *                 type: string
 *               dogBreed:
 *                 type: string
 *               dogAdopted:
 *                 type: string
 *               suitableForKids:
 *                 type: string
 *               suitableForOtherPets:
 *                 type: string
 *               dogDescription:
 *                 type: string
 *     responses:
 *       302:
 *         description: Dog created and added successfully.
 *       400:
 *         description: Bad request or server error.
 */

router.post("/", async (req, res) => {
  try {
    const {
      dogName,
      dogAge,
      dogWeight,
      dogSex,
      dogBreed,
      // dogAdopted,
      suitableForKids,
      suitableForOtherPets,
      dogDescription,
      isVaccinated,
      isSterilized,
      potentiallyDangerousDog,
      dogPhotoURL,
      longitude,
      latitude,
    } = req.body;

    await prisma.dog.create({
      data: {
        dogName,
        dogAge: parseFloat(dogAge),
        dogWeight: parseFloat(dogWeight),
        dogSex,
        dogBreed,
        dogAdopted: false,
        suitableForKids,
        suitableForOtherPets,
        dogDescription,
        dogPhotoURL,
        potentiallyDangerousDog,
        isVaccinated,
        isSterilized,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      },
    });
    // res.redirect("/dog/pending");
    res.json("dog created with success");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
