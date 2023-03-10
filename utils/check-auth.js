import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");
      console.log(decoded);
      req.userId = decoded._id;
    } catch (err) {
      return res.status(404).json({
        message: "Не має доступу",
      });
    }
    next();
  } else {
    return res.status(403).json({
      message: "No token",
    });
  }
};
