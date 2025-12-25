DELIMITER $$

CREATE PROCEDURE add_student_proc(
  IN s_name VARCHAR(100),
  IN s_email VARCHAR(100),
  IN s_password VARCHAR(255),
  IN s_course_id INT
)
BEGIN
  INSERT INTO students(name,email,password,course_id)
  VALUES (s_name, s_email, s_password, s_course_id);
END$$

CREATE PROCEDURE update_student_course_proc(
  IN s_id INT,
  IN new_course_id INT
)
BEGIN
  UPDATE students SET course_id = new_course_id WHERE student_id = s_id;
END$$

DELIMITER ;
