import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ActiveSwaps from "./pages/ActiveSwaps.jsx";
import TechSupport from "./pages/TechSupport.jsx";
import PostGig from "./pages/PostGig.jsx";
import LoginPage from "./pages/LoginPage.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/Second-semester-project/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="swaps" element={<ActiveSwaps />} />
          <Route path="support" element={<TechSupport />} />
          <Route path="post-gig" element={<PostGig />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
