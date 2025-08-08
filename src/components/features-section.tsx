import {
  Bot,
  Calendar,
  Github,
  LayoutDashboard,
  Mail,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
        "Monitor your fake commits, manage repos, update vacation schedules, and tweak settings.",
    },
  ];

  return (
    <section className="relative px-10 py-12 sm:py-16 lg:py-20 sm:px-16 lg:px-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h3 className="px-4 mb-3 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">
            Features that keep your streak{" "}
            <span className="text-green-500">alive</span>
          </h3>
          <p className="max-w-2xl px-4 mx-auto text-base sm:text-lg lg:text-xl text-muted-foreground">
            Three simple tools to maintain your GitHub presence while you enjoy
            life
          </p>
        </div>
      </div>

      <div className="grid max-w-6xl gap-8 mx-auto mb-16 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="transition-all duration-300 shadow-lg hover:shadow-green-400/40 shadow-card group"
          >
            <CardHeader className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors rounded-lg bg-green-400/10 group-hover:bg-green-400/20">
                <feature.icon className="w-8 h-8 text-green-500" />
              </div>
              <CardTitle className="text-xl font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Additional features grid */}
      <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-3">
        {additionalFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 transition-colors rounded-lg bg-card/50 hover:bg-card"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-blue-400/10">
              <feature.icon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
