import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import Brand from "../../components/home/Brand/brand";
import Type from "../../components/home/ProductType/Type";
import { AdoptHero } from "../../components/home/AdoptHero/AdoptHero";
import AboutSection from "../../components/home/About/About";
// import Hero from "../../components/home/Hero/Hero";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <Banner />
      </div>
      <div className="mb-8">
        <BannerBottom />
      </div>
      <div className="max-w-container mx-auto px-4 space-y-12">
        {/* <NewArrivals /> */}
        <Type />
        <AdoptHero />
        <AboutSection />
        <Brand />

        {/* <SpecialOffers /> */}

        {/* <Hero />
        
         */}
      </div>
    </div>
  );
};

export default Home;
