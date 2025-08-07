import {
  Bot,
  Sparkles,
  Shield,
  Calendar,
  Github,
  Zap,
  Mail,
  FileText,
  SlidersHorizontal,
  Eye,
  Ghost,
  LayoutDashboard,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Bot,
      title: "Automated GitHub Activity",
      description:
        "Schedule auto-commits for your away days. Let GitAway do the streak-saving.",
      details: [
        "Smart commit scheduling",
        "AI-powered commit messages",
        "Multiple repo support",
      ],
    },
    {
      icon: Sparkles,
      title: "Custom & Creative Commits",
      description:
        "Go basic, or go wild. Choose commit styles that match your vibe.",
      details: [
        "AI-generated creative messages",
        "Vacation-themed options (e.g. beach mode)",
        "Customizable commit templates",
      ],
    },
    {
      icon: Shield,
      title: "Safe & Transparent",
      description:
        "OAuth only. You choose what GitAway can do — and nothing else.",
      details: [
        "GitHub OAuth 2.0",
        "Only selected repos touched",
        "Full control and visibility at all times",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: Calendar,
      title: "Vacation Scheduling",
      description:
        "Set your vacation dates — GitAway handles your daily activity behind the scenes.",
    },
    {
      icon: Github,
      title: "GitHub Native",
      description:
        "Built specifically for GitHub’s contribution graph and streak detection rules.",
    },
    {
      icon: Mail,
      title: "Email Reminders",
      description:
        "Get notified if a commit fails or if your schedule runs out.",
    },
    {
      icon: SlidersHorizontal,
      title: "Fully Configurable",
      description:
        "Choose repos, templates, frequency, and commit style — all from your dashboard.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description:
        "Connect your GitHub and start faking commits — all in under 2 minutes.",
    },
    {
      icon: LayoutDashboard,
      title: "Intuitive Dashboard",
      description:
        "Monitor your fake commits, manage repos, update vacation schedules, and tweak settings — all in one clean interface.",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Features that keep your streak{" "}
            <span className="text-green-500">alive</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Three simple tools to maintain your GitHub presence while you enjoy
            life
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection
