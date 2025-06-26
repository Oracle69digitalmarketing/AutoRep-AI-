import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Users,
  MessageSquare,
  BarChart3,
  Zap,
  Globe,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  Shield,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AutoRep AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#industries" className="text-gray-600 hover:text-gray-900 transition-colors">
              Industries
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            🚀 Your AI Sales Closer on Autopilot
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Adaptive AI Sales Assistant for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Every Industry
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            From insurance to real estate, education to healthcare—AutoRep AI becomes the smart engine behind any
            agent-driven business, adapting to your role, audience, and goals automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Free tier available • No credit card required</p>
        </div>
      </section>

      {/* Industry Showcase */}
      <section id="industries" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">One Platform, Every Industry</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AutoRep AI automatically adapts its funnels, messages, and workflows based on your industry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Insurance Agent",
                description: "Retirement plans, education cover, RSA",
                features: ["Income-based scoring", "Urgency triggers", "WhatsApp & SMS"],
              },
              {
                icon: Users,
                title: "Real Estate Agent",
                description: "Land, housing sales, shortlet rentals",
                features: ["Location-aware scripts", "Property filters", "Google Maps integration"],
              },
              {
                icon: Target,
                title: "School Marketer",
                description: "Private schools, tutorial services",
                features: ["Age-based targeting", "Curriculum matching", "Voice reminders"],
              },
              {
                icon: TrendingUp,
                title: "Loan Officer",
                description: "Microloans, business loans",
                features: ["Revenue analysis", "Repayment behavior", "Calculator bots"],
              },
              {
                icon: Globe,
                title: "Agric Extension",
                description: "Farm tools, fertilizers, agritech",
                features: ["Crop-type specific", "Seasonal alerts", "USSD & SMS"],
              },
              {
                icon: MessageSquare,
                title: "Ecommerce Affiliate",
                description: "Product funnels, discount offers",
                features: ["Shopping behavior", "Dynamic catalogs", "Product recommendations"],
              },
            ].map((industry, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                    <industry.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{industry.title}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {industry.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How AutoRep AI Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Five simple steps to transform your sales process with AI automation
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                step: "1",
                title: "Role Selection",
                description: "Choose your industry or let AI detect it automatically",
                icon: Target,
              },
              {
                step: "2",
                title: "Auto-Adaptive Funnel",
                description: "Landing pages and lead capture adjust to your role",
                icon: Zap,
              },
              {
                step: "3",
                title: "AI Persona Builder",
                description: "Customize tone, language, and communication style",
                icon: MessageSquare,
              },
              {
                step: "4",
                title: "Omnichannel Outreach",
                description: "WhatsApp, SMS, email, and voice - all automated",
                icon: Phone,
              },
              {
                step: "5",
                title: "Smart Analytics",
                description: "Track performance with industry-specific dashboards",
                icon: BarChart3,
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <step.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Every Agent</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate your sales process and close more deals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "AI Chatbot Generator",
                description: "Industry-aware chatbots that understand your business",
              },
              {
                icon: Zap,
                title: "Dynamic Funnel Builder",
                description: "Smart forms with automatic lead scoring",
              },
              {
                icon: Clock,
                title: "AI Follow-Up Scripts",
                description: "Automated sequences that never miss a lead",
              },
              {
                icon: Users,
                title: "Micro-CRM",
                description: "Simple yet powerful customer relationship management",
              },
              {
                icon: Globe,
                title: "Multi-Language Support",
                description: "English, Pidgin, Yoruba, Hausa, and more",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description: "Industry-specific insights and forecasting",
              },
              {
                icon: TrendingUp,
                title: "Commission Tracker",
                description: "Track referrals and split commissions automatically",
              },
              {
                icon: Shield,
                title: "Team Management",
                description: "Multi-agent dashboard for agencies and teams",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your business size and needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Freemium",
                price: "Free",
                period: "forever",
                description: "Perfect for getting started",
                features: ["1 funnel", "50 leads/month", "WhatsApp only", "Basic analytics", "Community support"],
                cta: "Start Free",
                popular: false,
              },
              {
                name: "Pro",
                price: "₦10,000",
                period: "/month",
                description: "For serious sales professionals",
                features: [
                  "Unlimited funnels",
                  "Unlimited leads",
                  "Email & SMS",
                  "Full CRM access",
                  "Advanced analytics",
                  "Priority support",
                ],
                cta: "Start Pro Trial",
                popular: true,
              },
              {
                name: "Agency",
                price: "₦50,000",
                period: "/month",
                description: "For teams and agencies",
                features: [
                  "Multi-agent dashboard",
                  "Sub-accounts",
                  "Lead routing",
                  "Team analytics",
                  "White-label options",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                popular: false,
              },
              {
                name: "White-Label",
                price: "₦150,000",
                period: "/month",
                description: "Custom branded solution",
                features: [
                  "Full customization",
                  "Your branding",
                  "Custom domains",
                  "API access",
                  "Enterprise support",
                  "Custom integrations",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-emerald-500 shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Sales Process?</h2>
          <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
            Join thousands of agents who are already closing more deals with AutoRep AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-emerald-100 mt-4">No setup fees • Cancel anytime • 30-day money-back guarantee</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AutoRep AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your adaptive AI sales closer on autopilot. Sell smarter, follow up faster, close automatically.
              </p>
              <div className="flex space-x-4">
                <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Phone className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Industries
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AutoRep AI. All rights reserved. Built for agents, by agents.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
