import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ImpactSection from '@/components/sections/ImpactSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import DistrictGovernorSection from '@/components/sections/DistrictGovernorSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <WhoWeAreSection />
        <DistrictGovernorSection />
        <ExperienceSection />
        <LeadershipSection />
        <ProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
