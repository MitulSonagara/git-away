import FAQSection from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing-section";
import TestimonialsSection from "@/components/landing/testimonial-section";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
}
