// @ts-nocheck
"use client";

import ContactForm from "@/components/ContactForm";
import { AnimatedGradient } from "@/components/ui/aceternity/AnimatedGradient";
import { FloatingNavbar } from "@/components/ui/aceternity/FloatingNavbar";
import { HeroParallax } from "@/components/ui/aceternity/HeroParallax";
import { PortfolioGallery } from "@/components/ui/aceternity/PortfolioGallery";
import { SparklesText } from "@/components/ui/aceternity/SparklesText";
import { ThreeDCard } from "@/components/ui/aceternity/ThreeDCard";
import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaAws, FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiHtml5,
  SiJest,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

// Define types for our data
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink: string;
  githubLink: string;
}

// Mock data functions
function getMockProjectsData() {
  return [
    {
      id: "682bf7059ed95f87600647b0",
      title: "Opinia review Protal",
      description: "A modern Review protal website where you can ",
      technologies: [
        "NextJs",
        "Redux",
        "Node.js",
        "Express",
        "prisma",
        "TypeScript",
      ],
      image:
        "https://i.postimg.cc/g2sd66cF/Screenshot-2025-05-20-at-9-27-59-AM.png",
      demoLink: "https://review-protal.vercel.app/",
      githubLink: "https://github.com/Emtiaz-ahmed-13/review-protal",
    },
    {
      id: "682bf8ac9ed95f87600647b2",
      title: "A comprehenssive Book store",
      description: "A book store where you can find your favourite books ",
      technologies: [
        "NextJs",
        "Redux",
        "Node.js",
        "Express",
        "MongoDb",
        "TypeScript",
      ],
      image:
        "https://i.postimg.cc/rmnKGP8T/Screenshot-2025-05-20-at-9-35-14-AM.png",
      demoLink: "https://librant-client.vercel.app/",
      githubLink:
        "https://github.com/Emtiaz-ahmed-13/Librant_client?tab=readme-ov-file",
    },
    {
      id: "682bf9a79ed95f87600647b4",
      title: "FileDock – Secure Document Storage",
      description:
        "FileDock is a full-stack web app to securely store, manage, and access all your documents in one place. Built with Next.js and TypeScript for a fast and reliable experience.",
      technologies: ["NextJs", "TypeScript", "neon"],
      image:
        "https://i.postimg.cc/wx56dPKj/Screenshot-2025-05-20-at-9-39-47-AM.png",
      demoLink: "http://localhost:3000/",
      githubLink: "https://github.com/Emtiaz-ahmed-13/filedock",
    },
  ] as Project[];
}

function getMockProfileData() {
  return {
    name: "Emtiaz Ahmed",
    title: "Full Stack Developer",
    bio: "Passionate developer with expertise in MERN stack and modern web technologies.",
    email: "emtiaz@example.com",
    location: "Bangladesh",
    avatarUrl: "/profile.jpg",
    resumeUrl: "/resume.pdf",
    social: {
      github: "https://github.com/emtiaz-ahmed-13",
      linkedin: "https://linkedin.com/in/emtiaz-ahmed",
      twitter: "https://twitter.com/emtiaz_ahmed",
    },
    resume: {
      education: [
        {
          institution: "Bangladesh University of Engineering and Technology",
          degree: "Bachelor of Science in Computer Science",
          year: "2018-2022",
        },
      ],
      experience: [],
    },
  };
}

function getMockSkillsData() {
  return [
    {
      id: 1,
      category: "Frontend",
      items: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML/CSS", level: 90 },
      ] as { name: string; level: number }[],
    },
    {
      id: 2,
      category: "Backend",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "PostgreSQL", level: 70 },
        { name: "RESTful APIs", level: 85 },
      ] as { name: string; level: number }[],
    },
    {
      id: 3,
      category: "Tools & Technologies",
      items: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "CI/CD", level: 75 },
        { name: "Jest/Testing", level: 80 },
      ] as { name: string; level: number }[],
    },
  ];
}

