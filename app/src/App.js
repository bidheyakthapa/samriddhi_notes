import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import NavBar from "./components/NavBar";
import SignUp from "./pages/auth/SignUp";
import UserReq from "./pages/admin/UserReq";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import MyNotes from "./pages/teacher/MyNotes";
import Notes from "./pages/student/Notes";
import SingleNote from "./pages/student/SingleNote";
import { ProtectedRoute, Unauthorized } from "./context/protectedRoute";
import AddEditNote from "./pages/teacher/AddEditNote";

const DLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

const adminMenu = [
  { label: "User Requests", path: "/admin/userreq" },
  { label: "Students", path: "/admin/student" },
  { label: "Teachers", path: "/admin/teacher" },
];

const teacherMenu = [
  { label: "My Notes", path: "/teacher/note" },
  { label: "Add Note", path: "/teacher/addNote" },
];

const studentMenu = [{ label: "Notes", path: "/student/notes" }];

const router = createBrowserRouter([
  // Default route
  {
    path: "/",
    element: <DLayout />, // Wrap with a default layout for login/signup
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />, // Redirect to login by default
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  // Admin routes
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} menuItems={adminMenu} />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/userreq" replace />,
      },
      {
        path: "userreq",
        element: <UserReq />,
      },
      {
        path: "teacher",
        element: <Teachers />,
      },
      {
        path: "student",
        element: <Students />,
      },
    ],
  },
  // Teacher routes
  {
    path: "/teacher",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} menuItems={teacherMenu} />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/teacher/note" replace />,
      },
      {
        path: "note",
        element: <MyNotes />,
      },
      {
        path: "addNote",
        element: <AddEditNote />,
      },
      {
        path: "editNote/:noteId",
        element: <AddEditNote />,
      },
    ],
  },
  // Student routes
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]} menuItems={studentMenu} />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/student/notes" replace />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "note/:id",
        element: <SingleNote />,
      },
    ],
  },
  // Unauthorized route
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
