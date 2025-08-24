import { Link } from "react-router-dom";
import { BLOG_BASE_PATH } from "@/config/config";

// Footer.tsx - Footer component for the blog application.
// This component displays navigation links, social media links, and copyright information.
// It provides easy access to the main portfolio, bio link, and social profiles.
const Footer = () => {
  const navigationLinks = [
    {
      name: "Home",
      url: `${BLOG_BASE_PATH}`,
      description: "Blog home page",
    },
    {
      name: "Portfolio Website",
      url: "https://thisiskushal31.github.io/#/",
      description: "Main portfolio website",
    },
    {
      name: "Bio Link",
      url: "https://thisiskushal31.github.io/link/#/",
      description: "Bio link page",
    },
  ];

  const socialLinks = [
    {
      name: "Website",
      url: "https://thisiskushal31.github.io",
      icon: "fas fa-globe",
    },
    {
      name: "E-Mail",
      url: "mailto:guptakushal070@gmail.com",
      icon: "fa-solid fa-envelope",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/thisiskushalgupta/",
      icon: "fab fa-linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/thisiskushal31",
      icon: "fab fa-github",
    },
    {
      name: "Blog",
      url: "https://thisiskushal31.github.io/blog/",
      icon: "fas fa-blog",
    },
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <div className="grid grid-cols-1 gap-3">
              {navigationLinks.map((link) => (
                <div key={link.name}>
                  {link.url.startsWith("http") ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50"
                      title={link.description}
                    >
                      <i className="fas fa-arrow-right w-4 h-4"></i>
                      <span className="text-sm">{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.url}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50"
                      title={link.description}
                    >
                      <i className="fas fa-arrow-right w-4 h-4"></i>
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50"
                  title={link.name}
                >
                  <i className={`${link.icon} w-4 h-4`}></i>
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tech blog by Kushal Gupta covering DevOps, Platform Engineering,
              Cloud Infrastructure, Automation, and Software Development topics.
            </p>
            {/* Copyright */}
            <div className="pt-4">
              <p className="text-muted-foreground text-sm">
                © 2025 Kushal Gupta. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
