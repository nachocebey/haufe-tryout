const express = require("express");
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

router.post(
  "/api/users",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  handleValidationErrors,
  userController.createUser
);

router.post(
  "/api/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleValidationErrors,
  userController.loginUser
);

router.post(
  "/api/users/:userId/:favoriteId",
  userController.addFavoriteCharacter
);

router.get("/api/characters/:id", userController.getCharacterById);

router.get("/api/characters/", userController.getAllCharacters);

router.get("/api/users", userController.getAllUsers);

router.get("/api/users/:userId/favorites", userController.getUserFavorites);

module.exports = router;
