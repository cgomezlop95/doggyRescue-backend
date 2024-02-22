const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /my-adoption-requests:
 *   get:
 *     summary: View User's Adoption Requests
 *     description: Retrieves and displays all adoption requests submitted by the user.
 *     responses:
 *       200:
 *         description: Returns a list of adoption requests submitted by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   requestApproved:
 *                     type: boolean
 *                   adopterAge:
 *                     type: number
 *                   hasExperience:
 *                     type: boolean
 *                   dailyHoursAway:
 *                     type: number
 *                   hasOtherPets:
 *                     type: boolean
 *                   OtherPets:
 *                     type: string
 *                   hasKids:
 *                     type: boolean
 *                   hasGarden:
 *                     type: boolean
 *                   numberOfTrips:
 *                     type: number
 *                   monthlyMoney:
 *                     type: number
 *                   numberOfPeople:
 *                     type: number
 *                   adopterDescription:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   dogId:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                   dog:
 *                     type: object
 *                     properties:
 *                       dogName:
 *                         type: string
 *       400:
 *         description: Bad request or server error.
 */

router.get("/", async (req, res) => {
  try {
    const adoptionRequestList = await prisma.adoptionRequest.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
        dog: {
          select: {
            dogName: true,
          },
        },
      },
      where: {
        user: req.user,
      },
    });
    res.render("myAdoptionRequests", {
      adoptionRequests: adoptionRequestList,
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
 * /my-adoption-requests/{id}:
 *   get:
 *     summary: View Single Adoption Request (User)
 *     description: Retrieves and displays details for a specific adoption request submitted by the user.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the adoption request (userId_dogId).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns details for the specified adoption request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 requestApproved:
 *                   type: boolean
 *                 adopterAge:
 *                   type: number
 *                 hasExperience:
 *                   type: boolean
 *                 dailyHoursAway:
 *                   type: number
 *                 hasOtherPets:
 *                   type: boolean
 *                 OtherPets:
 *                   type: string
 *                 hasKids:
 *                   type: boolean
 *                 hasGarden:
 *                   type: boolean
 *                 numberOfTrips:
 *                   type: number
 *                 monthlyMoney:
 *                   type: number
 *                 numberOfPeople:
 *                   type: number
 *                 adopterDescription:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 dogId:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                 dog:
 *                   type: object
 *                   properties:
 *                     dogName:
 *                       type: string
 *                     dogAge:
 *                       type: number
 *                     dogWeight:
 *                       type: number
 *                     dogSex:
 *                       type: string
 *                     dogBreed:
 *                       type: string
 *                     suitableForKids:
 *                       type: boolean
 *                     suitableForOtherPets:
 *                       type: boolean
 *                     dogDescription:
 *                       type: string
 *                     dogPhotoURL:
 *                       type: string
 *       400:
 *         description: Bad request or server error.
 */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [userId, dogId] = id.split("_"); // Assuming the format is userId_dogId
  try {
    const singleAdoptionRequest = await prisma.adoptionRequest.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
      include: {
        user: {
          select: {
            email: true,
            isAdmin: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        dog: {
          select: {
            dogName: true,
            dogAge: true,
            dogWeight: true,
            dogSex: true,
            dogBreed: true,
            suitableForKids: true,
            suitableForOtherPets: true,
            dogDescription: true,
            dogPhotoURL: true,
          },
        },
      },
    });
    res.render("singleAdoptionRequest", {
      adoptionRequest: singleAdoptionRequest,
      user: req.user,
      title: "DoggyRescue",
    });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