const skillIconMap = {
  React: <FaReact className="text-sky-400" />,
  "Next.js": <SiNextdotjs className="text-black dark:text-white" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "HTML/CSS": <SiHtml5 className="text-orange-500" />,
  Nodejs: <FaNodeJs className="text-green-600" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  Express: <SiExpress className="text-gray-700 dark:text-gray-200" />,
  MongoDB: <SiMongodb className="text-green-700" />,
  PostgreSQL: <SiPostgresql className="text-blue-700" />,
  "RESTful APIs": <span>🔗</span>,
  Git: <FaGitAlt className="text-orange-600" />,
  Docker: <FaDocker className="text-blue-400" />,
  AWS: <FaAws className="text-yellow-500" />,
  "CI/CD": <span>⚙️</span>,
  "Jest/Testing": <SiJest className="text-red-500" />,
  "Problem Solving": <span>🧠</span>,
  Communication: <span>💬</span>,
  "Team Collaboration": <span>🤝</span>,
  "Time Management": <span>⏰</span>,
  Adaptability: <span>🔄</span>,
};

export default function Home() {
  const [data, setData] = useState({
    status: "loading",
    message: "Loading content...",
    profile: getMockProfileData(),
    projects: getMockProjectsData(),
    skills: [],
    experience: [],
    blogs: [],
  });

  // Add reference for parallax effect
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Create scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const position = "fixed";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects, skills, and experience from local API endpoints
        const [projectsRes, skillsRes, expRes, blogsRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/skills"),
          fetch("/api/experience"),
          fetch("/api/blogs"),
        ]);

        // Process responses and handle failures gracefully
        const projectsData = projectsRes.ok
          ? await projectsRes.json()
          : getMockProjectsData();
        const skillsData = skillsRes.ok
          ? await skillsRes.json()
          : getMockSkillsData();
        const experienceData = expRes.ok ? await expRes.json() : [];
        const blogsData = blogsRes.ok ? await blogsRes.json() : [];

        // Set all data with consistent API status message
        setData({
          status: "success",
          message: "Connected to API successfully",
          profile: getMockProfileData(),
          projects: projectsData,
          skills: skillsData,
          experience: experienceData,
          blogs: blogsData,
        });
      } catch (error) {
        console.warn("Using mock data:", error);
        setData({
          status: "warning",
          message: "Could not connect to API, showing demo content",
          profile: getMockProfileData(),
          projects: getMockProjectsData(),
          skills: getMockSkillsData(),
          experience: [],
          blogs: [],
        });
      }
    };
    fetchData();
  }, []);

  const {
    status,
    message,
    profile: profileData,
    projects: projectsData,
    skills: skillsData,
    experience: experienceData,
    blogs: blogsData,
  } = data;

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
      thumbnail: project.image,
      link: `#projects`,
      description: project.description.substring(0, 50) + "...",
    })),
  ];

  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Blogs", link: "/blogs" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Status Banner - Only show if status is not success */}
      {status !== "success" && (
        <div
          className={`w-full px-4 py-2 text-center text-sm ${
            status === "error"
              ? "bg-red-500/10 text-red-700 dark:text-red-300"
              : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* Floating Navbar */}
      <FloatingNavbar navItems={navItems} />

      {/* Hero Section with Parallax */}
      <div ref={targetRef} className="h-screen">
        <motion.div
          style={{ opacity, scale, position }}
          className="w-full h-screen top-0 left-0 z-10"
        >
          <HeroParallax products={featuredItems} />
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

            {/* Hero Card moved to About section */}
            <div className="mb-12">
              <ThreeDCard className="overflow-hidden bg-background/80 backdrop-blur-md border border-primary/20 shadow-xl max-w-2xl mx-auto">
                <div className="p-8 sm:p-10">
                  <SparklesText
                    words={profileData.name}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  />

                  <motion.p
                    className="text-xl md:text-2xl text-muted-foreground mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {profileData.title}
                  </motion.p>

                  <motion.div
                    className="flex gap-6 mt-8 justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
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
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </motion.a>
                      )
                    )}
                  </motion.div>
                </div>
              </ThreeDCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ThreeDCard className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-xl shadow-xl"
                  >
                    <Image
                      src={profileData.avatarUrl}
                      alt={profileData.name}
                      width={500}
                      height={500}
                      className="object-cover aspect-square w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white">
                        {profileData.name}
                      </h3>
                      <p className="text-white/80">{profileData.title}</p>
                    </div>
                  </motion.div>
                </ThreeDCard>
              </motion.div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
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
                <div className="mt-6">
                  <h4 className="font-medium text-lg mb-2">Experience</h4>
                  <AnimatePresence>
                    {experienceData.length > 0 ? (
                      <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: { staggerChildren: 0.15 },
                          },
                        }}
                        className="space-y-3"
                      >
                        {experienceData.map((exp, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-4 border border-muted/30 rounded-xl bg-muted/10"
                          >
                            <div className="font-semibold">
                              {exp.position} @ {exp.company}
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">
                              {exp.period}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {exp.description}
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm text-muted-foreground"
                      >
                        No experience data available.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 border border-muted/30 rounded-xl bg-muted/10"
                  >
                    <h4 className="font-medium text-lg">Education</h4>
                    <p className="text-sm text-muted-foreground">
                      {profileData.resume.education.length} Degrees
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-4 border border-muted/30 rounded-xl bg-muted/10"
                  >
                    <h4 className="font-medium text-lg">Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      {skillsData.reduce(
                        (acc, cat) => acc + cat.items.length,
                        0
                      )}{" "}
                      Technologies
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="p-4 border border-muted/30 rounded-xl bg-muted/10"
                  >
                    <h4 className="font-medium text-lg">Projects</h4>
                    <p className="text-sm text-muted-foreground">
                      {projectsData.length} Projects
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <a href={profileData.resumeUrl} download>
                    <Button
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Resume
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-8 lg:px-16 bg-muted/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <SparklesText words="My Skills" className="text-4xl mb-4" />
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              </motion.div>
            </div>
            <div className="space-y-12">
              {skillsData.map((category, catIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {category.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.2 + skillIndex * 0.05,
                          duration: 0.4,
                        }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-background border border-primary/20 shadow-sm text-base font-medium hover:bg-primary/10 hover:scale-105 transition-all cursor-pointer"
                      >
                        <span className="text-xl">
                          {skillIconMap[skill.name] || <span>💡</span>}
                        </span>
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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

            {/* Resume Download in Projects Section */}
            <motion.div
              className="mt-12 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ThreeDCard className="overflow-hidden bg-background/50 backdrop-blur-sm border border-primary/20">
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-3">Want to see more?</h3>
                  <p className="text-muted-foreground mb-4">
                    Check out my full resume for complete details about my
                    experience and skills.
                  </p>
                  <a
                    href={profileData.resumeUrl}
                    download
                    className="inline-block"
                  >
                    <Button
                      variant="default"
                      size="lg"
                      className="rounded-full px-8 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Resume
                    </Button>
                  </a>
                </div>
              </ThreeDCard>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8 lg:px-16 bg-muted/10">
          <AnimatedGradient
            gradientColors={[
              "rgba(139, 92, 246, 0.08)",
              "rgba(125, 211, 252, 0.08)",
            ]}
            className="py-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <SparklesText words="Get In Touch" className="text-4xl mb-4" />
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
                  Interested in working together? Feel free to reach out to me
                  for collaboration opportunities or just to say hello!
                </p>
              </div>

              <ThreeDCard>
                <div className="p-8 bg-background/80 backdrop-blur-sm rounded-xl">
                  <ContactForm />
                </div>
              </ThreeDCard>
            </div>
          </AnimatedGradient>
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
