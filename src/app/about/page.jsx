import AboutHero from "@/components/about-hero";
import AboutMission from "@/components/about-mission";
import AboutServices from "@/components/about-services";
import AboutTeam from "@/components/aboutTeam";
import FAQs from "@/components/FAQs";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutMission />
      <AboutServices />
      <AboutTeam />
            <TestimonialsSection />
      <FAQs />
    </main>
  );
}
