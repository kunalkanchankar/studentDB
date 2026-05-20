import React, { useState } from "react";
import axios from "axios";

function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    course: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("age", student.age);
    formData.append("course", student.course);
    formData.append("photo", file);

    await axios.post("http://localhost:5000/add-student", formData);

    alert("Student Added!");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="course"
          placeholder="Course"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input type="file" onChange={handleFileChange} required />
        <br /><br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default StudentForm;
