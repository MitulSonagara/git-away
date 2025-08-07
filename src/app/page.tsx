"use client";

import { Button } from "@/components/ui/button";
import { Coffee, Github, Umbrella } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [currentCommit, setCurrentCommit] = useState(0);

  const commits = [
    "git commit -m 'feat: enjoying beach vibes ☀️'",
    "git commit -m 'fix: tan lines optimization 🏖️'",
    "git commit -m 'docs: vacation mode activated 🌴'",
    "git commit -m 'refactor: stress levels to zero ✨'",
  ];

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
        <Image
          src="/hero-background.jpg"
          alt="Hero Background"
          fill
          className="z-0 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          {/* Logo/Brand Section */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Umbrella className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-400 float" />
            <h1 className="text-5xl md:text-7xl font-bold">
              Git<span className="text-green-500">Away</span>
            </h1>
            <Coffee
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-400 float"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 sm:mb-6 text-2xl md:text-4xl font-semibold text-muted-foreground px-4">
            "Your streak doesn't need a{" "}
            <span className="text-blue-400">break,</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-green-500">even if you do."</span>
          </h2>

          {/* Subheadline */}
          <p className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12 text-lg md:text-xl text-muted-foreground px-4">
            Keep your GitHub contribution graph green{" "}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            even while you're on vacation 🌴.
          </p>

          {/* Terminal Window */}
          <div className="max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4">
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
                <span className="ml-2 typing text-xs sm:text-sm md:text-base break-all">
                  {typedText}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <Button size="lg" variant={"hero"} className="text-lg px-8 py-6">
              <Github className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sm:hidden">Start Free</span>
              <span className="hidden sm:inline">
                Get Started Free with GitHub
              </span>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs sm:text-sm text-muted-foreground px-4 mx-auto leading-relaxed">
            No credit card required • 7 commits free • 2 minutes setup
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
              Features that keep your streak{" "}
              <span className="text-green-500">alive</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Three simple tools to maintain your GitHub presence while you
              enjoy life
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
