import { User } from '../models/users.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(404).json({
      msg: 'login first',
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};
