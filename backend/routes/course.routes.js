const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const controller = require("../controllers/course.controller");

router.post("/", auth, role("admin"), controller.createCourse);
router.get("/", auth, controller.getCourses);

module.exports = router;
