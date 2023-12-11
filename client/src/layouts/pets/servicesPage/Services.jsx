import "./servicesLandingPage.css";
import PackageSection from "./PackageSection";
import AppointmentSection from "./Appointment";
import GallerySection from "./GallerySection";
import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import servicesImages from "./servicesImages";

export default function LandingPage() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <PackageSection />
      <AppointmentSection page={servicesImages} AppointmentType="services" />
      <GallerySection />
    </div>
  );
}
