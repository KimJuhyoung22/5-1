import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./components/Pages/ListPage";
import DetailPage from "./components/Pages/DetailPage";
import UpdatePage from "./components/Pages/UpdatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
    </Routes>
  );
}

export default App;
