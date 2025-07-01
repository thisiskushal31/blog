
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LinkableHeading from '@/components/LinkableHeading';
import { portfolioConfig } from '@/config/portfolio';

const Skills = () => {
  const certifications = [
    'AWS Certified Solutions Architect',
    'Kubernetes Administrator (CKA)',
    'Docker Certified Associate',
    'HashiCorp Terraform Associate'
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <LinkableHeading level={1} id="technical-skills" className="text-4xl md:text-5xl font-bold mb-4">
            Technical Skills
          </LinkableHeading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across DevOps, Cloud, and Security domains
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioConfig.skills.categories.map((category, index) => (
            <Card key={category.title} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="tech-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center mb-16">
          <LinkableHeading level={2} id="certifications" className="text-3xl font-bold mb-8">
            Certifications & Training
          </LinkableHeading>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <Badge key={cert} variant="outline" className="text-sm py-2 px-4">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <LinkableHeading level={2} id="learning-path" className="text-3xl font-bold text-center mb-8">
            Current Learning Path
          </LinkableHeading>
          <Card>
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-syntax-blue mb-2">Security Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    DevSecOps practices, SAST/DAST tools, Security automation
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-syntax-green mb-2">Platform Engineering</h3>
                  <p className="text-sm text-muted-foreground">
                    Internal developer platforms, Service mesh, GitOps
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-syntax-purple mb-2">Site Reliability</h3>
                  <p className="text-sm text-muted-foreground">
                    SLI/SLO/SLA, Chaos engineering, Incident response
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Skills;
