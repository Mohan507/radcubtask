import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./components/ContactPage";
import AdminDashboard from "./components/AdminDashboard";
// import Contactus from "./components/Contactus";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactPage />} />
          {/* <Route path="/" element={<Contactus/>} /> */}
        <Route path="/dashboardpage" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;