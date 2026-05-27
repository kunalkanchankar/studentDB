import {
BrowserRouter as Router,
Routes,
Route,
Link,
Navigate,
Outlet
} from "react-router-dom";

import "./App.css";

import Login from "./Login";
import Register from "./Register";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

import Attendance from "./Attendance";
import AttendanceReport from "./AttendanceReport";



// Admin Dashboard

function AdminDashboard(){

return(

<div>

<h1>Teacher Dashboard</h1>

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

<hr/>

<Outlet/>

</div>

)

}



// Student Dashboard

function StudentDashboard(){

return(

<div>

<h1>Student Dashboard</h1>

<button
onClick={()=>{

localStorage.clear();

window.location="/";

}}
>

Logout

</button>

<StudentList/>

</div>

)

}



// Protected Route

function ProtectedRoute({
children,
role
}){

const userRole=
localStorage.getItem("role");

return userRole===role
? children
: <Navigate to="/"/>

}



function App(){

return(

<Router>

<div className="App">

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>


<Route
path="/admin"
element={
<ProtectedRoute role="admin">
<AdminDashboard/>
</ProtectedRoute>
}
>

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

</Route>


<Route
path="/student"
element={
<ProtectedRoute role="student">
<StudentDashboard/>
</ProtectedRoute>
}
/>

<Route
path="*"
element={<Navigate to="/"/>}
/>

</Routes>

</div>

</Router> 

)

}

export default App;