import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: "100vh",
      }}
    >
      <ScrollToTop />

      <Navbar />

      <main className="flex-grow-1">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;