import "./App.css";
import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
          <Outlet />
          </div>
        </>
      ),
      children: [
        {
          path: "",
          element: <Home showAlert={showAlert} />,
        },
        {
          path: "login",
          element: <Login showAlert={showAlert} />,
        },
        {
          path: "signup",
          element: <Signup showAlert={showAlert} />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);

  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
