
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Clock, Download, Calendar, Globe, BookOpen, Folder, Award, Briefcase } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio';
import LinkableHeading from '@/components/LinkableHeading';

const Contact = () => {
  const iconMap = {
    Mail,
    Download,
    Calendar,
    Globe,
    BookOpen,
    Folder,
    Award,
    Briefcase
  };

  const collaborationTypes = [
    {
      title: 'Full-time Opportunities',
      description: 'DevSecOps, SRE, Platform Engineering, Cloud Engineering roles',
      tags: ['Remote', 'Hybrid', 'On-site']
    },
    {
      title: 'Consulting Projects',
      description: 'Infrastructure automation, cloud migration, DevOps transformation',
      tags: ['Short-term', 'Long-term', 'Advisory']
    },
    {
      title: 'Speaking & Training',
      description: 'Conference talks, workshops, team training on DevOps practices',
      tags: ['Conferences', 'Workshops', 'Mentoring']
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <LinkableHeading level={1} id="contact" className="text-4xl md:text-5xl font-bold mb-4">
            Let's Connect
          </LinkableHeading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for DevOps expertise or want to discuss the latest in cloud engineering, 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Get In Touch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href={`mailto:${portfolioConfig.personal.email}`}
                      className="text-primary hover:underline"
                    >
                      {portfolioConfig.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{portfolioConfig.personal.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Timezone</p>
                    <p className="text-muted-foreground">{portfolioConfig.personal.timezone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {portfolioConfig.quickActions.map((action) => {
                const IconComponent = iconMap[action.icon as keyof typeof iconMap];
                return (
                  <Button 
                    key={action.name}
                    asChild 
                    variant="outline" 
                    className="w-full justify-start h-auto p-3" 
                  >
                    <a 
                      href={action.url} 
                      target={action.url.startsWith('http') ? "_blank" : undefined}
                      rel={action.url.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        {IconComponent && <IconComponent className="h-4 w-4 flex-shrink-0" />}
                        <div className="text-left">
                          <div className="font-medium">{action.name}</div>
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Collaboration Types */}
        <div className="mb-16">
          <LinkableHeading level={2} id="collaboration" className="text-3xl font-bold text-center mb-8">
            Open to Collaboration
          </LinkableHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {collaborationTypes.map((type, index) => (
              <Card key={type.title} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {type.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Response Time */}
        <Card className="text-center">
          <CardContent className="pt-8">
            <LinkableHeading level={3} id="response-time" className="text-2xl font-semibold mb-4">
              Response Time
            </LinkableHeading>
            <p className="text-muted-foreground mb-4">
              I typically respond to emails within <strong>24 hours</strong> during business days.
              For urgent matters, please mention "URGENT" in your subject line.
            </p>
            <p className="text-sm text-muted-foreground">
              Best time to reach me: 9 AM - 6 PM PST, Monday - Friday
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
