import React from "react";
import SignIn from "./pages/SignIn";
import "./styles/main.scss";
import { Route, Routes } from "react-router-dom";
import Dates from "./pages/Dates";
import PrivateRoute from "./shared/PrivateRoute";
import useStartConfig from "./hooks/useStartConfig";

function App() {

  useStartConfig()
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dates />
            </PrivateRoute>
          }
        />
        <Route path="/sign" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
