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
      title: "Automated Streak Protection",
      description:
        "Set it and forget it — GitAway commits for you while you’re busy or away.",
      details: [
        "Smart commit scheduling",
        "Multiple repo support",
        "Randomized commit times",
      ],
    },
    {
      icon: Sparkles,
      title: "AI & Template Commit Messages",
      description:
        "From minimal to creative — your commits can match your personality or stay invisible.",
      details: [
        "AI-generated commit messages",
        "Fixed or custom templates",
        "Theme-based commit styles",
      ],
    },
    {
      icon: Shield,
      title: "Safe & Transparent",
      description:
        "OAuth only. You decide where GitAway can commit — and nothing else.",
      details: [
        "GitHub OAuth 2.0",
        "Only selected repos touched",
        "Full visibility & control",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: Calendar,
      title: "Commit Calendar Simulation",
      description:
        "Commits spread naturally across the day — no suspicious midnight dumps.",
    },
    {
      icon: Zap,
      title: "Emergency Commit Button",
      description:
        "Missed scheduling? Trigger an instant commit from the dashboard or email.",
    },
    {
      icon: Mail,
      title: "Email Alerts",
      description:
        "Pro users get notified before the day ends if no commit has been made.",
    },
    {
      icon: SlidersHorizontal,
      title: "Fully Configurable",
      description:
        "Choose repos, commit frequency, styles, and messages — all from one dashboard.",
    },
    {
      icon: LayoutDashboard,
      title: "Intuitive Dashboard",
      description:
        "Track commits, streak stats, vacation days, and scheduling in one place.",
    },
    {
      icon: Github,
      title: "Built for GitHub",
      description:
        "Optimized for GitHub’s contribution graph and streak detection rules.",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 ">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Features that keep your streak{" "}
            <span className="text-green-500">alive</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Three simple tools to maintain your GitHub presence while you enjoy
            life
          </p>
        </div>
      </div>

      <div className="grid max-w-6xl gap-6 mx-auto mb-8 md:grid-cols-2 lg:grid-cols-3">
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
            <CardContent className="flex flex-col h-full">
              <p className="mb-4 text-muted-foreground">
                {feature.description}
              </p>
              <ul className="mt-auto space-y-2">
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
      <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {additionalFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 transition-all duration-300 rounded-lg bg-card/50 hover:bg-card hover:shadow-lg hover:shadow-blue-400/20"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-blue-400/10">
              <feature.icon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-1 font-semibold">{feature.title}</h3>
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
