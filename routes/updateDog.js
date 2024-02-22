const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

const upload = require("../config/multer");
const handleUpload = require("../middlewares/handleUpload");

/**
 * @swagger
 * /update-dog/{id}:
 *   get:
 *     summary: Update Dog Details Form
 *     description: Renders the form for updating details of a specific dog.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the dog.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the update dog details form.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 dogName:
 *                   type: string
 *                 dogAge:
 *                   type: number
 *                 dogWeight:
 *                   type: number
 *                 dogSex:
 *                   type: string
 *                 dogBreed:
 *                   type: string
 *                 suitableForKids:
 *                   type: boolean
 *                 suitableForOtherPets:
 *                   type: boolean
 *                 dogDescription:
 *                   type: string
 *                 dogPhotoURL:
 *                   type: string
 *       400:
 *         description: Bad request or server error.
 */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dogById = await prisma.dog.findUnique({
      where: {
        id,
      },
    });
    res.render("updateDog", {
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
 * /update-dog/{id}:
 *   put:
 *     summary: Update Dog Details
 *     description: Updates details of a specific dog in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the dog.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               dogName:
 *                 type: string
 *               dogAge:
 *                 type: number
 *               dogWeight:
 *                 type: number
 *               dogSex:
 *                 type: string
 *               dogBreed:
 *                 type: string
 *               dogAdopted:
 *                 type: boolean
 *               suitableForKids:
 *                 type: boolean
 *               suitableForOtherPets:
 *                 type: boolean
 *               dogDescription:
 *                 type: string
 *               dogPhotoURL:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       302:
 *         description: Dog details updated successfully.
 *       400:
 *         description: Bad request or server error.
 */

router.put("/:id", upload.single("dogPhotoURL"), async (req, res) => {
  try {
    let dogPhotoURL;
    // Check if a file has been uploaded, this avoids an error in case I do not upload a new pic
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      dogPhotoURL = cldRes.secure_url;
    }

    const isDogAdopted = "dogAdopted" in req.body;
    const isSuitableForKids = "suitableForKids" in req.body;
    const isSuitableForOtherPets = "suitableForOtherPets" in req.body;
    await prisma.dog.update({
      where: { id: req.params.id },
      data: {
        dogName: req.body.dogName,
        dogAge: parseFloat(req.body.dogAge),
        dogWeight: parseFloat(req.body.dogWeight),
        dogSex: req.body.dogSex,
        dogBreed: req.body.dogBreed,
        dogAdopted: isDogAdopted,
        suitableForKids: isSuitableForKids,
        suitableForOtherPets: isSuitableForOtherPets,
        dogDescription: req.body.dogDescription,
        dogPhotoURL: dogPhotoURL,
      },
    });
    res.redirect(`/dog/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
