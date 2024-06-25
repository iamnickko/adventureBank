import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkForCookie } from "./utils/auth.services";

import Auth from "./pages/Auth";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    if (checkForCookie()) {
      setHasCookie(true);
    }
  }, []);

  return (
    <>
      <Header hasCookie={hasCookie} setHasCookie={setHasCookie} />
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
      </Routes>
    </>
  );
}

export default App;
