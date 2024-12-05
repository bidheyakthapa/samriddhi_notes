import {
  createBrowserRouter,
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import NavBar from "./components/NavBar";
import SignUp from "./pages/auth/SignUp";
import UserReq from "./pages/admin/UserReq";
import Sidebar from "./components/Sidebar";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import MyNotes from "./pages/teacher/MyNotes";
import Notes from "./pages/student/Notes";
import AddNote from "./pages/teacher/AddNote";

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

const Layout = ({ menuItems }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar items={menuItems} style={{ flex: "0" }} />

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          padding: "0 20px",
          marginLeft: "250px",
        }}
      >
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
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
  {
    path: "/admin",
    element: <Layout menuItems={adminMenu} />,
    children: [
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
  {
    path: "/teacher",
    element: <Layout menuItems={teacherMenu} />,
    children: [
      {
        path: "note",
        element: <MyNotes />,
      },
      {
        path: "addNote",
        element: <AddNote />,
      },
    ],
  },
  {
    path: "/student",
    element: <Layout menuItems={studentMenu} />,
    children: [
      {
        path: "notes",
        element: <Notes />,
      },
    ],
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
