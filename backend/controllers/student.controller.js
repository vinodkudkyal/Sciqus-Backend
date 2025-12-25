const db = require("../config/db");
const bcrypt = require("bcryptjs");

// exports.addStudent = async (req, res) => {
//   const { name, email, password, course_id } = req.body;
//   const hash = await bcrypt.hash(password, 10);

//   db.query(
//     "SELECT * FROM courses WHERE course_id = ?",
//     [course_id],
//     (err, course) => {
//       if (course.length === 0)
//         return res.status(400).json({ message: "Course not found" });

//       db.query(
//         "INSERT INTO students (student_name, email, password, role, course_id) VALUES (?, ?, ?, 'student', ?)",
//         [name, email, hash, course_id],
//         () => res.json({ message: "Student added" })
//       );
//     }
//   );
// };

exports.addStudent = async (req, res) => {
  const { student_name, email, password, course_id } = req.body; // ✅ FIX
  const hash = await bcrypt.hash(password, 10);

  if (!student_name || !email || !password || !course_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM courses WHERE course_id = ?",
    [course_id],
    (err, course) => {
      if (course.length === 0)
        return res.status(400).json({ message: "Course not found" });

      db.query(
        "INSERT INTO students (student_name, email, password, role, course_id) VALUES (?, ?, ?, 'student', ?)",
        [student_name, email, hash, course_id],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "DB insert failed" });
          }
          res.json({ message: "Student added successfully" });
        }
      );
    }
  );
};




exports.getAllStudents = (req, res) => {
  db.query(
    `SELECT s.student_id, s.student_name, s.email,
            c.course_name, c.course_code
     FROM students s
     LEFT JOIN courses c ON s.course_id = c.course_id`,
    (err, data) => res.json(data)
  );
};

exports.getStudentsByCourse = (req, res) => {
  db.query(
    "SELECT * FROM students WHERE course_id = ?",
    [req.params.id],
    (err, data) => res.json(data)
  );
};

exports.updateStudent = (req, res) => {
  db.query(
    "UPDATE students SET course_id=? WHERE student_id=?",
    [req.body.course_id, req.params.id],
    () => res.json({ message: "Student updated" })
  );
};

exports.deleteStudent = (req, res) => {
  db.query(
    "DELETE FROM students WHERE student_id=?",
    [req.params.id],
    () => res.json({ message: "Student deleted" })
  );
};

exports.getMyProfile = (req, res) => {
  const studentId = req.user.id;

  db.query(
    `SELECT s.student_id, s.student_name, s.email, s.role,
            c.course_name, c.course_code, c.course_duration
     FROM students s
     LEFT JOIN courses c ON s.course_id = c.course_id
     WHERE s.student_id = ?`,
    [studentId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data[0]);
    }
  );
};


//  $2b$10$ybfAHnA.uLscuKVstHSZ7.hGBOHcu57BTZNFQkja4rlQPOLkkqKYW

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY2NjkxODcxLCJleHAiOjE3NjY3NzgyNzF9.FfuogbTu566aBwSGgzZPXIT6Ry0OEFypKupGMx7pVTE"
// }

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NjY2OTQ0MjYsImV4cCI6MTc2Njc4MDgyNn0.CSGiIGFCUmuXK6XrdEef8rT1bKkxTbFzStwz7Kh4wn8"
// }