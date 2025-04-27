import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verify;
      next();
    } catch (error) {
      return res.status(401).json({ message: "unauthorized token failed" });
    }
  } else {
    return res.status(401).json({ message: " Unauthorized" });
  }
};
