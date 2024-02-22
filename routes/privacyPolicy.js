const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /privacy-policy:
 *   get:
 *     summary: Privacy Policy page
 *     description: Renders the Privacy Policy page.
 *     responses:
 *       200:
 *         description: Returns the Privacy Policy page.
 *       500:
 *         description: Server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message.
 */

router.get("/", async (req, res) => {
  try {
    res.render("privacyPolicy", { user: req.user, title: "DoggyRescue" });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
