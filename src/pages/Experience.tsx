
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import LinkableHeading from '@/components/LinkableHeading';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      type: 'Full-time',
      description: 'Leading infrastructure automation and cloud migration initiatives for enterprise clients.',
      achievements: [
        'Reduced deployment time by 75% through CI/CD pipeline optimization',
        'Migrated 50+ applications to Kubernetes, improving scalability',
        'Implemented Infrastructure as Code reducing manual errors by 90%',
        'Led security compliance initiatives achieving SOC 2 certification'
      ],
      technologies: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Docker', 'Python', 'Prometheus'],
      links: []
    },
    {
      title: 'DevOps Engineer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      period: '2021 - 2022',
      type: 'Full-time',
      description: 'Built and maintained cloud infrastructure for a fast-growing fintech startup.',
      achievements: [
        'Designed multi-region AWS architecture serving 100K+ users',
        'Implemented monitoring stack reducing MTTR by 60%',
        'Automated backup and disaster recovery procedures',
        'Mentored junior developers on DevOps best practices'
      ],
      technologies: ['AWS', 'Docker', 'Ansible', 'GitLab CI', 'ELK Stack', 'Redis'],
      links: []
    },
    {
      title: 'Cloud Infrastructure Specialist',
      company: 'CloudFirst Consulting',
      location: 'Remote',
      period: '2020 - 2021',
      type: 'Contract',
      description: 'Provided cloud migration and DevOps consulting services to various clients.',
      achievements: [
        'Successfully migrated 15+ client workloads to cloud',
        'Reduced infrastructure costs by 40% through optimization',
        'Implemented CI/CD pipelines for multiple technology stacks',
        'Delivered training workshops on cloud best practices'
      ],
      technologies: ['AWS', 'Azure', 'Terraform', 'Docker', 'GitHub Actions'],
      links: []
    },
    {
      title: 'Systems Administrator',
      company: 'Enterprise Corp',
      location: 'Dallas, TX',
      period: '2019 - 2020',
      type: 'Full-time',
      description: 'Managed on-premises infrastructure and began cloud adoption initiatives.',
      achievements: [
        'Maintained 99.9% uptime for critical business systems',
        'Led initial cloud adoption strategy and proof of concepts',
        'Automated routine maintenance tasks saving 20 hours/week',
        'Implemented centralized logging and monitoring solutions'
      ],
      technologies: ['Linux', 'VMware', 'Python', 'Bash', 'Nagios', 'MySQL'],
      links: []
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Texas at Austin',
      period: '2015 - 2019',
      highlights: ['Graduated Summa Cum Laude', 'Computer Systems Track', 'Relevant Coursework: Distributed Systems, Network Security, Database Systems']
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <LinkableHeading level={1} id="professional-experience" className="text-4xl md:text-5xl font-bold mb-4">
            Professional Experience
          </LinkableHeading>
          <p className="text-xl text-muted-foreground">
            My journey from Systems Administration to DevOps Engineering
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 mb-16">
          {experiences.map((exp, index) => (
            <Card key={index} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                    <div className="space-y-2">
                      <div className="flex items-center text-lg font-semibold text-primary">
                        {exp.company}
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{exp.description}</p>
                
                {/* Key Achievements */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="tech-badge">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {exp.links.length > 0 && (
                  <div className="flex space-x-2">
                    {exp.links.map((link, i) => (
                      <Button key={i} variant="outline" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Education */}
        <div>
          <LinkableHeading level={2} id="education" className="text-3xl font-bold mb-8 text-center">
            Education
          </LinkableHeading>
          {education.map((edu, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                  <p className="text-lg text-primary font-medium mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground mb-4">{edu.period}</p>
                  <div className="space-y-1">
                    {edu.highlights.map((highlight, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{highlight}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Download Resume CTA */}
        <div className="text-center mt-16">
          <LinkableHeading level={3} id="resume" className="text-2xl font-semibold mb-4">
            Want the Full Details?
          </LinkableHeading>
          <p className="text-muted-foreground mb-6">
            Download my complete resume for a comprehensive view of my experience and qualifications.
          </p>
          <Button size="lg" asChild>
            <a href="#" download>
              Download Resume (PDF)
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
