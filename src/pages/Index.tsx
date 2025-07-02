
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Github, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const currentSkills = [
    'DevOps', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Python', 'Linux'
  ];

  const targetRoles = [
    'DevSecOps Engineer', 'SRE', 'Cloud Engineer', 'Platform Engineer', 'Security Engineer'
  ];

  // Portfolio configuration moved inline since config file was removed
  const portfolioConfig = {
    personal: {
      name: "Kushal Gautam",
      title: "DevOps Engineer",
      subtitle: "Building Scalable Infrastructure",
      description: "Passionate about automating workflows, scaling systems, and implementing DevOps best practices to deliver reliable software solutions."
    },
    socialLinks: [
      { name: "GitHub", icon: "Github", url: "https://github.com/thisiskushal31" },
      { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/in/thisiskushal31" }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            {/* Name and Designation */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                <span className="text-muted-foreground text-3xl md:text-4xl font-normal block mb-2">Hi, I'm</span>
                <span className="gradient-text">{portfolioConfig.personal.name}</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground mb-2">
                {portfolioConfig.personal.title}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {portfolioConfig.personal.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {portfolioConfig.personal.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/projects">View My Work</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/contact">Let's Connect</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              {portfolioConfig.socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="lg" asChild>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.icon === 'Github' && <Github className="h-6 w-6" />}
                    {social.icon === 'Linkedin' && <Linkedin className="h-6 w-6" />}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Skills</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Technologies and tools I work with daily
            </p>
            <Button asChild variant="outline">
              <Link to="/skills" className="inline-flex items-center">
                View All Skills <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {currentSkills.map((skill) => (
              <div key={skill} className="text-center p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Focus</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging my DevOps foundation to build secure, scalable platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Target Roles */}
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-syntax-green">Expanding Into</h3>
                <p className="text-muted-foreground mb-6">
                  Growing expertise in security, platform engineering, and site reliability
                </p>
                <div className="space-y-2">
                  {targetRoles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm font-medium">{role}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience CTA */}
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-syntax-blue">Experience</h3>
                <p className="text-muted-foreground mb-6">
                  3+ years building and scaling cloud infrastructure for enterprise clients
                </p>
                <Button asChild className="w-full">
                  <Link to="/experience">View Experience</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Infrastructure automation, monitoring solutions, and DevOps tooling
          </p>
          <Button asChild size="lg">
            <Link to="/projects">Explore Projects</Link>
          </Button>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Technical articles and best practices from the DevOps world
          </p>
          <Button asChild size="lg" variant="outline">
            <a 
              href="https://thisiskushal31.github.io/blogs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              Read Blog <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-in">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-sm text-muted-foreground">Years DevOps</div>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-syntax-green mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Projects Deployed</div>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold text-syntax-orange mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Achieved</div>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold text-syntax-purple mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Cloud Platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're looking for DevOps expertise or want to discuss the latest in platform engineering, 
            I'd love to connect and explore opportunities.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
