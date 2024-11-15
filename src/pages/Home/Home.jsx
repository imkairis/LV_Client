import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import Brand from "../../components/home/Brand/brand";
import Type from "../../components/home/ProductType/Type";
import { AdoptHero } from "../../components/home/AdoptHero/AdoptHero";
// import Hero from "../../components/home/Hero/Hero";
const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        {/* <NewArrivals /> */}
        <Type />
        <AdoptHero />
        <Brand />

        {/* <SpecialOffers /> */}

        {/* <Hero />
        
         */}
      </div>
    </div>
  );
};

export default Home;
