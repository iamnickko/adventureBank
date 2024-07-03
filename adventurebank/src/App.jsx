import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkForCookie } from "./utils/auth.services";

import Admin from "./pages/Admin";
import Adventures from "./pages/Adventures";
import Auth from "./pages/Auth";
import AdventureDetails from "./pages/AdventureDetails";
import Gear from "./pages/Gear";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [hasCookie, setHasCookie] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
        <Route path="/" element={<Home hasCookie={hasCookie} />} />
        <Route
          path="/auth"
          element={
            hasCookie ? (
              <Navigate to="/" />
            ) : (
              <Auth setHasCookie={setHasCookie} setIsAdmin={setIsAdmin} />
            )
          }
        />
        <Route
          path="/admin"
          element={isAdmin ? <Admin isAdmin={isAdmin} /> : <Navigate to="/" />}
        />
        <Route
          path="/adventures"
          element={
            hasCookie ? (
              <Adventures hasCookie={hasCookie} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/adventures/:id"
          element={hasCookie ? <AdventureDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/gear"
          element={
            hasCookie ? <Gear hasCookie={hasCookie} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
