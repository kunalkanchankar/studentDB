const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Attendance= require("./models/Attendance");

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";


// MongoDB Connection

mongoose.connect(
    "mongodb://127.0.0.1:27017/studentDB"
)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// Multer setup

const storage = multer.memoryStorage();

const upload = multer({
    storage
});



// USER SCHEMA

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student"
    }

});

const User =
    mongoose.model(
        "User",
        UserSchema
    );



// REGISTER API

app.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400)
                .json({
                    message: "Email already exists"
                });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            new User({

                name,
                email,
                password: hashedPassword,
                role

            });

        await user.save();

        res.json({
            message: "User Registered"
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});



// LOGIN API

app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404)
                .json({
                    message: "User not found"
                });

        }

        const valid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!valid) {

            return res.status(401)
                .json({
                    message: "Wrong password"
                });

        }


        const token =
            jwt.sign(

                {
                    id: user._id,
                    role: user.role
                },

                SECRET

            );


        res.json({

            token,
            role: user.role,
            name: user.name

        });

    }
    catch (err) {

        console.log(err);

        res.status(500)
            .json(err);

    }

});



// ADD STUDENT

app.post(
    "/add-student",
    upload.single("photo"),
    async (req, res) => {

        try {

            const base64 =
                req.file.buffer
                    .toString("base64");


            const student =
                new Student({

                    name: req.body.name,
                    age: req.body.age,
                    course: req.body.course,
                    image: base64

                });

            await student.save();

            res.json({

                success: true,
                message: "Student added"

            });

        }
        catch (err) {

            console.log(err);

            res.status(500)
                .json(err);

        }

    });




// GET STUDENTS

app.get(
    "/students",
    async (req, res) => {

        try {

            const students =
                await Student.find();

            res.json(students);

        }
        catch (err) {

            res.status(500)
                .json(err);

        }

    });




// UPDATE

app.put(
    "/updateStudent/:id",
    async (req, res) => {

        try {

            const updated =
                await Student.findByIdAndUpdate(

                    req.params.id,
                    req.body,
                    { new: true }

                );

            res.json(updated);

        }
        catch (err) {

            res.status(500)
                .json(err);

        }

    });




// DELETE

app.delete(
    "/deleteStudent/:id",
    async (req, res) => {

        try {

            await Student.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message: "Deleted successfully"
            });

        }
        catch (err) {

            res.status(500)
                .json(err);

        }

    });



app.listen(
    5000,
    () => {
        console.log(
            "Server running on port 5000"
        );
    }
);


app.post("/markAttendance",async(req,res)=>{

try{

const attendance=
new Attendance(req.body);

await attendance.save();

res.json({
message:"Attendance marked"
});

}
catch(err){

res.status(500)
.json(err);
}

});


app.get(
"/attendance-report",
async(req,res)=>{

try{

const data=
await Attendance.find();

res.json(data);

}
catch(err){

res.status(500)
.json(err);
}

});