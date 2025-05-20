"use client";

import { Button } from "@/components/ui/button";
import { Experience, Project } from "@/lib/redux/types";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import ContactForm from "./ContactForm";
import { AnimatedGradient } from "./ui/aceternity/AnimatedGradient";
import { FloatingNavbar } from "./ui/aceternity/FloatingNavbar";
import { HeroParallax } from "./ui/aceternity/HeroParallax";
import { PortfolioGallery } from "./ui/aceternity/PortfolioGallery";
import { SparklesText } from "./ui/aceternity/SparklesText";
import { ThreeDCard } from "./ui/aceternity/ThreeDCard";
import { WaveText } from "./ui/aceternity/WaveText";

// Define the SkillCategory type that was missing
interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: number;
  category: string;
  items: Skill[];
}

interface HomePageProps {
  profileData: {
    name: string;
    title: string;
    bio: string;
    location: string;
    avatarUrl: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
    };
    resume: {
      education: {
        institution: string;
        degree: string;
        year: string;
      }[];
      experience: Experience[];
    };
  };
  projectsData: Project[];
  skillsData: SkillCategory[];
}

export default function HomePage({
  profileData,
  projectsData,
  skillsData,
}: HomePageProps) {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Blogs", link: "/blogs" },
    { name: "Contact", link: "#contact" },
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed";
  });

  // Create featured items for the hero parallax
  const featuredItems = [
    {
      title: profileData.name,
      thumbnail: profileData.avatarUrl,
      link: "#about",
      description: profileData.title,
    },
    ...projectsData.slice(0, 5).map((project) => ({
      title: project.title,
      thumbnail: project.image || "/placeholder.jpg",
      link: `#projects`,
      description: project.description || "Portfolio project",
    })),
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated Navbar */}
      <FloatingNavbar navItems={navItems} />

      {/* Hero Section with Parallax */}
      <div ref={targetRef} className="h-screen">
        <motion.div
          style={{ opacity, scale, position }}
          className="w-full h-screen top-0 left-0 z-10"
        >
          <HeroParallax products={featuredItems} />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl mx-auto"
                >
                  <ThreeDCard className="overflow-hidden bg-background/80 backdrop-blur-md border border-primary/20 shadow-xl">
                    <div className="p-8 sm:p-10">
                      <SparklesText
                        words={profileData.name}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                      />

                      <WaveText
                        text={profileData.title}
                        delay={0.4}
                        className="text-xl md:text-2xl text-muted-foreground mb-6"
                      />

                      <motion.p
                        className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      >
                        {profileData.bio.substring(0, 120)}...
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <Link href="#projects">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="default"
                              size="lg"
                              className="rounded-full px-8"
                            >
                              View Projects
                            </Button>
                          </motion.div>
                        </Link>
                        <Link href="#contact">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              size="lg"
                              className="rounded-full px-8"
                            >
                              Contact Me
                            </Button>
                          </motion.div>
                        </Link>
                      </motion.div>

                      {/* Social links */}
                      <motion.div
                        className="flex gap-6 mt-8 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      >
                        {Object.entries(profileData.social).map(
                          ([platform, url], index) => (
                            <motion.a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              whileHover={{ y: -5 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                                delay: index * 0.1,
                              }}
                            >
                              {platform.charAt(0).toUpperCase() +
                                platform.slice(1)}
                            </motion.a>
                          )
                        )}
                      </motion.div>
                    </div>
                  </ThreeDCard>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content starts here */}
      <div className="bg-background">
        {/* About Section */}
        <section id="about" className="py-20 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SparklesText words="About Me" className="text-4xl mb-4" />
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8 md:mb-0 overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    width={500}
                    height={500}
                    className="object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">
                      {profileData.name}
                    </h3>
                    <p className="text-white/80">{profileData.title}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">My Story</h3>
                <p className="text-muted-foreground">{profileData.bio}</p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {profileData.location}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-muted/30 rounded-xl">
                    <h4 className="font-medium text-lg">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      {profileData.resume.experience.length} Jobs
                    </p>
                  </div>
                  <div className="p-4 border border-muted/30 rounded-xl">
                    <h4 className="font-medium text-lg">Education</h4>
                    <p className="text-sm text-muted-foreground">
                      {profileData.resume.education.length} Degrees
                    </p>
                  </div>
                  <div className="p-4 border border-muted/30 rounded-xl">
                    <h4 className="font-medium text-lg">Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      {skillsData.reduce(
                        (acc, cat) => acc + cat.items.length,
                        0
                      )}{" "}
                      Technologies
                    </p>
                  </div>
                  <div className="p-4 border border-muted/30 rounded-xl">
                    <h4 className="font-medium text-lg">Projects</h4>
                    <p className="text-sm text-muted-foreground">
                      {projectsData.length} Total
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-xl font-bold mb-4">
                    Featured Experience
                  </h4>
                  {profileData.resume.experience
                    .slice(0, 2)
                    .map((exp, index) => (
                      <ThreeDCard key={index} className="mb-4">
                        <div className="p-6 bg-muted/30 rounded-xl">
                          <h5 className="font-bold text-lg">
                            {exp.position} at {exp.company}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {exp.period}
                          </p>
                          <p className="mt-2">{exp.description}</p>
                        </div>
                      </ThreeDCard>
                    ))}
                  <Link href="#experience">
                    <Button variant="ghost" className="mt-2">
                      View more →
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-8 lg:px-16 bg-muted/20">
          <AnimatedGradient
            gradientColors={[
              "rgba(125, 211, 252, 0.08)",
              "rgba(139, 92, 246, 0.08)",
            ]}
            className="py-12"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <SparklesText words="My Skills" className="text-4xl mb-4" />
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillsData.map((category, catIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-background/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
                        {category.category}
                      </h3>
                      <div className="space-y-5">
                        {category.items.map((skill, skillIndex) => (
                          <div key={skillIndex} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-muted-foreground">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.2 + skillIndex * 0.1,
                                  ease: "easeOut",
                                }}
                                viewport={{ once: true }}
                                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedGradient>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SparklesText words="My Projects" className="text-4xl mb-4" />
              <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Check out some of my latest projects. Each project showcases
                different skills and technologies I&apos;ve worked with.
              </p>
            </div>

            <PortfolioGallery projects={projectsData} />
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section id="experience" className="py-20 px-8 lg:px-16 bg-muted/20">
          <AnimatedGradient
            gradientColors={[
              "rgba(125, 211, 252, 0.08)",
              "rgba(139, 92, 246, 0.08)",
            ]}
            className="py-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <SparklesText
                  words="Work Experience"
                  className="text-4xl mb-4"
                />
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              </div>

              <div className="relative border-l-2 border-primary/30 pl-8 ml-4 space-y-12">
                {profileData.resume.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[42px] w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <ThreeDCard>
                      <div className="p-6 bg-background rounded-xl">
                        <h5 className="font-bold text-xl">{exp.position}</h5>
                        <p className="text-primary font-medium">
                          {exp.company}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {exp.period}
                        </p>
                        <p>{exp.description}</p>
                      </div>
                    </ThreeDCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedGradient>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <SparklesText words="Get In Touch" className="text-4xl mb-4" />
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
                Interested in working together? Feel free to reach out to me for
                collaboration opportunities or just to say hello!
              </p>
            </div>

            <ThreeDCard>
              <div className="p-8 bg-background/80 backdrop-blur-sm rounded-xl">
                <ContactForm />
              </div>
            </ThreeDCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-8 lg:px-16 border-t">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} {profileData.name}. All rights
              reserved.
            </motion.p>
            <div className="flex gap-6">
              {Object.entries(profileData.social).map(([platform, url], i) => (
                <motion.a
                  key={platform}
                  href={url}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
