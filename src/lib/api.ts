"use client";

// API utility functions

// Helper to get base URL
const getBaseUrl = () => {
  // Use the environment variable for the API URL
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";
};

// Define types for backend data
interface BackendProject {
  _id: string;
  title?: string;
  description?: string;
  technologies?: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  liveLink?: string;
  githubLink?: string;
}

// Blog interfaces
export interface Blog {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  summary?: string;
  author?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Get profile data (using project data as profile for now)
export async function getProfile() {
  try {
    // Return a constructed profile object (since no profile endpoint exists)
    return {
      name: "Emtiaz Ahmed",
      title: "Full Stack Developer",
      bio: "Passionate developer with expertise in MERN stack and modern web technologies.",
      email: "emtiaz@example.com",
      location: "Bangladesh",
      avatarUrl: "https://github.com/shadcn.png",
      social: {
        github: "https://github.com/emtiaz-ahmed-13",
        linkedin: "https://linkedin.com/in/emtiaz-ahmed",
        twitter: "https://twitter.com/emtiaz_ahmed",
      },
      resume: {
        education: [
          {
            institution: "Brac university",
            degree: "Bachelor of Science in Computer Science",
            year: "2021-2027",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

// Get all projects
export async function getProjects() {
  try {
    const baseUrl = getBaseUrl();
    console.log(
      "Fetching projects from:",
      `${baseUrl}/project/get-all-projects`
    );

    const response = await fetch(`${baseUrl}/project/get-all-projects`, {
      cache: "no-store", // Disable caching
      headers: {
        "Content-Type": "application/json",
      },
      // Set a reasonable timeout to avoid long waits if backend is down
      signal: AbortSignal.timeout(3000),
    });

    console.log("Projects response status:", response.status);

    if (!response.ok) {
      console.error("Failed to fetch projects:", await response.text());
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();
    console.log("Projects data:", data);

    // Map backend data to match our frontend structure
    return data.map((project: BackendProject) => ({
      id: project._id,
      title: project.title || "Untitled Project",
      description: project.description || "No description available",
      technologies: project.techStack ||
        project.technologies || ["React", "Node.js"],
      image: project.image || "/next.svg",
      demoLink: project.liveLink || project.demoUrl || "#",
      githubLink: project.githubLink || project.githubUrl || "#",
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Get a single project by ID
export async function getProject(id: number | string) {
  try {
    const baseUrl = getBaseUrl();
    console.log(
      "Fetching project from:",
      `${baseUrl}/project/get-single-project/${id}`
    );

    const response = await fetch(
      `${baseUrl}/project/get-single-project/${id}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Project response status:", response.status);

    if (!response.ok) {
      console.error("Failed to fetch project:", await response.text());
      throw new Error("Failed to fetch project");
    }

    const project = await response.json();
    console.log("Project data:", project);

    // Map backend data to match our frontend structure if needed
    return {
      id: project._id,
      title: project.title || "Untitled Project",
      description: project.description || "No description available",
      technologies: project.technologies || ["React", "Node.js"],
      image: project.image || "/next.svg",
      demoLink: project.demoUrl || "#",
      githubLink: project.githubUrl || "#",
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

// Get all skills (mocked since there's no skills endpoint)
export async function getSkills() {
  try {
    // Return mock skills data since there's no dedicated endpoint
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
        ],
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
        ],
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
        ],
      },
    ];
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
}

// Get a skill category by ID (mocked)
export async function getSkillCategory(id: number) {
  try {
    // Return a mock skill category since there's no dedicated endpoint
    const categories = await getSkills();
    return categories.find((category) => category.id === id) || categories[0];
  } catch (error) {
    console.error("Error fetching skill category:", error);
    throw error;
  }
}

// Submit contact form
export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const baseUrl = getBaseUrl();
    console.log("Sending message to:", `${baseUrl}/message/create-message`);
    console.log("Message data:", data);

    const response = await fetch(`${baseUrl}/message/create-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    console.log("Message response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to submit message:", errorData);
      throw new Error(
        errorData.error || errorData.message || "Failed to submit form"
      );
    }

    const result = await response.json();
    console.log("Message success:", result);
    return result;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

// Blog API Functions

// Get all blogs
export async function getBlogs() {
  try {
    const baseUrl = getBaseUrl();
    console.log("Fetching blogs from:", `${baseUrl}/blog/get-all-blogs`);

    try {
      const response = await fetch(`${baseUrl}/blog/get-all-blogs`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout to avoid hanging if backend is down
        signal: AbortSignal.timeout(3000),
      });

      console.log("Blogs response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Blogs data:", data);
        return {
          status: "success",
          message: "Blogs loaded from backend",
          data,
        };
      } else {
        console.error(
          `Failed to fetch blogs: ${response.status} ${response.statusText}`
        );
        // Return mock blogs if API fails
        return {
          status: "warning",
          message: "Using demo blog content (backend returned an error)",
          data: getMockBlogs(),
        };
      }
    } catch (error) {
      console.warn("Could not connect to backend, using mock blogs:", error);
      return {
        status: "warning",
        message: "Using demo blog content (could not connect to backend)",
        data: getMockBlogs(),
      };
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      status: "error",
      message: "Error loading blogs, displaying fallback content",
      data: getMockBlogs(),
    };
  }
}

// Get a single blog
export async function getBlog(id: string) {
  try {
    const baseUrl = getBaseUrl();
    console.log("Fetching blog from:", `${baseUrl}/blog/get-single-blog/${id}`);

    try {
      const response = await fetch(`${baseUrl}/blog/get-single-blog/${id}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout to avoid hanging if backend is down
        signal: AbortSignal.timeout(3000),
      });

      console.log("Blog response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Blog data:", data);
        return {
          status: "success",
          message: "Blog loaded from backend",
          data,
        };
      } else {
        console.error(
          `Failed to fetch blog: ${response.status} ${response.statusText}`
        );
        // Return mock blog if API fails
        const mockBlog =
          getMockBlogs().find((blog) => blog._id === id) || getMockBlogs()[0];
        return {
          status: "warning",
          message: "Using demo blog content (backend returned an error)",
          data: mockBlog,
        };
      }
    } catch (error) {
      console.warn("Could not connect to backend, using mock blog:", error);
      const mockBlog =
        getMockBlogs().find((blog) => blog._id === id) || getMockBlogs()[0];
      return {
        status: "warning",
        message: "Using demo blog content (could not connect to backend)",
        data: mockBlog,
      };
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      status: "error",
      message: "Error loading blog, displaying fallback content",
      data: getMockBlogs()[0],
    };
  }
}

// Create a new blog
export async function createBlog(
  blogData: Omit<Blog, "_id" | "createdAt" | "updatedAt">
) {
  try {
    const baseUrl = getBaseUrl();
    console.log("Creating blog at:", `${baseUrl}/blog/create-blog`);
    console.log("Blog data:", blogData);

    const response = await fetch(`${baseUrl}/blog/create-blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    console.log("Create blog response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create blog:", errorData);
      throw new Error(
        errorData.error || errorData.message || "Failed to create blog"
      );
    }

    const result = await response.json();
    console.log("Create blog success:", result);
    return result;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

// Update a blog
export async function updateBlog(
  id: string,
  blogData: Partial<Omit<Blog, "_id" | "createdAt" | "updatedAt">>
) {
  try {
    const baseUrl = getBaseUrl();
    console.log("Updating blog at:", `${baseUrl}/blog/update-blog/${id}`);
    console.log("Blog data:", blogData);

    const response = await fetch(`${baseUrl}/blog/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    console.log("Update blog response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update blog:", errorData);
      throw new Error(
        errorData.error || errorData.message || "Failed to update blog"
      );
    }

    const result = await response.json();
    console.log("Update blog success:", result);
    return result;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

// Delete a blog
export async function deleteBlog(id: string) {
  try {
    const baseUrl = getBaseUrl();
    console.log("Deleting blog at:", `${baseUrl}/blog/delete-blog/${id}`);

    const response = await fetch(`${baseUrl}/blog/delete-blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Delete blog response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete blog:", errorData);
      throw new Error(
        errorData.error || errorData.message || "Failed to delete blog"
      );
    }

    const result = await response.json();
    console.log("Delete blog success:", result);
    return result;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}

// Mock blog data
function getMockBlogs(): Blog[] {
  return [
    {
      _id: "1",
      title: "Getting Started with React Hooks",
      content:
        "<p>React Hooks are a powerful feature that allows you to use state and other React features without writing a class. In this tutorial, we will explore the most commonly used hooks: useState, useEffect, and useContext.</p><h2>useState</h2><p>The useState hook allows you to add state to functional components. It returns a stateful value and a function to update it.</p><pre><code>const [count, setCount] = useState(0);</code></pre><h2>useEffect</h2><p>The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.</p><pre><code>useEffect(() => {\n  document.title = `You clicked ${count} times`;\n  return () => {\n    // Cleanup code\n  };\n}, [count]);</code></pre>",
      coverImage:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      summary:
        "Learn how to use React Hooks to simplify your components and make them more reusable.",
      author: "Emtiaz Ahmed",
      tags: ["React", "Hooks", "JavaScript", "Frontend"],
      createdAt: "2023-06-15T10:30:00Z",
      updatedAt: "2023-06-15T10:30:00Z",
    },
    {
      _id: "2",
      title: "Building a REST API with Express and MongoDB",
      content:
        "<p>Building a REST API with Express and MongoDB is a common task for backend developers. In this tutorial, we will create a simple API for a blog application.</p><h2>Setting up the project</h2><p>First, let's initialize our Node.js project and install the required dependencies:</p><pre><code>npm init -y\nnpm install express mongoose cors dotenv</code></pre><h2>Creating the MongoDB connection</h2><p>Next, let's set up our MongoDB connection using Mongoose:</p><pre><code>const mongoose = require('mongoose');\n\nmongoose.connect(process.env.MONGODB_URI, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n})\n.then(() => console.log('Connected to MongoDB'))\n.catch(err => console.error('Could not connect to MongoDB', err));</code></pre>",
      coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
      summary:
        "Learn how to create a RESTful API using Express.js and MongoDB.",
      author: "Emtiaz Ahmed",
      tags: ["Node.js", "Express", "MongoDB", "API", "Backend"],
      createdAt: "2023-07-20T14:45:00Z",
      updatedAt: "2023-07-21T09:15:00Z",
    },
    {
      _id: "3",
      title: "CSS Grid vs Flexbox: When to Use Each",
      content:
        "<p>CSS Grid and Flexbox are two powerful layout systems in CSS. While they have some similarities, they are designed for different purposes.</p><h2>Flexbox: One-dimensional Layout</h2><p>Flexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for:</p><ul><li>Navigation menus</li><li>Form controls</li><li>Components that need to be aligned within a container</li></ul><pre><code>.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}</code></pre><h2>CSS Grid: Two-dimensional Layout</h2><p>CSS Grid is designed for two-dimensional layouts - rows and columns together. It's ideal for:</p><ul><li>Page layouts</li><li>Card layouts</li><li>Complex grid systems</li></ul><pre><code>.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}</code></pre>",
      coverImage:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
      summary:
        "Understand the differences between CSS Grid and Flexbox and when to use each layout system.",
      author: "Emtiaz Ahmed",
      tags: ["CSS", "Flexbox", "Grid", "Frontend", "Layout"],
      createdAt: "2023-08-05T08:20:00Z",
      updatedAt: "2023-08-05T08:20:00Z",
    },
  ];
}
