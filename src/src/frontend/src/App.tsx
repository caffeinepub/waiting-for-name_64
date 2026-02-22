import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Timing constants for animation choreography
const STAGGER_DELAY = 100;
const FADE_DURATION = 600;
const SLIDE_DURATION = 800;

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, title: "Modern Living Sanctuary", category: "Residential", image: "/assets/generated/portfolio-1.dim_800x600.jpg" },
  { id: 2, title: "Contemporary Kitchen Design", category: "Residential", image: "/assets/generated/portfolio-2.dim_800x600.jpg" },
  { id: 3, title: "Serene Bedroom Retreat", category: "Residential", image: "/assets/generated/portfolio-3.dim_800x600.jpg" },
  { id: 4, title: "Elegant Dining Experience", category: "Residential", image: "/assets/generated/portfolio-4.dim_800x600.jpg" },
  { id: 5, title: "Spa-Inspired Bathroom", category: "Residential", image: "/assets/generated/portfolio-5.dim_800x600.jpg" },
  { id: 6, title: "Executive Home Office", category: "Residential", image: "/assets/generated/portfolio-6.dim_800x600.jpg" },
];

const services = [
  {
    title: "Residential Design",
    description: "Transform your home into a personalized sanctuary that reflects your lifestyle and aesthetic preferences.",
  },
  {
    title: "Commercial Spaces",
    description: "Create functional and inspiring work environments that enhance productivity and brand identity.",
  },
  {
    title: "Space Planning",
    description: "Optimize your space with thoughtful layouts that balance beauty, function, and flow.",
  },
  {
    title: "Design Consultations",
    description: "Expert guidance to help you make informed decisions about your interior design project.",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  // Intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const itemId = parseInt(entry.target.getAttribute("data-item-id") || "0");
          if (itemId) {
            setVisibleItems((prev) => new Set([...prev, itemId]));
          }
        }
      });
    }, observerOptions);

    // Observe portfolio items
    document.querySelectorAll("[data-item-id]").forEach((el) => observer.observe(el));

    // Section tracking for nav
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ["home", "about", "services", "portfolio", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for your message! I'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-display font-semibold tracking-wide text-foreground hover:text-primary transition-colors duration-300"
            >
              Ana Interior Design
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                    activeSection === link.id ? "text-primary font-medium" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border animate-in slide-in-from-top-4 duration-300">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3 px-4 text-sm uppercase tracking-wider transition-colors duration-300 ${
                    activeSection === link.id ? "text-primary font-medium" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                <div className="space-y-4">
                  <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-foreground leading-tight">
                    Ana
                  </h1>
                  <p className="font-display text-2xl md:text-3xl text-primary font-light italic">
                    Interior Designer
                  </p>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Creating beautiful, functional spaces that tell your story and enhance everyday living.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("portfolio")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    View Portfolio
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection("contact")}
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base transition-all duration-300"
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>

              {/* Hero Image - Asymmetric positioning */}
              <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden shadow-2xl">
                  <img
                    src="/assets/uploads/IMG_4577-1.jpeg"
                    alt="Ana - Interior Designer"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 -z-10" />
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="text-primary" size={32} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 bg-muted/30 relative">
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' /%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23noise2)' opacity='0.5'/%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-8 text-center">
                About
              </h2>
              
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                  With a passion for creating spaces that seamlessly blend beauty and functionality, 
                  I bring a thoughtful approach to every interior design project. My philosophy centers 
                  on understanding your unique vision and translating it into environments that not only 
                  look stunning but also enhance your daily life.
                </p>
                
                <p>
                  Every space tells a story, and I believe in crafting narratives through carefully 
                  curated materials, colors, and textures. Whether it's a cozy residential haven or a 
                  dynamic commercial environment, I approach each project with meticulous attention to 
                  detail and a commitment to excellence.
                </p>
                
                <p>
                  My design process is collaborative and transparent. I work closely with clients to 
                  ensure their personality and preferences shine through in every element, creating 
                  spaces that feel authentically theirs while maintaining timeless elegance.
                </p>
              </div>

              {/* Key attributes */}
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  { number: "10+", label: "Years Experience" },
                  { number: "150+", label: "Projects Completed" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="font-display text-4xl md:text-5xl text-primary font-light">
                      {stat.number}
                    </div>
                    <div className="text-sm uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-6">
                Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive interior design solutions tailored to your unique needs and aspirations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="border-border bg-card hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * STAGGER_DELAY}ms`, animationDuration: `${FADE_DURATION}ms` }}
                >
                  <CardContent className="p-8 space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-light text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 md:py-32 bg-muted/30 relative">
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='90' height='90' filter='url(%23noise3)' opacity='0.4'/%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-6">
                Portfolio
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A curated selection of recent projects showcasing refined aesthetics and thoughtful design.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id}
                  data-item-id={item.id}
                  className={`group relative overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-700 ${
                    visibleItems.has(item.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: visibleItems.has(item.id) ? `${(index % 3) * STAGGER_DELAY}ms` : "0ms",
                  }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-background translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-xs uppercase tracking-wider mb-2 opacity-90">
                        {item.category}
                      </p>
                      <h3 className="font-display text-2xl font-light">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ready to transform your space? Let's discuss your vision and bring it to life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl text-foreground mb-6">
                      Contact Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Mail className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <p className="font-medium text-foreground">Email</p>
                          <a href="mailto:ana@interiordesign.com" className="text-muted-foreground hover:text-primary transition-colors">
                            ana@interiordesign.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Phone className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <p className="font-medium text-foreground">Phone</p>
                          <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                            +1 (234) 567-890
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <MapPin className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <p className="font-medium text-foreground">Location</p>
                          <p className="text-muted-foreground">
                            Available for projects nationwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border">
                    <h4 className="font-display text-xl text-foreground mb-4">
                      Office Hours
                    </h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: By Appointment</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <Card className="border-border shadow-lg">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                          className="border-border focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className="border-border focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (234) 567-890"
                          className="border-border focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          placeholder="Tell me about your project..."
                          rows={5}
                          className="border-border focus:ring-primary resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-display text-2xl font-semibold text-foreground">
              Ana Interior Design
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">
                © 2026. Built with love using{" "}
                <a
                  href="https://caffeine.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}
