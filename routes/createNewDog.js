const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

const upload = require("../config/multer");
const handleUpload = require("../middlewares/handleUpload");

/**
 * @swagger
 * /create-new-dog:
 *   get:
 *     summary: Create New Dog Form
 *     description: Renders the form for creating a new dog.
 *     responses:
 *       200:
 *         description: Returns the create new dog form.
 */

router.get("/", async (req, res) => {
  try {
    res.render("createNewDog", { user: req.user, title: "DoggyRescue" });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

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

router.post("/", upload.single("dogPhotoURL"), async (req, res) => {
  try {
    let dogPhotoURL;
    // Check if a file has been uploaded, this avoids an error in case I do not upload a new pic
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      dogPhotoURL = cldRes.secure_url;
    }

    const {
      dogName,
      dogAge,
      dogWeight,
      dogSex,
      dogBreed,
      dogAdopted,
      suitableForKids,
      suitableForOtherPets,
      dogDescription,
      isVaccinated,
      isSterilized,
      potentiallyDangerousDog,
    } = req.body;
    const isDogAdopted = dogAdopted === "on" ? true : false;
    //If dogAdopted is equal to "on", then isDogAdopted is assigned the value true.
    //If dogAdopted is not equal to "on", then isDogAdopted is assigned the value false.
    const isSuitableForKids = suitableForKids === "on" ? true : false;
    const isSuitableForOtherPets = suitableForOtherPets === "on" ? true : false;
    const isPotentiallyDangerousDog =
      potentiallyDangerousDog === "on" ? true : false;
    const isVaccinatedBoolean = isVaccinated === "on" ? true : false;
    const isSterilizedBoolean = isSterilized === "on" ? true : false;
    const dogAgeFloat = parseFloat(dogAge);
    const dogWeightFloat = parseFloat(dogWeight);
    await prisma.dog.create({
      data: {
        dogName,
        dogAge: dogAgeFloat,
        dogWeight: dogWeightFloat,
        dogSex,
        dogBreed,
        dogAdopted: isDogAdopted,
        suitableForKids: isSuitableForKids,
        suitableForOtherPets: isSuitableForOtherPets,
        dogDescription,
        dogPhotoURL: dogPhotoURL,
        potentiallyDangerousDog: isPotentiallyDangerousDog,
        isVaccinated: isVaccinatedBoolean,
        isSterilized: isSterilizedBoolean,
      },
    });
    res.redirect("/dog/pending");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
