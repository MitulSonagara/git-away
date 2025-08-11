import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

interface FAQSectionProps {
  openModal: () => void;
}

const FAQSection = ({ openModal }: FAQSectionProps) => {
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

  // Split FAQs into two columns
  const midIndex = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midIndex);
  const rightColumn = faqs.slice(midIndex);

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Frequently Asked <span className="text-green-400">Questions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Everything you need to know about keeping your GitHub streak alive —
            even when you’re offline.
          </p>
        </div>

        {/* FAQ Two-Column Layout */}
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {/* Left column */}
          <Accordion type="single" collapsible className="space-y-4">
            {leftColumn.map((faq, index) => (
              <AccordionItem
                key={`left-${index}`}
                value={`left-${index}`}
                className="px-6 rounded-lg bg-card/50 border last:border-b"
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
                className="px-6 rounded-lg bg-card/50 border last:border-b"
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
        <div className="max-w-6xl mx-auto mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>
                Explore resources or talk to our team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={openModal}>
                💬 Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
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
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={openModal}
              >
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
