import './servicesLandingPage.css'
import PackageSection from './PackageSection';
import AppointmentSection from './Appointment';
import GallerySection from './GallerySection';
import HomeSection from './HomeSection';
import AboutSection from './AboutSection';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import ServicesSection from './ServicesSection';

export default function LandingPage() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <PackageSection />
      <AppointmentSection />
      <GallerySection />
    </div>
  );
}