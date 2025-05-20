// Redux State Types
import { Blog } from "../slices/blogsSlice";

// Auth State
export interface AuthState {
  token: string | null;
  user: unknown | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Blog State
export interface BlogsState {
  data: Blog[];
  loading: boolean;
  error: string | null;
  selectedBlog: Blog | null;
  submitStatus: "idle" | "loading" | "success" | "error";
}

// Profile State Types
export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatarUrl: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  resume: {
    education: Education[];
    experience: Experience[];
  };
}

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

// Projects State Types
export interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink: string;
  githubLink: string;
}

export interface ProjectsState {
  data: Project[];
  loading: boolean;
  error: string | null;
  selectedProject: Project | null;
}

// UI State Types
export interface UIState {
  connectionStatus: {
    status: "connected" | "disconnected" | "warning" | "unknown";
    message: string;
  };
  notifications: {
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    timeout?: number;
  }[];
  theme: "light" | "dark" | "system";
}
