const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  console.log("verify admin called");

  const token = req.headers.authorization;

  if (!token) {
    console.log('no token middleware');
    return res.status(401).json({ message: "No token" });
  }


  if (!token) {
    console.log(caughtErrMiddleware3);
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.username !== "admin") {
    console.log(caughtErrMiddleware2);
      return res.status(403).json({ message: "Not authorized" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log(caughtErrMiddleware);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;