import {Link,Routes,Route} from "react-router-dom";

import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import Attendance from "./Attendance";
import AttendanceReport from "./AttendanceReport";


function Admin(){

return(

<div>

<h1>Teacher Dashboard1</h1>

<nav>

<Link to="/admin/add">
Add Student
</Link>

{" | "}

<Link to="/admin/list">
Student List
</Link>

{" | "}

<Link to="/admin/attendance">
Attendance
</Link>

{" | "}

<Link to="/admin/report">
Attendance Report
</Link>

{" | "}

<button
onClick={()=>{
localStorage.clear();
window.location="/";
}}
>
Logout
</button>

</nav>


<Routes>

<Route
path="add"
element={<StudentForm/>}
/>

<Route
path="list"
element={<StudentList/>}
/>

<Route
path="attendance"
element={<Attendance/>}
/>

<Route
path="report"
element={<AttendanceReport/>}
/>

</Routes>

</div>

)

}

export default Admin;