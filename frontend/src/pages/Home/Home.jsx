import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import NewArrivals from "../../components/home/NewArrivals";
import "./Home.css";

function Home() {
    return (
        <div className="sx-page-enter">
            <HeroSection />

            <CategorySection />

            <FeaturedProducts />

            <NewArrivals />
        </div>
    );
}

export default Home;