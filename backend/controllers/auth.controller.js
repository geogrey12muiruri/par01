import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
      const { username, fullName, email, password, role } = req.body;
  
      // Validate email
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
      }
  
      // Check if username or email already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        username,
        fullName,
        email,
        password: hashedPassword,
        role, // Add role to the new user
      });
  
      // Save the user and generate token
      if (newUser) {
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({ 
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role, // Include role in the response
          followers: newUser.followers,
          following: newUser.following,
          profileimg: newUser.profileimg,
          coverimg: newUser.coverimg,
        });
      } else {
        return res.status(400).json({ message: "Invalid user credentials" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ message: error.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate token and set cookie
      generateTokenAndSetCookie(user._id, res);
  
      // Include role in the response
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        followers: user.followers,
        following: user.following,
        profileimg: user.profileimg,
        coverimg: user.coverimg,
        role: user.role, // Added role here
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  

export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({ message: "Logged out successfully" });
    } catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ message: error.message });
    }
}
export const forgotPassword = async (req, res) => {
    res.json({ data: 'you hit the forgot-password end point' });
}

export const resetPassword = async (req, res) => {
    res.json({ data: 'you hit the reset-password end point' });
}
