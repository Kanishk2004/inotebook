const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // checking for the values from req.body
  if (!name || !email || !password) {
    return res.json({
      error: "Name, email and password is required!",
    });
  }

  try {
    // checking if the user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        error: `Can't signup, user with this email already exists!`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name,
      email,
      password: securedPass,
    });

    // var token = jwt.sign(user, 'shhhhh');

    res.status(200).json({
      success: true,
      message: "User signed up successfully!",
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checking if the user already exists
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        error: `Can't login, credentials doesn't match!`,
      });
    }

    // comparing user entered password with password in db
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        error: `Can't login, credentials doesn't match!`,
      });
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_EXPIRY });
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};


exports.getLoggedInUser = async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}