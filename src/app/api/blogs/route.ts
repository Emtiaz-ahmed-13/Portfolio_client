import { NextResponse } from "next/server";

// Define the Blog interface
export interface BlogData {
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

// Sample blogs data
export const blogs: BlogData[] = [
  {
    _id: "1",
    title: "Getting Started with React Hooks",
    content:
      "<p>React Hooks are a powerful feature that allows you to use state and other React features without writing a class. In this tutorial, we will explore the most commonly used hooks: useState, useEffect, and useContext.</p><h2>useState</h2><p>The useState hook allows you to add state to functional components. It returns a stateful value and a function to update it.</p><pre><code>const [count, setCount] = useState(0);</code></pre><h2>useEffect</h2><p>The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.</p><pre><code>useEffect(() => {\n  document.title = `You clicked ${count} times`;\n  return () => {\n    // Cleanup code\n  };\n}, [count]);</code></pre>",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
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
    summary: "Learn how to create a RESTful API using Express.js and MongoDB.",
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
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
    summary:
      "Understand the differences between CSS Grid and Flexbox and when to use each layout system.",
    author: "Emtiaz Ahmed",
    tags: ["CSS", "Flexbox", "Grid", "Frontend", "Layout"],
    createdAt: "2023-08-05T08:20:00Z",
    updatedAt: "2023-08-05T08:20:00Z",
  },
];

// Get all blogs
export async function GET() {
  try {
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// Get a single blog by ID (used in dynamic route)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const blog = blogs.find((b) => b._id === id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
