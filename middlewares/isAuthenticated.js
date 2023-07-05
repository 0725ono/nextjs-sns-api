const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  // ここはauth.tsxで記載した`Bearer ${token}`を半角の前と後ろで区切り、tokenを取得している
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "権限がありません。" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "権限がありません。" });
    }

    req.userId = decoded.id;

    next();
  });
}

module.exports = isAuthenticated;
