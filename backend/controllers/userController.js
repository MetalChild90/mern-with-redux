import asyncHandler from 'express-async-handler';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please incluse all fields');
  }

  //Find if user exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('This email is already in use');
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  //Generate token
  const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  };

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error('Invalid user data');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //Check if user and password match
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.token,
    });
  } else {
    res.status(401);
    throw new error('Invalid data');
  }
});

export const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});
