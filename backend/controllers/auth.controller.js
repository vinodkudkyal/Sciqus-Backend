const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM students WHERE email = ?",
    [email],
    async (err, users) => {
      if (users.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = users[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: user.student_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
};
