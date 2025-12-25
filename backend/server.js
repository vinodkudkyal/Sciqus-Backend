const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/courses", require("./routes/course.routes"));
app.use("/students", require("./routes/student.routes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
