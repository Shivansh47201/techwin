

import AboutHero from "./components/CenteredAbout/AboutHero";
import ExpertiseAndProducts from "./components/CenteredAbout/ExpertiseAndProducts";
import WhoWeAre from "./components/CenteredAbout/WhoWeAre";
import CommitmentGlobalInnovation from "./components/CenteredAbout/CommitmentGlobalInnovation";
import WhyChooseTechwin from "./components/CenteredAbout/WhyChooseTechwin";
import SustainabilityServiceVision from "./components/CenteredAbout/SustainabilityServiceVision";
import AboutFinalStatement from "./components/CenteredAbout/AboutFinalStatement";
import TechwinIntro from "@/components/company/TechwinIntro";


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
