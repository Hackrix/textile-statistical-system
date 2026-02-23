import LoginInfo from "../components/loginComponents/LoginInfo";
import LoginWrap from "../components/loginComponents/LoginWrapper";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import InfoBanner from "../components/shared/InfoBanner";

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-120px)]">

          {/* LEFT PANEL */}
          <div
            className="
              order-2 lg:order-1
              flex items-center justify-center
              px-6 py-10
            "
          >
            <LoginInfo />
          </div>

          {/* RIGHT PANEL */}
          <div
            className="
              order-1 lg:order-2
              flex flex-col items-center justify-center
              px-6 py-10
            "
          >
            {/* Login Card */}
            <LoginWrap />

            {/* PAN INFO BANNER */}
            <div className="mt-6 w-full flex justify-center">
              <InfoBanner text="Keep your PAN and Registration License documents ready for new registrations" />
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Login;