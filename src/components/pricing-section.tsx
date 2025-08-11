"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PricingSection() {
  const features = [
    "Unlimited repo streak protection",
    "AI or template commit messages",
    "Commit Calendar Simulation",
    "Emergency Commit Button",
    "Email alerts for missed days",
    "Vacation scheduling",
    "Detailed contribution analytics",
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-secondary/30">
      <div className="px-4 mx-auto">
        
        {/* Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Simple <span className="text-green-500">Pricing</span> for Peace of Mind
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Start free for 30 days — then keep your streak safe for less than a coffee.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <Card className="transition-all duration-300 shadow-lg hover:shadow-green-400/40 group bg-background">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                Pro Plan <Badge variant="secondary" className="bg-green-100 text-green-700">Most Popular</Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Full streak protection, no compromises.
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="text-4xl font-bold">
                  $5<span className="text-lg font-normal">/mo</span>
                </div>
                <div className="text-muted-foreground">or $50/year (save 17%)</div>
              </div>
              <ul className="space-y-3 text-left">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button size="lg" variant={"hero"} className="px-8 py-6 text-lg">
                Start Free for 30 Days
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                No credit card required • Cancel anytime
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
