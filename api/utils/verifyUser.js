import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, "jwtsecretkey", (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};
