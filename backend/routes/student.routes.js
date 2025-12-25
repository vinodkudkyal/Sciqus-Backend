// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const role = require("../middleware/role");
// const controller = require("../controllers/student.controller");

// router.post("/", auth, role("admin"), controller.addStudent);
// router.get("/", auth, role("admin"), controller.getAllStudents);
// router.get("/course/:id", auth, controller.getStudentsByCourse);
// router.put("/:id", auth, role("admin"), controller.updateStudent);
// router.delete("/:id", auth, role("admin"), controller.deleteStudent);

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const controller = require("../controllers/student.controller");

// 👇 MUST be before "/:id"
router.get("/me", auth, controller.getMyProfile);

router.post("/", auth, role("admin"), controller.addStudent);
router.get("/", auth, role("admin"), controller.getAllStudents);
router.get("/course/:id", auth, controller.getStudentsByCourse);
router.put("/:id", auth, role("admin"), controller.updateStudent);
router.delete("/:id", auth, role("admin"), controller.deleteStudent);

module.exports = router;
