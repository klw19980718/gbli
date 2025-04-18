import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeatureGrid } from "@/components/feature-grid";
import { UserExamples } from "@/components/user-examples";
import { PricingPlans } from "@/components/pricing-plans";
import { FAQAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/footer";

export default async function HomePage({
  params
}: {
  params: { locale: string }
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid />
        <UserExamples />
        <PricingPlans />
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
} 