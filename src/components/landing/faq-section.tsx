"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this cheating?",
      answer:
        "Nope, just good automation! GitAway creates legitimate commits...",
    },
    {
      question: "What is the Emergency Commit Button?",
      answer: "The Emergency Commit Button instantly pushes...",
    },
    {
      question: "How does the Commit Calendar Simulation work?",
      answer: "It schedules AI-generated commits...",
    },
    {
      question: "Can I customize commit messages?",
      answer: "Yes! You can either let GitAway generate...",
    },
    {
      question: "Is it safe to use GitAway with my GitHub account?",
      answer: "Yes. We use GitHub’s official OAuth...",
    },
    {
      question: "Can I use this for multiple repositories?",
      answer: "Pro tier supports multiple repositories...",
    },
    {
      question: "Do I need to keep my computer on for scheduled commits?",
      answer: "No. GitAway runs in the cloud...",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes — you can try GitAway free for 1 month...",
    },
  ];

  const midIndex = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midIndex);
  const rightColumn = faqs.slice(midIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20">
        <div className="container px-4 mx-auto">
          {/* Heading */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Frequently Asked <span className="text-green-400">Questions</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Everything you need to know about keeping your GitHub streak alive
              — even when you’re offline.
            </p>
          </div>

          {/* FAQ Two-Column Layout */}
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2">
            {/* Left column */}
            <Accordion type="single" collapsible className="space-y-4">
              {leftColumn.map((faq, index) => (
                <AccordionItem
                  key={`left-${index}`}
                  value={`left-${index}`}
                  className="px-6 border rounded-lg bg-card/50 last:border-b"
                >
                  <AccordionTrigger className="text-left transition-colors hover:no-underline hover:text-green-400">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Right column */}
            <Accordion type="single" collapsible className="space-y-4">
              {rightColumn.map((faq, index) => (
                <AccordionItem
                  key={`right-${index}`}
                  value={`right-${index}`}
                  className="px-6 border rounded-lg bg-card/50 last:border-b"
                >
                  <AccordionTrigger className="text-left transition-colors hover:no-underline hover:text-green-400">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Bottom CTA cards */}
          <div className="grid max-w-6xl gap-6 mx-auto mt-10 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>
                  Explore resources or talk to our team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  💬 Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">
                  Try GitAway Free
                </CardTitle>
                <CardDescription>
                  1-month free trial — no credit card required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full text-white bg-green-500 hover:bg-green-600"
                  onClick={() => setIsModalOpen(true)}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FAQSection;
