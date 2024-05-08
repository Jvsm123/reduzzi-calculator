import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NotFound, ResultPage } from "../pages";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index path="/" element={<Home />} />
        <Route index path="/res" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;