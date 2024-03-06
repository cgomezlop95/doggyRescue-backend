const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /adoption-request/{id}:
 *   get:
 *     summary: View Single Adoption Request
 *     description: Retrieves information about a specific adoption request.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the adoption request (userId_dogId).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns information about the specified adoption request.
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
 *                     isAdmin:
 *                       type: boolean
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
    res.json({ adoptionRequest: singleAdoptionRequest });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

/**
 * @swagger
 * /adoption-request/approve/{id}:
 *   put:
 *     summary: Approve Adoption Request
 *     description: Approves a specific adoption request and marks the dog as adopted.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the adoption request (userId_dogId).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Adoption request approved successfully.
 *       400:
 *         description: Bad request or server error.
 *       302:
 *         description: Admin is redirected to the pending adoption request view
 */

router.put("/approve/:id", async (req, res) => {
  const { id } = req.params;
  const [userId, dogId] = id.split("_"); // Assuming the format is userId_dogId
  try {
    await prisma.adoptionRequest.update({
      where: {
        userId_dogId: {
          userId: userId,
          dogId: dogId,
        },
      },
      data: {
        requestApproved: true,
      },
    });
    await prisma.dog.update({
      where: {
        id: dogId,
      },
      data: {
        dogAdopted: true,
      },
    });
    // res.redirect("/adoption-requests/pending");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

/**
 * @swagger
 * /deny/{id}:
 *   put:
 *     summary: Deny Adoption Request
 *     description: Denies a pending adoption request.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the adoption request (userId_dogId).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adoption request denied successfully.
 *       302:
 *         description: Redirect to /adoption-requests/pending
 *       500:
 *         description: Server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message.
 */

router.put("/deny/:id", async (req, res) => {
  const { id } = req.params;
  const [userId, dogId] = id.split("_"); // Assuming the format is userId_dogId
  try {
    await prisma.adoptionRequest.update({
      where: {
        userId_dogId: {
          userId: userId,
          dogId: dogId,
        },
      },
      data: {
        requestApproved: false,
      },
    });
    // res.redirect("/adoption-requests/pending");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
