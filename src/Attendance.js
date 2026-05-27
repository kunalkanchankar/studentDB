import React,
{
useEffect,
useState
}
from "react";

import axios from "axios";

function Attendance(){

const [students,setStudents]=
useState([]);

const [attendance,setAttendance]=
useState({});


useEffect(()=>{

fetchStudents();

},[]);


const fetchStudents=
async()=>{

const res=
await axios.get(
"http://localhost:5000/students"
);

setStudents(res.data);

};


const markAttendance=
(id,status,name,course)=>{

setAttendance({

...attendance,

[id]:{

studentId:id,
studentName:name,
course,
status

}

});

};


const submitAttendance=
async()=>{

const values=
Object.values(
attendance
);

for(let item of values){

await axios.post(

"http://localhost:5000/markAttendance",

item

);

}

alert(
"Attendance Saved"
);

};


return(

<div className="attendance-container">

<h2>

Mark Attendance

</h2>


<table className="attendance-table">

<thead>

<tr>

<th>Name</th>

<th>Course</th>

<th>Status</th>

</tr>

</thead>


<tbody>

{

students.map((student)=>(

<tr key={student._id}>

<td>
{student.name}
</td>

<td>
{student.course}
</td>

<td>

<button

className="present-btn"

onClick={()=>markAttendance(

student._id,
"Present",
student.name,
student.course

)}
>

Present

</button>


<button

className="absent-btn"

onClick={()=>markAttendance(

student._id,
"Absent",
student.name,
student.course

)}
>

Absent

</button>

</td>

</tr>

))

}

</tbody>

</table>


<button

className="save-btn"

onClick={submitAttendance}

>

Save Attendance

</button>

</div>

)
}

export default Attendance;