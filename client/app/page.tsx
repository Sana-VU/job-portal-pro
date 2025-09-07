import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container py-8 space-y-20">
      {/* Hero Section */}
      <section className="hero-gradient text-white rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies and discover opportunities that match
            your skills and ambitions. Your next career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/jobs"
              className="btn bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl"
            >
              <span className="mr-2">🔍</span>
              Browse Jobs
            </Link>
            <Link
              href="/register"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600"
            >
              <span className="mr-2">📝</span>
              Post a Job
            </Link>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
          <div className="text-slate-600">Active Jobs</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
          <div className="text-slate-600">Happy Candidates</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">1K+</div>
          <div className="text-slate-600">Companies</div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Job Portal PRO?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We provide the tools and platform you need to succeed in your job
            search or hiring process.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Smart Matching",
              description:
                "Our AI-powered algorithm matches you with the perfect job opportunities based on your skills and preferences.",
            },
            {
              icon: "⚡",
              title: "Quick Apply",
              description:
                "Apply to multiple jobs with just one click. Save time and increase your chances of landing interviews.",
            },
            {
              icon: "📊",
              title: "Analytics Dashboard",
              description:
                "Track your application progress, view detailed insights, and optimize your job search strategy.",
            },
          ].map((feature, i) => (
            <div className="feature-card" key={i}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="card-elevated text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have found their dream jobs
          through our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register" className="btn btn-primary">
            <span className="mr-2">🚀</span>
            Get Started Free
          </Link>
          <Link href="/jobs" className="btn btn-ghost">
            <span className="mr-2">👀</span>
            Explore Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}
