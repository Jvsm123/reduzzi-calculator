import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NotFound } from "../pages";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route index path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;