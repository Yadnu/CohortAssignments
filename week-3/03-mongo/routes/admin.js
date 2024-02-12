const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { User, Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password
    })
    .then(
        res.json({
            msg: "Admin created Successfully"
        })
    )
    .catch(
        res.status(500).json({
            msg:"Server Error"
        }
    )
       )
    

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    const newCourse = await Course.create(
        {
            title,
            description,
            imageLink,
            price
        }
    )
        res.json(
            {
                message: "Course created successfull",
                courseId : newCourse._id
            }
        )

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;