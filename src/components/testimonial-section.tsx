import { Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Code McCodeface",
      role: "Senior Meme Engineer",
      avatar: "🧑‍💻",
      quote:
        "GitAway kept my streak alive, and my tan! Finally, a tool that understands the developer struggle.",
      commits: "365-day streak maintained",
    },
    {
      name: "Terminal Terry",
      role: "Bash Wizard",
      avatar: "🧙‍♂️",
      quote:
        "Not cheating, just... automating. My manager thinks I never take breaks. Perfect!",
      commits: "2x vacation streaks",
    },
    {
      name: "Debug Duck",
      role: "Rubber Duck Consultant",
      avatar: "🦆",
      quote:
        "Quack! Even I need vacations. GitAway lets me float away while keeping the green squares flowing.",
      commits: "Infinite streak power",
    },
    {
      name: "Caffeinated Cat",
      role: "Midnight Coder",
      avatar: "🐱",
      quote:
        "Nine lives, infinite streaks. GitAway handles my nap times between 2 AM coding sessions.",
      commits: "9 lives of commits",
    },
    {
      name: "Regex Robot",
      role: "Pattern Matching Specialist",
      avatar: "🤖",
      quote:
        "/vacation|streak/ matches perfectly with GitAway. Computed vacation mode: activated.",
      commits: "Pattern: success",
    },
    {
      name: "Stack Overflow Steve",
      role: "Copy-Paste Ninja",
      avatar: "🥷",
      quote:
        "Finally found a tool that wasn't already answered on Stack Overflow. Mind = blown.",
      commits: "No duplicates found",
    },
  ];
  return (
    <section className="py-20 ">
      <div className="px-4 mx-auto">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Loved by <span className="text-green-500">Developers</span>{" "}
            Worldwide
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Real testimonials from totally real developers who definitely
            exist.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            *Developer personas may be fictional but the pain is real
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="transition-all duration-300 shadow-lg shadow-card hover:shadow-green-400/40 group"
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="w-8 h-8 mb-4 text-green-400/40" />

                {/* Quote */}
                <blockquote className="mb-6 leading-relaxed text-foreground">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-2xl bg-green-400/10">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="mt-1 text-xs text-green-400">
                      {testimonial.commits}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fun disclaimer */}
        <div className="mt-16 text-center">
          <div className="inline-block p-4 border rounded-lg bg-blue-400/10 border-blue-400/20">
            <p className="text-sm text-blue-400">
              🏖️ All testimonials written during actual vacation time thanks to
              GitAway
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
