const express = require('express');
const UserModel = require('../models/UserModel');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRound = 2;
const sendMail = require("./nodemailer");
userRouter.post("/register", async (req, res) => {
    const payload = req.body;
    payload.verification = "Not-verified"
    try {
        const data = await UserModel.findOne({ email: payload.email });
        if (data) {
            res.json({ msg: "user already exists" });
        }
        else {
            bcrypt.hash(payload.password, saltRound, async (err, hashed) => {
                if (err) {
                    res.json({ msg: "Something went wrong on hashing", err });
                }
                else if (hashed) {
                    payload.password = hashed;
                    const user = new UserModel(payload);
                    await user.save();
                    let message = sendMail(payload.email, `dummyVerificationTokenSendByApp_${payload.email}`)
                    res.json({ msg: "user registered successfully", message });
                }
            })
        }
    } catch (error) {
        res.json({ msg: "Something went wrong while registering" });
    }
});

userRouter.post("/login", async (req, res) => {
    const payload = req.body;
    try {
        const data = await UserModel.findOne({ email: payload.email });
        if (data) {
            bcrypt.compare(payload.password, data.password, (err, result) => {
                if (err) {
                    res.json({ msg: "Something went wrong on comparing pass", err });
                }
                else if (result) {
                    jwt.sign({ userID: data._id }, "rajchatapp", (err, token) => {
                        if (err) {
                            res.json({ msg: "Something went wrong on token gen", err });
                        }
                        else if (token) {
                            res.json({ msg: "Login successful", token });
                        }
                        else if (!token) {
                            res.json({ msg: "Token generating failed" });
                        }
                    })
                }
            })
        }
        else {
            res.json({ msg: "user not exists" });
        }
    } catch (error) {
        res.json({ msg: "Something went wrong while registering" });
    }
});

userRouter.patch("/verify/:verifytoken", async (req, res) => {
    const verifytoken = req.params.verifytoken;
    const email = verifytoken.split("_")[1]
    if (verifytoken.split("_")[0] == "dummyVerificationTokenSendByApp") {
        const data = await UserModel.findOne({ email })
        data.verification = "verified";
        await UserModel.updateOne({ email }, data);
        res.json({ msg: "email verified" })
    }
})


module.exports = userRouter;