
import AboutHero from "./components/CenteredAbout/AboutHero";
import ExpertiseAndProducts from "./components/CenteredAbout/ExpertiseAndProducts";
import WhoWeAre from "./components/CenteredAbout/WhoWeAre";
import CommitmentGlobalInnovation from "./components/CenteredAbout/CommitmentGlobalInnovation";
import WhyChooseTechwin from "./components/CenteredAbout/WhyChooseTechwin";
import SustainabilityServiceVision from "./components/CenteredAbout/SustainabilityServiceVision";
import AboutFinalStatement from "./components/CenteredAbout/AboutFinalStatement";
import TechwinIntro from "@/components/company/TechwinIntro";

export const metadata = {
  title: "About Techwin | Premium Fiber Laser Manufacturer in Hangzhou",
  description:
    "Learn about Techwin, a leading fiber laser manufacturer in Hangzhou, China. Discover our expertise in ultra-narrow linewidth lasers, high-power systems, and innovative photonic solutions for global markets.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <TechwinIntro />
      <WhoWeAre />
      <ExpertiseAndProducts />
      <CommitmentGlobalInnovation />
      <WhyChooseTechwin />
      <SustainabilityServiceVision />
      <AboutFinalStatement />
    </main>
  );
}
