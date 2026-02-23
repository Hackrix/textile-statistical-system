import RegistrationPage from "../components/registeration/index.jsx";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const Registeration = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <RegistrationPage />
      </main>
      <Footer />
    </div>
  );
};

export default Registeration;
