import ContactCTA from "@/src/components/sections/ContactCTA";
import ServicesGrid from "@/src/components/sections/ServicesGrid";
import SkillsGrid from "@/src/components/sections/SkillsGrid";
import Seo from "@/src/components/Seo";
import PageHeader from "@/src/components/ui/PageHeader";
import Section from "@/src/components/ui/Section";

export default function ServicesPage() {
  return (
    <>
      <Seo path="/services" />
      <PageHeader
        label="services"
        title="Des solutions sur mesure."
        intro="Chaque projet est unique. J'interviens là où vous en avez besoin : web, mobile, backend ou pilotage produit."
      />
      <div className="wrap">
        <ServicesGrid detailed />
      </div>
      <Section label="stack" title="Les outils que j'utilise">
        <SkillsGrid />
      </Section>
      <ContactCTA />
    </>
  );
}
