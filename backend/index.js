import mongoose from "mongoose";
mongoose
    .connect("mongodb://localhost:27017", {
        dbName: "userlogin",
    }).then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    })
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import authenticateToken from "./utilities.js";
import User from "./models/user.models.js"
import Note from "./models/note.models.js"

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json())

app.use(
    cors({
        origin: "*",
    })
)
app.get("/", (req, res) => {
    res.json({ data: "hello" })
});

// create account 
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full Name is required" })
    }
    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "email is required" })
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "password is required" })
    }

    const isUser = await User.findOne({ email: email });
    if (isUser) {
        return res.json({
            error: true,
            message: "User already exist"
        })
    }

    const user = new User({
        fullName, email, password,
    })
    await user.save();
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    })
    return res.json({
        error: false,
        user,
        accessToken,
        message: "successful"
    });
})

// login account
app.post("/login-account", async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "email is required" })
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "password is required" })
    }

    const UserInfo = await User.findOne({ email: email });
    if (!UserInfo) {
        return res.json({
            error: true,
            message: "User do notexist"
        })
    }
    if (UserInfo.email == email && UserInfo.password == password) {
        const user = { user: UserInfo }
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        })
        return res.json({
            error: false,

            email, accessToken,
            message: "login successfuly",

        })
    } else {
        return res
            .status(400)
            .json({
                error: true,
                message: "password is required"
            })
    }
})
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ eroor: true, message: "title is required" })
    }
    if (!content) {
        return res.status(400).json({ eroor: true, message: "content is required" })
    }
    try {
        const note = new Note({
            title, content,
            tags: tags || [],
            userId: user._Id
        });
        await note.save();
        return res.json({
            error: false,
            note,
            message: "note added succcesfull",
        })
    }
    catch (error) {
        return res.status(500).json({
            eroor: true,
            message: "internal server error"
        })
    }
})

app.put("/edit-note:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        res.status(400)
            .json({
                error: true,
                message: "no info privided"
            })
    }
    try {
        const note = await Note.findOne({ _id: noteId, userId: ServiceWorker._id })
    } catch {

    }
})


app.listen(8000);