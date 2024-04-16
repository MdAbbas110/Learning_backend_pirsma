import { User } from '../models/users.js';
import bcrypt from 'bcrypt';

import { sendCookies } from '../utils/features.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.status(404).json({
        success: 'fail',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userProfile = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookies(userProfile, res, 'Registered Successfully', 200);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(404).json({
        msg: 'Invalid Email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({
        success: false,
        msg: 'Invalid Email or password',
      });
    }

    sendCookies(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    msg: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      expire: new Date(Date.now()),
    })
    .json({
      msg: 'logout',
    });
};
