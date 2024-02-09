const bcrypt = require("bcrypt");
const axios = require("axios");
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
    res.json({ user: newUser, message: "User created successfully" });
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
      res.json({ user: user, message: "Login successful" });
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
    } else {
      const index = user.favoritesIds.indexOf(favoriteId.toString());
      if (index !== -1) {
        user.favoritesIds.splice(index, 1);
      }
    }

    await user.save();

    res.json({
      message: "Character favoreite list updated",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getAllCharacters = async (req, res) => {
  try {
    const authorizationHeader = req.headers.userid;
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing Authorization Header" });
    }

    const pageNumber = req.query.page || 1;
    const externalCharactersApiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    const response = await axios.get(externalCharactersApiUrl);
    const externalData = response.data;

    res.json({
      data: externalData.results,
      totalPages: externalData.info.pages,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getCharacterById = async (req, res) => {
  try {
    const characterId = req.params.id;

    const authorizationHeader = req.headers.userid;
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing Authorization Header" });
    }

    const user = await User.findById(authorizationHeader);

    const externalCharacterApiUrl = `https://rickandmortyapi.com/api/character/${characterId}`;
    const response = await axios.get(externalCharacterApiUrl);
    const characterData = {
      ...response.data,
      isFavorite: user.favoritesIds.includes(characterId),
    };

    res.json({
      data: characterData,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Character not found" });
    } else {
      res.status(500).json({ error: "Server error", details: error.message });
    }
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
