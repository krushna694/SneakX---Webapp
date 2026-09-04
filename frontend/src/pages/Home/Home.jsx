import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import NewArrivals from "../../components/home/NewArrivals";

function Home() {
    return (
        <>
            <HeroSection />

            <CategorySection />

            <FeaturedProducts />

            <NewArrivals />
        </>
    );
}

export default Home;