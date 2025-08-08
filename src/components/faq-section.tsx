import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this cheating?",
      answer:
        "Nope, just good automation! GitAway creates legitimate commits in your repositories. Think of it as a scheduled deployment system for your vacation mode. You're not faking work—you're automating maintenance.",
    },
    {
      question: "Can my boss tell?",
      answer:
        'Only if they read your commit messages like "Fixed beach umbrella deployment issue" or "Optimized sunscreen application algorithm." But seriously, commits appear as normal GitHub activity. The creativity is optional!',
    },
    {
      question: "What kind of commits does GitAway make?",
      answer:
        "We offer simple commits (like README updates, documentation improvements) or creative vacation-themed ones. You choose the style! All commits are meaningful and won't clutter your codebase.",
    },
    {
      question: "Is my GitHub account safe?",
      answer:
        "Absolutely! We use OAuth 2.0 authentication and only request the minimum permissions needed. We never access your private repositories without permission and can't see your existing code. Everything is transparent and secure.",
    },
    {
      question: "How long can my vacation be?",
      answer:
        "As long as you want! Free tier supports up to 7 days per month. Pro tier has unlimited vacation days. Perfect for digital nomads, sabbaticals, or just pretending to work from the beach.",
    },
    {
      question: "Can I use this for multiple repositories?",
      answer:
        "Pro tier supports multiple repositories. You can maintain streaks across all your projects while you're sipping coconut water somewhere tropical.",
    },
    {
      question: "What if I want to actually commit during vacation?",
      answer:
        "GitAway is smart enough to detect your real commits and adjusts accordingly. It won't double-commit on days you're actually coding from your beach chair.",
    },
    {
      question: "Do you support other Git platforms?",
      answer:
        "Currently GitHub only, but GitLab and Bitbucket support are on our roadmap. GitAway is focused on being the best GitHub streak maintainer first.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Frequently asked{" "}
            <span className="text-terminal-green">questions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Everything you need to know about maintaining your GitHub streak
            while actually taking a break.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="px-6 border rounded-lg bg-card/50 border-border"
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

      </div>
    </section>
  );
};

export default FAQSection;
