import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkForCookie } from "./utils/auth.services";

import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Home from "./pages/Home";
import Adventures from "./pages/Adventures";
import Gear from "./pages/Gear";

function App() {
  const [hasCookie, setHasCookie] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (checkForCookie()) {
      setHasCookie(true);
    }
  }, []);

  return (
    <>
      <Header
        hasCookie={hasCookie}
        setHasCookie={setHasCookie}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            hasCookie ? (
              <Navigate to="/" />
            ) : (
              <Auth setHasCookie={setHasCookie} />
            )
          }
        />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/" />}
        />
        <Route
          path="/adventures"
          element={<Adventures hasCookie={hasCookie} />}
        />
        <Route path="/gear" element={<Gear hasCookie={hasCookie} />} />
      </Routes>
    </>
  );
}

export default App;
