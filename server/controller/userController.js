

import User from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

// const hashPassword = (password) => bcrypt.hash(password, 10)
// const findUserByEmail = async (email) =>
//   await User.findOne({email})


export const signInUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedData = await newUser.save();

    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const logInUser = async (req, res) => {
       const { email, password } = req.body;
       try{
              const user = await User.findOne({ email });
       if (!user) return res.status(400).json({ message: "You may entered the wrong email" });
       const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "You entered the password wrong" });
        const token = jwt.sign({ id: user._id, email:user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
       return res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email, name: user.name, token } });

       } catch(err){
       res.status(500).json({ errorMessage: err.message });

       }
}


export const getAllUsers = async (req, res) => {

       try{
              const userData = await User.find();
              if(!userData || userData.length === 0){
                     return res.status(404).json({message: "User data not found"})
              }
              res.status(200).json(userData)
       }
       catch(err){
              res.status(500).json({errorMessage:err.message})     

       }
}

export const getUserById = async (req, res) => {
              try{
                     const id = req.params.id
                     const userExist = await User.findById(id)
                     if(!userExist){
                           return res.status(404).json({message: "User by id not found"})

                     }
                     res.status(200).json(userExist)
              }catch(err){
                     res.status(500).json({errorMessage:err.message})     
              }
}

export const update = async (req, res) => {

       try{
               const id = req.params.id
                     const userExist = await User.findById(id)
                     if(!userExist){
                           return res.status(404).json({message: "User by id not found"})

                     }
                    const updatedData = await User.findByIdAndUpdate(id, req.body, {
                            new: true
                     })
                     res.status(200).json(updatedData)

       }catch(err){
              res.status(500).json({errorMessage:err.message})     

       }
}

export const deleteUser = async (req, res) => {


       try{
               const id = req.params.id
                     const userExist = await User.findById(id)
                     if(!userExist){
                           return res.status(404).json({message: "User by id not found"})

                     }
                     const deletedData = await User.findByIdAndDelete(id, req.body, {
                            new: true
                     })
                     res.status(200).json(deletedData)


       }catch(err){
              res.status(500).json({errorMessage:err.message})     

       }
}

// export const signInUser = async (req, res) => {
//        const newUser = new User(req.body);
//        const { email, password } = newUser
//        const existingUser = await findUserByEmail(email)
//        if (existingUser) return res.status(400).json({message: "Email already exists"})
//        try {
//     const hashedPassword = await hashPassword(password)
//     const newUser = new User({ name, email, password: hashedPassword });
//        await newUser.save();
//        return res.status(200).json({ message: "User Made successfully" });

//   } catch (error) {
//        res.status(500).json({errorMessage:err.message})     
//   }

// } 







