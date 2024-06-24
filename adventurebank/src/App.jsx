import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
