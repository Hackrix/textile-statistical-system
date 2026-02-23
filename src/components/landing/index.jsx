import Footer from "../shared/Footer";
import Header from "../shared/Header";
import Container from "../shared/Container";
import Carousel from "../shared/Carousel";
import HowItWorks from "./HowItWorks";

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">
                <Carousel />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}
 
export default Landing;