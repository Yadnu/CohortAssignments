const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const User =require("../db/index");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await User.find();
    res.json(
        {
            courses: response
        }
    )

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne(
        {username: username},
        {
            purchasedCourses: {
                  "$push": courseId
            }
        }
    )
    res.json({
        msg:"Course purchased"
    })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username: username
    });
    const courses = await User.Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({
        coursesList: courses
    })
});

module.exports = router