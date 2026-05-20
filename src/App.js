import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import "./App.css";

import Login from "./Login";
import Register from "./Register"; // add this
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";



// Admin Dashboard
function AdminDashboard() {

  return (

    <div>

      <h1>Teacher Dashboard</h1>

      <nav>

        <Link to="/admin/add">
          Add Student
        </Link>

        {" | "}

        <Link to="/admin/list">
          View Students
        </Link>

        {" | "}

        <button
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
        >
          Logout
        </button>

      </nav>

      <Routes>

        <Route
          path="add"
          element={<StudentForm />}
        />

        <Route
          path="list"
          element={<StudentList />}
        />

      </Routes>

    </div>

  )

}



// Student Dashboard
function StudentDashboard() {

  return (

    <div>

      <h1>Student Dashboard</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location = "/";
        }}
      >
        Logout
      </button>

      <StudentList />

    </div>

  )

}



// Protected Route
function ProtectedRoute({
  children,
  role
}) {

  const userRole =
    localStorage.getItem("role");

  return userRole === role
    ? children
    : <Navigate to="/" />

}



function App() {

  return (

    <Router>

      <div className="App">

        <Routes>

          {/* Login */}

          <Route
            path="/"
            element={<Login />}
          />


          {/* Register */}

          <Route
            path="/register"
            element={<Register />}
          />


          {/* Admin */}

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          {/* Student */}

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </Router>

  )

}

export default App;