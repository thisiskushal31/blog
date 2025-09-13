import { Link } from "react-router-dom";
import { BLOG_BASE_PATH } from "@/config/config";
import { Github, Linkedin, Mail, Globe, ArrowRight, BookOpen } from "lucide-react";

// Footer.tsx - Footer component for the blog application with Palark-inspired design.
// This component displays navigation links, social media links, and copyright information.
// It provides easy access to the main portfolio, bio link, and social profiles.
const Footer = () => {
  const navigationLinks = [
    {
      name: "Home",
      url: `${BLOG_BASE_PATH}`,
      description: "Blog home page",
      icon: <ArrowRight className="w-4 h-4" />,
    },
    {
      name: "Portfolio Website",
      url: "https://thisiskushal31.github.io/#/",
      description: "Main portfolio website",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      name: "Bio Link",
      url: "https://thisiskushal31.github.io/link/#/",
      description: "Bio link page",
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  const socialLinks = [
    {
      name: "Website",
      url: "https://thisiskushal31.github.io",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      name: "E-Mail",
      url: "mailto:guptakushal070@gmail.com",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/thisiskushalgupta/",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/thisiskushal31",
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: "Blog",
      url: "https://thisiskushal31.github.io/blog/",
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="border-t border-blue-100 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Navigation</h3>
            <div className="grid grid-cols-1 gap-3">
              {navigationLinks.map((link) => (
                <div key={link.name}>
                  {link.url.startsWith("http") ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 group"
                      title={link.description}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.url}
                      className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 group"
                      title={link.description}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 group"
                  title={link.name}
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">About</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Tech blog by Kushal Gupta covering DevOps, Platform Engineering,
              Cloud Infrastructure, Automation, and Software Development topics.
            </p>
            <div className="pt-2">
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Focused on practical insights and real-world solutions for modern technology challenges.
              </p>
            </div>
            {/* Copyright moved to About section */}
            <div className="pt-4">
              <p className="text-slate-600 dark:text-slate-300 text-sm">
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
