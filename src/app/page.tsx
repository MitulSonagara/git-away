"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import FAQSection from "@/components/faq-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/how-it-works";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonial-section";
import { Button } from "@/components/ui/button";
import { Coffee, Github, Umbrella } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [currentCommit, setCurrentCommit] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const commits = [
      "git commit -m 'feat: enjoying beach vibes ☀️'",
      "git commit -m 'fix: tan lines optimization 🏖️'",
      "git commit -m 'docs: vacation mode activated 🌴'",
      "git commit -m 'refactor: stress levels to zero ✨'",
    ];

    const text = commits[currentCommit];
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => {
          setCurrentCommit((prev) => (prev + 1) % commits.length);
          setTypedText("");
        }, 2000);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentCommit]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden sm:px-6 lg:px-8">
          <Image
            src="/hero-background.jpg"
            alt="Hero Background"
            fill
            className="z-0 object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />

          <div className="relative z-10 w-full mx-auto text-center max-w-7xl">
            {/* Logo/Brand Section */}
            <div className="flex items-center justify-center gap-2 mb-6 sm:gap-3 sm:mb-8">
              <Umbrella className="w-6 h-6 text-blue-400 sm:w-8 sm:h-8 lg:w-10 lg:h-10 float" />
              <h1 className="text-5xl font-bold md:text-7xl">
                Git<span className="text-green-500">Away</span>
              </h1>
              <Coffee
                className="w-6 h-6 text-yellow-400 sm:w-8 sm:h-8 lg:w-10 lg:h-10 float"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Main Headline */}
            <h2 className="px-4 mb-4 text-2xl font-semibold sm:mb-6 md:text-4xl text-muted-foreground">
              &quot;Your streak doesn&apos;t need a{" "}
              <span className="text-blue-400">break,</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="text-green-500">even if you do.&quot;</span>
            </h2>

            {/* Subheadline */}
            <p className="max-w-xs px-4 mx-auto mb-6 text-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl sm:mb-8 lg:mb-12 md:text-xl text-muted-foreground">
              Keep your GitHub contribution graph green{" "}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              even while you&apos;re on vacation 🌴.
            </p>

            {/* Terminal Window */}
            <div className="max-w-md px-4 mx-auto mb-8 sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl sm:mb-12 lg:mb-16">
              <div className="terminal-window">
                {/* Terminal Header */}
                <div className="terminal-header">
                  <div className="bg-red-500 terminal-dot" />
                  <div className="bg-yellow-500 terminal-dot" />
                  <div className="bg-green-500 terminal-dot" />
                  <span className="ml-2 text-xs sm:text-sm text-muted-foreground">
                    ~/vacation-mode
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="terminal-content min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] flex items-center">
                  <span className="text-primary">$</span>
                  <span className="ml-2 text-xs break-all typing sm:text-sm md:text-base">
                    {typedText}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-3 px-4 mb-6 sm:flex-row sm:gap-4 sm:mb-8">
              <Button
                size="lg"
                variant={"hero"}
                className="px-8 py-6 text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <Github className="w-4 h-4 mr-2 sm:w-5 sm:h-5" />
                <span className="sm:hidden">Start Free</span>
                <span className="hidden sm:inline">Start Free for 30 Days</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Watch Demo
              </Button>
            </div>

            {/* Footer Text */}
            <p className="px-4 mx-auto text-xs leading-relaxed sm:text-sm text-muted-foreground">
              No credit card required • 1 month free • 2 minutes setup
            </p>
          </div>
        </section>

        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection openModal={openModal} />
        <FAQSection openModal={openModal} />
      </div>
      {/* <ComingSoonModal open={isModalOpen} onOpenChange={setIsModalOpen} /> */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
