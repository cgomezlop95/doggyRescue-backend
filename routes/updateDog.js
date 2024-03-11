const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

const upload = require("../config/multer");

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
    res.json({
      dog: dogById,
      user: req.user,
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

router.put("/:id", async (req, res) => {
  try {
    await prisma.dog.update({
      where: { id: req.params.id },
      data: {
        dogName: req.body.dogName,
        dogAge: parseFloat(req.body.dogAge),
        dogWeight: parseFloat(req.body.dogWeight),
        dogSex: req.body.dogSex,
        dogBreed: req.body.dogBreed,
        dogAdopted: req.body.dogAdopted,
        suitableForKids: req.body.suitableForKids,
        suitableForOtherPets: req.body.suitableForOtherPets,
        dogDescription: req.body.dogDescription,
        dogPhotoURL: req.body.dogPhotoURL,
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
      },
    });
    // res.redirect(`/dog/${req.params.id}`);
    res.json("Success");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
