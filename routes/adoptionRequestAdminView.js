const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /adoption-requests/approved:
 *   get:
 *     summary: View Approved Adoption Requests
 *     description: Retrieves a list of all approved adoption requests.
 *     responses:
 *       200:
 *         description: Returns a list of approved adoption requests.
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

router.get("/approved", async (req, res) => {
  try {
    const adoptionRequestList = await prisma.adoptionRequest.findMany({
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            dogName: true,
            dogPhotoURL: true,
          },
        },
      },
    });
    res.json({ adoptionRequests: adoptionRequestList });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

/**
 * @swagger
 * /adoption-requests/pending:
 *   get:
 *     summary: View Pending Adoption Approvals
 *     description: Retrieves a list of all adoption requests pending approval.
 *     responses:
 *       200:
 *         description: Returns a list of adoption requests pending approval.
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

router.get("/pending", async (req, res) => {
  try {
    const adoptionRequestList = await prisma.adoptionRequest.findMany({
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            dogName: true,
            dogPhotoURL: true,
          },
        },
      },
      where: {
        requestApproved: null,
      },
    });
    res.json({ adoptionRequests: adoptionRequestList });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Rejected view

router.get("/rejected", async (req, res) => {
  try {
    const adoptionRequestListRejected = await prisma.adoptionRequest.findMany({
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            dogName: true,
            dogPhotoURL: true,
          },
        },
      },
      where: {
        requestApproved: false,
      },
    });
    res.json({ adoptionRequests: adoptionRequestListRejected });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Route to get all the requests, no matter the status

router.get("", async (req, res) => {
  try {
    const adoptionRequestList = await prisma.adoptionRequest.findMany({
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        dog: {
          select: {
            dogName: true,
            dogPhotoURL: true,
            dogBreed: true,
            dogAge: true,
            dogBreed: true,
          },
        },
      },
    });
    res.json({ adoptionRequests: adoptionRequestList });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
