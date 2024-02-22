const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successful operation. Returns a list of users.
 *       500:
 *         description: Server error. Unable to retrieve users.
 */

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.render("users", { users: users, user: req.user, title: "DoggyRescue" });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

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
    res.render("userProfile", {
      userById: userById,
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
 * /users/{id}:
 *   put:
 *     summary: Grant admin rights to user
 *     description: Grant admin rights to a specific user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Admin rights granted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error. Unable to grant admin rights.
 */

router.put("/give-admin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin: true,
      },
    });
    res.redirect("/user");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.put("/remove-admin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin: false,
      },
    });
    res.redirect("/user");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
