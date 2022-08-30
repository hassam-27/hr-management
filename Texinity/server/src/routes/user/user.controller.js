import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../../model/user.js'


// Log In
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
  
      if (!existingUser)
        return res.status(404).json({ message: "User doesn't exist." });
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid Password" });
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.SECRET
      );
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong." });
    }
}


// Sign Up
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser)
        return res.status(400).json({ message: "User already exists." });
  
      const salt = await bcrypt.genSalt(10);
      

  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const result = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET
      );
      
      
      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
}


// add user

export const addUser = (req, res) =>
{
  const { name, email, cnic, address, phone, gender, image_url, role, domain } = req.body;
  console.log(name, email, cnic, address, phone, gender, image_url, role, domain)
  res.send("Reached")
}

export const delUser = (req, res) => 
{
  
}