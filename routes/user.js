const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details for a specific user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns details for the specified user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error. Unable to retrieve user details.
 */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.json({
      userById: userById,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        userPhotoURL: req.body.userPhotoURL,
      },
    });
    res.json("Success");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
