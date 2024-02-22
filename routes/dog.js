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
    res.render("dogs", { dogs: dogs, user: req.user, title: "DoggyRescue" });
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
    res.render("dogs", { dogs: dogs, user: req.user, title: "DoggyRescue" });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

/**
 * @swagger
 * /dog/{id}:
 *   get:
 *     summary: View Dog Details
 *     description: Retrieves and displays details for a specific dog.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the dog.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns details for the specified dog.
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
  const { id } = req.params;
  try {
    const dogById = await prisma.dog.findUnique({
      where: {
        id,
      },
    });
    res.render("singleDog", {
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
 * /dog/delete/{id}:
 *   delete:
 *     summary: Delete Dog
 *     description: Deletes a specific dog from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the dog.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dog deleted successfully.
 *       400:
 *         description: Bad request or server error.
 */

router.delete("/delete/:id", async (req, res) => {
  try {
    await prisma.dog.delete({
      where: { id: req.params.id },
    });
    res.redirect("/dog/pending");
  } catch (error) {
    console.error(error);
    res.json(
      "Server error. Check if there is an adoption request linked to this dog"
    );
  }
});

module.exports = router;
