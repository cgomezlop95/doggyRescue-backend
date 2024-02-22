const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /about:
 *   get:
 *     summary: About page
 *     description: Renders the about page.
 *     responses:
 *       200:
 *         description: Returns the about page.
 */

router.get("/", async (req, res) => {
  try {
    res.render("about", { user: req.user, title: "DoggyRescue" });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
