const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

const upload = require("../config/multer");

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

    console.log("req body", req.body); 
    const longitudeFloat = parseFloat(longitude.replace(',', '.'));
    const latitudeFloat = parseFloat(latitude.replace(',', '.'));
    const dogAgeFloat = parseFloat(dogAge.replace(',', '.'));
    const dogWeightFloat = parseFloat(dogWeight.replace(',', '.'));

    await prisma.dog.create({
      data: {
        dogName,
        dogAge: dogAgeFloat,
        dogWeight: dogWeightFloat,
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
        longitude: longitudeFloat,
        latitude: latitudeFloat,
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
