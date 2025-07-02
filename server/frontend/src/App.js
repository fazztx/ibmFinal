import LoginPanel from "./components/Login/Login"
import Registration from "./components/Register/Register"
import Dealers from "./components/Dealers/Dealers"
import Dealer from "./components/Dealers/Dealer"
import PostReview from "./components/Dealers/PostReview"

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Registration />} />
      {/* <Route path="/register/" element={<Registration />} /> */}

      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />

      <Route path="/postreview/:id" element={<PostReview/>} />


      <Route path="*" element={<h1>Route not found</h1>} />
    </Routes>
  );
}
export default App;
