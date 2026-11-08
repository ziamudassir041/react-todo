import express from "express"
import userModel from "../../model/User.js"
import bcrypt from "bcrypt"
import tokenize from "../../utils/token.js"

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        let {name,  email, password, } = req.body;
        let checkIfExists = await userModel.findOne({email: email});
        if(checkIfExists) 
        {
            return res.status(400).json({message: "user  already exists"});
        }
        let newUser = {
            name,
            email,
            password: await bcrypt.hash(password, 10),
            
        };
        let response = await userModel.create(newUser);
        res.status(201).json({message: "user created successfully", response});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Internal Server Error",error: error.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        let {email, password} = req.body;
        let checkIfExists = await userModel.findOne({email: email});
        if(!checkIfExists)
        {
            return res.status(404).json({message: "user not found, please register"});
        }
        const passwordMatches = await bcrypt.compare(password, checkIfExists.password);
        if(!passwordMatches)
        {
            return res.status(400).json({message: "Incorrect credentials"});
        }
        let payload = {
            id: checkIfExists._id
        };
        let token = await tokenize(payload);
        res.status(200).json({message: "Logged in successfully", token});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Internal Server Error",error: error.message});
    }
})


export default router;