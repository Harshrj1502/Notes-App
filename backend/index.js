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
import express, { json } from "express";
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
// logincount
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
// add note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    console.log(user);
    console.log(user._id);

    if (!title) {
        return res.status(400).json({ error: true, message: "title is required" })
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "content is required" })
    }
    try {
        const note = new Note({
            title, content,
            tags: tags || [],
            userId: "668e99a96eca1a2160a2592c",
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
            error: true,
            message: "internal server error"
        })
    }
})
// edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, tags, isPinned, content } = req.body;
    const { user } = req.user

    if (!title && !tags && !content) {
        return res
            .status(400)
            .json({ error: true, message: "no changes" })
    }
    try {
        const note = await Note.findOne({ _id: noteId, userId: "668e99a96eca1a2160a2592c", })


        if (!note) {
            res.status(404)
                .json({ error: true, message: "note not found" })
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (isPinned) note.isPinned = isPinned;
        if (tags) note.tags = tags;

        await note.save();
        return res.json({
            error: false,
            note, message: "updated successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "internal server error"
        })

    }
})
// get note 
app.get("/get-note/", authenticateToken, async(req, res) => {
    const { user } = req.user;
    console.log(user);
    console.log(user._id);
    try {
        const notes =  await Note.find({ userId: "668e99a96eca1a2160a2592c"}).sort({ isPinned: -1 })
        return res.json({
            error: false,
            notes, message: "all notes retrived succefully"
        })
    }
    catch (error) {
        return res.status(500)
        .json({
            error:true,message:"internal server error"
        })
    }
})
// delete note
app.delete("/delete-note/", authenticateToken, async(req, res) => {
    // const noteId=req.params.noteId;
    const noteId="66967885d870f19995837bb4";
    const { user } = req.user;
    console.log(user);
    console.log(user._id);
    console.log(noteId);
    try {
        const note =  await Note.find({_id:noteId, userId: "668e99a96eca1a2160a2592c"})
        if(!note){
            return res.status(404).json({
                error:true,
                message:"note not found"
            })
        }
        await Note.deleteOne({_id:noteId,userId:"668e99a96eca1a2160a2592c"})
        return res.json({
            error:false,
            message:"note deleted succefully"
        })

    }
    catch (error) {
        return res.status(500)
        .json({
            error:true,message:"internal server error"
        })
    }
})



app.listen(8000);