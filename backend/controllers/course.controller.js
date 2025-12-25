const db = require("../config/db");

exports.createCourse = (req, res) => {
  const { course_name, course_code, course_duration } = req.body;

  db.query(
    "INSERT INTO courses VALUES (NULL, ?, ?, ?)",
    [course_name, course_code, course_duration],
    err => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Course created" });
    }
  );
};

exports.getCourses = (req, res) => {
  db.query("SELECT * FROM courses", (err, data) => {
    res.json(data);
  });
};
