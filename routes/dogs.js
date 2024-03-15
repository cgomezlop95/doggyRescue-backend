const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /dog/pending:
 *   get:
 *     summary: View Dogs Available for Adoption
 *     description: Retrieves and displays all dogs available for adoption.
 *     responses:
 *       200:
 *         description: Returns a list of dogs available for adoption.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   dogName:
 *                     type: string
 *                   dogAge:
 *                     type: number
 *                   dogWeight:
 *                     type: number
 *                   dogSex:
 *                     type: string
 *                   dogBreed:
 *                     type: string
 *                   suitableForKids:
 *                     type: boolean
 *                   suitableForOtherPets:
 *                     type: boolean
 *                   dogDescription:
 *                     type: string
 *                   dogPhotoURL:
 *                     type: string
 *       400:
 *         description: Bad request or server error.
 */

router.get("/pending", async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany({
      where: {
        dogAdopted: false,
      },
    });
    res.json({ dogs: dogs });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

/**
 * @swagger
 * /dog/adopted:
 *   get:
 *     summary: View Adopted Dogs
 *     description: Retrieves and displays all adopted dogs.
 *     responses:
 *       200:
 *         description: Returns a list of adopted dogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   dogName:
 *                     type: string
 *                   dogAge:
 *                     type: number
 *                   dogWeight:
 *                     type: number
 *                   dogSex:
 *                     type: string
 *                   dogBreed:
 *                     type: string
 *                   suitableForKids:
 *                     type: boolean
 *                   suitableForOtherPets:
 *                     type: boolean
 *                   dogDescription:
 *                     type: string
 *                   dogPhotoURL:
 *                     type: string
 *       400:
 *         description: Bad request or server error.
 */

router.get("/adopted", async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany({
      where: {
        dogAdopted: true,
      },
    });
    res.json({ dogs: dogs });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.get("/breeds", async (req, res) => {
  try {
    const dogBreeds = await prisma.dog.findMany({
      select: {
        dogBreed: true,
      },
    });
    res.json({ dogBreeds: dogBreeds });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
