import React, { useEffect, useState } from "react";
import axios from "axios";


function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <h2>Student List</h2>

      {students.map((s, index) => (
        <div className="student-card" key={index}>
          <h3>{s.name}</h3>
          <p>Age: {s.age}</p>
          <p>Course: {s.course}</p>

          <img
            src={`data:image/jpeg;base64,${s.image}`}
            alt="student"
            width="150"
          />
        </div>
      ))}
      </div>
    
  );
}

export default StudentList;
