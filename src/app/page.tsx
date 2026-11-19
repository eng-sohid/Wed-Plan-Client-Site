import CTASection from "./components/home/cta-section";
import FeaturedServices from "./components/home/featured-services";
import HeroSection from "./components/home/hero-section";
import HowItWorks from "./components/home/how-it-works";
import Testimonials from "./components/home/testimonials";
import WhyChooseUs from "./components/home/why-choose-us";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
