import { User } from '../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) return res.status(404).send('your already created');

    const hashedPassword = bcrypt.hash(password, 10);

    const userProfile = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const jwtToken = jwt.sign({ _id: userProfile._id }, process.env.JWT_SECRET);

    res
      .status(201)
      .cookie('token', {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: 'user created',
      });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {};

export const getAllUser = async () => {};
