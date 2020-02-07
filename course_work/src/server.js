require('dotenv').config()
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs"; // encrypt pass 
import { mongoURL } from '../config'
import bcryptSaltRounds from '../config'

import User from './models/users';
import Courses from './models/course';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
// connection test
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected....!"));

const userController = {
  create: async (req, res, next) => {
    try {
      const { SALT_ROUNDS } = bcryptSaltRounds.bcrypt;
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

      const checkUser = await User.findOne({ email: req.body.email });
      if (!checkUser) {
        const data = await User.create(req.body);
        if (!data) throw new Error('Something went wrong...!')
        return res.send({ status: true, msg: "User created successfully", data });
      }
      throw new Error('User Already Exists...!')
    } catch (err) {
      return res.send({ status: false, msg: err.message });
    }
  },
  getAll: (req, res, next) => {
    User.find((err, docs) => {
      if (err) next(err);
      else res.send(docs);
    });
  },
  authenticate: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.send({ status: false, msg: "Email or Password is not correct" });
      const checkUser = await bcrypt.compare(req.body.password, user.password);

      if (checkUser) return res.send({ status: true, msg: "User Authenticated Successfully", data: user });
      else return res.send({ status: false, msg: "Email or Password is Incorrect" });

    } catch (err) {
      return res.send({ status: false, msg: err.message });
    }
  }
}

const coursesControllers = {
  getAllCourses: async (req, res, next) => {
    const allCourses = await Courses.find({}).populate({ path: 'author', model: User, select: 'email' })
    const courses = []
    for (const course of allCourses) {
      courses.push({
        name: { Topic: course.topic },
        Location: course.location,
        price: course.price,
        time: course.time,
        rating: course.rating,
        author: course.author && course.author.email
      })
    }
    return res.send(courses)
  },
  getAllCoursesByAuthor: async (req, res, next) => {
    return res.send(await Courses.find({ author: req.params.id }))
  },
  createCourse: async (req, res, next) => {
    try {
      const data = await Courses.create(req.body)
      if (data) return res.send({ status: false, msg: "Course Created Successfully", data })
      throw new Error("Something went wrong, course cannot be created...!")
    } catch (error) {
      res.send({ status: false, msg: error.message })
    }
  },
}

const userRouter = express.Router();
userRouter.route("/").get(userController.getAll).post(userController.create);
userRouter.route("/authenticate").post(userController.authenticate);

const coursesRouter = express.Router()
coursesRouter.route('/').post(coursesControllers.createCourse).get(coursesControllers.getAllCourses);
coursesRouter.route('/get-courses-by-author/:id').get(coursesControllers.getAllCoursesByAuthor);

routing();

//--------ROUTING---------//
function routing() {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/courses", coursesRouter);
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on port ::", PORT);
});
