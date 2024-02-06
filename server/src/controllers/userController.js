const bcrypt = require("bcrypt");
const axios = require("axios");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "The user already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ userId: newUser._id, message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      res.json({ userId: user._id, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Incorrect credentials" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.addFavoriteCharacter = async (req, res) => {
  try {
    const { userId, favoriteId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }

    if (!user.favoritesIds.includes(favoriteId.toString())) {
      user.favoritesIds.push(favoriteId);
    }

    await user.save();

    res.json({
      message: "Character marked as favorite",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getAllCharacters = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    const externalCharactersApiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    const response = await axios.get(externalCharactersApiUrl);
    const externalData = response.data;

    res.json(externalData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json({ data: user.favoritesIds });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
