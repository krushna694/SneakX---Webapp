
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const { pathname } = useLocation();

  const isAdminArea =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/control-center");

  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: "100vh",
      }}
    >
      <ScrollToTop />

      {!isAdminArea && <Navbar />}

      <main className="flex-grow-1">
        <AppRoutes />
      </main>

      {!isAdminArea && <Footer />}
    </div>
  );
}

export default App;
