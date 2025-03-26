// const sessionIdtoUserMap =new Map();
const jwt = require("jsonwebtoken");
const secret = "Akshat@9090";

function setUser(user) {
  // sessionIdtoUserMap.set(id,user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  // return sessionIdtoUserMap.get(id);
  if (!token) return null;
  console.log("Received Token:", token);
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
