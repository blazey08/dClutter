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

function getUsers(req, res) {
  User.all((err, users) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting users ", error: err.message });
    }
    return res
      .status(200)
      .json({ message: "User list successfully retrieved", users: users });
  });
}

function getUser(req, res) {
  const { username } = req.params;
  User.get(username, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting user ", error: err.message });
    }
    return res
      .status(200)
      .json({ message: "User successfully retrieved", user: user });
  });
}

function registerUser(req, res) {
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

function deleteUser(req, res) {
  const { username } = req.params;
  User.delete(username, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting user", err: err.message });
    }
    return res
      .status(200)
      .json({ message: "Succesfully deleted user: " + username });
  });
}

module.exports = {
  login,
  getUsers,
  getUser,
  registerUser,
  deleteUser,
};
