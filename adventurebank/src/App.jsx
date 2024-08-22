import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkForCookie } from "./utils/auth.services";

import Admin from "./pages/Admin";
import Adventures from "./pages/Adventures";
import Auth from "./pages/Auth";
import AdventureDetails from "./pages/AdventureDetails";
import Gear from "./pages/Gear";
import { getAllAdventures } from "./utils/adventure.services";
import { getAllGear } from "./utils/gear.services";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [hasCookie, setHasCookie] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allGear, setAllGear] = useState([]);
  const [allAdventures, setAllAdventures] = useState([]);

  const fetchAllAdventures = async () => {
    const data = await getAllAdventures();
    setAllAdventures(data);
    // setIsLoading(false);
  };

  const fetchAllGear = async () => {
    const data = await getAllGear();
    setAllGear(data);
    // setIsLoading(false);
  };

  useEffect(() => {
    if (checkForCookie()) {
      setHasCookie(true);
      fetchAllAdventures();
      fetchAllGear();
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
              <Adventures
                allAdventures={allAdventures}
                allGear={allGear}
                fetchAllAdventures={fetchAllAdventures}
                fetchAllGear={fetchAllGear}
              />
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
            hasCookie ? (
              <Gear allGear={allGear} fetchAllGear={fetchAllGear} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
