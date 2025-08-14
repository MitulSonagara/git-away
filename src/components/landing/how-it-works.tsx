import { Github, Settings, Umbrella } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="px-6 py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            How It <span className="text-green-500">Works</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Three simple steps to vacation-proof your GitHub streak
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20">
              <Github className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="mb-4 text-xl font-semibold">1. Connect GitHub</h4>
            <p className="text-muted-foreground">
              Secure OAuth connection to your GitHub account. We only request
              the minimum permissions needed.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20">
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="mb-4 text-xl font-semibold">2. Set Preferences</h4>
            <p className="text-muted-foreground">
              Choose your vacation dates, target repositories, and commit style
              preferences.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/20">
              <Umbrella className="w-8 h-8 text-amber-500" />
            </div>
            <h4 className="mb-4 text-xl font-semibold">3. Relax & Enjoy</h4>
            <p className="text-muted-foreground">
              GitAway maintains your contribution graph while you sip cocktails
              on the beach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
