const User = require("../models/User");

function login(req, res) {
  console.log("received login req: ", req.body);
  const { username, password } = req.body;
  User.get(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.verifyPassword(password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Authentication successful
    res.json({
      message: "Login successful",
      user: { username: user.username },
    });
  });
}

function registerUser(req, res) {
  console.log("Creating new user...");
  const { username, password, displayName } = req.body;
  const newUser = new User(username, password, displayName);
  newUser.save((err, userId) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error saving user ", error: err.message });
    }
    return res
      .status(200)
      .json({ message: "User successfully registered", userId: userId });
  });
}

module.exports = {
  login,
  registerUser,
};
