import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Job from "./models/Job.js";
import User from "./models/User.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/job-portal-pro";

const sampleJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for a passionate Senior Frontend Developer to join our growing team. You will be responsible for building user-facing features and ensuring the best user experience across our web applications.\n\nResponsibilities:\n- Develop and maintain user-facing features\n- Build reusable components and front-end libraries\n- Optimize applications for maximum speed and scalability\n- Collaborate with back-end developers and web designers\n- Stay up-to-date with emerging technologies\n\nRequirements:\n- 5+ years of experience in frontend development\n- Strong proficiency in React, TypeScript, and modern JavaScript\n- Experience with state management libraries (Redux, Zustand)\n- Knowledge of responsive design and mobile-first development\n- Experience with testing frameworks (Jest, React Testing Library)",
    type: "full-time",
    tags: ["React", "TypeScript", "JavaScript", "Frontend", "Web Development"],
    remote: true,
    salaryMin: 120000,
    salaryMax: 150000,
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&q=80&auto=format&fit=crop",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    description:
      "Join our dynamic startup as a Full Stack Engineer and help us build the next generation of web applications. You'll work on both frontend and backend systems, contributing to our product development from conception to deployment.\n\nWhat you'll do:\n- Design and implement scalable web applications\n- Work with modern technologies including Node.js, React, and MongoDB\n- Collaborate with product managers and designers\n- Write clean, maintainable, and well-tested code\n- Participate in code reviews and technical discussions\n\nWhat we're looking for:\n- 3+ years of full-stack development experience\n- Proficiency in JavaScript, Node.js, and React\n- Experience with databases (MongoDB, PostgreSQL)\n- Knowledge of cloud platforms (AWS, Vercel)\n- Strong problem-solving and communication skills",
    type: "full-time",
    tags: ["Node.js", "React", "MongoDB", "Full Stack", "JavaScript"],
    remote: false,
    salaryMin: 90000,
    salaryMax: 120000,
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=80&auto=format&fit=crop",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    description:
      "We're seeking a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You'll work with cutting-edge cloud technologies and automation tools to ensure our systems are reliable, secure, and performant.\n\nKey responsibilities:\n- Design and implement CI/CD pipelines\n- Manage cloud infrastructure on AWS/Azure\n- Automate deployment and monitoring processes\n- Ensure system security and compliance\n- Collaborate with development teams\n\nRequired skills:\n- 4+ years of DevOps experience\n- Strong knowledge of AWS, Docker, and Kubernetes\n- Experience with Infrastructure as Code (Terraform, CloudFormation)\n- Proficiency in scripting languages (Python, Bash)\n- Knowledge of monitoring and logging tools",
    type: "full-time",
    tags: ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
    remote: true,
    salaryMin: 110000,
    salaryMax: 140000,
  },
  {
    title: "UI/UX Designer",
    company: "DesignStudio Pro",
    image: "https://images.unsplash.com/photo-1559027615-5ee47b8d5130?w=800&q=80&auto=format&fit=crop",
    location: "Los Angeles, CA",
    salary: "$80,000 - $100,000",
    description:
      "We're looking for a creative UI/UX Designer to join our design team. You'll be responsible for creating intuitive and engaging user experiences across our digital products.\n\nWhat you'll do:\n- Design user interfaces for web and mobile applications\n- Conduct user research and usability testing\n- Create wireframes, prototypes, and high-fidelity designs\n- Collaborate with developers and product managers\n- Maintain design systems and style guides\n\nRequirements:\n- 3+ years of UI/UX design experience\n- Proficiency in Figma, Sketch, or Adobe Creative Suite\n- Strong portfolio showcasing design skills\n- Understanding of user-centered design principles\n- Experience with responsive design",
    type: "full-time",
    tags: ["UI/UX", "Figma", "Design", "User Research", "Prototyping"],
    remote: false,
    salaryMin: 80000,
    salaryMax: 100000,
  },
  {
    title: "Data Scientist",
    company: "Analytics Corp",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80&auto=format&fit=crop",
    location: "Seattle, WA",
    salary: "$130,000 - $160,000",
    description:
      "Join our data science team to help us extract insights from large datasets and build machine learning models that drive business decisions.\n\nResponsibilities:\n- Analyze large datasets to identify trends and patterns\n- Build and deploy machine learning models\n- Collaborate with engineering teams to implement data solutions\n- Present findings to stakeholders\n- Stay current with data science best practices\n\nQualifications:\n- PhD or Master's in Data Science, Statistics, or related field\n- 3+ years of experience in data science\n- Proficiency in Python, R, and SQL\n- Experience with machine learning frameworks (TensorFlow, PyTorch)\n- Strong statistical and analytical skills",
    type: "full-time",
    tags: [
      "Data Science",
      "Python",
      "Machine Learning",
      "Statistics",
      "Analytics",
    ],
    remote: true,
    salaryMin: 130000,
    salaryMax: 160000,
  },
  {
    title: "Product Manager",
    company: "InnovateTech",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop",
    location: "Chicago, IL",
    salary: "$100,000 - $130,000",
    description:
      "We're seeking a Product Manager to lead the development of our flagship products. You'll work closely with engineering, design, and business teams to deliver products that meet user needs and business goals.\n\nKey responsibilities:\n- Define product strategy and roadmap\n- Gather and prioritize product requirements\n- Work with cross-functional teams to deliver features\n- Analyze product metrics and user feedback\n- Communicate product vision to stakeholders\n\nWhat we're looking for:\n- 4+ years of product management experience\n- Strong analytical and problem-solving skills\n- Experience with agile development methodologies\n- Excellent communication and leadership skills\n- Technical background preferred",
    type: "full-time",
    tags: [
      "Product Management",
      "Strategy",
      "Agile",
      "Leadership",
      "Analytics",
    ],
    remote: false,
    salaryMin: 100000,
    salaryMax: 130000,
  },
  {
    title: "Backend Developer (Contract)",
    company: "FreelanceTech",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
    location: "Remote",
    salary: "$60 - $80 per hour",
    description:
      "We're looking for a skilled Backend Developer for a 6-month contract position. You'll work on building robust APIs and microservices for our client projects.\n\nProject scope:\n- Design and implement RESTful APIs\n- Build microservices using Node.js and Python\n- Work with databases (PostgreSQL, Redis)\n- Implement authentication and authorization\n- Write comprehensive tests\n\nRequirements:\n- 3+ years of backend development experience\n- Strong knowledge of Node.js, Python, or Go\n- Experience with databases and caching\n- Knowledge of API design principles\n- Available for 40 hours per week",
    type: "contract",
    tags: ["Node.js", "Python", "API", "Microservices", "PostgreSQL"],
    remote: true,
    salaryMin: 60,
    salaryMax: 80,
  },
  {
    title: "Marketing Specialist",
    company: "GrowthCo",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80&auto=format&fit=crop",
    location: "Miami, FL",
    salary: "$50,000 - $70,000",
    description:
      "Join our marketing team to help us grow our brand and reach new customers. You'll work on digital marketing campaigns, content creation, and social media management.\n\nWhat you'll do:\n- Develop and execute digital marketing campaigns\n- Create engaging content for various channels\n- Manage social media accounts and communities\n- Analyze campaign performance and optimize results\n- Collaborate with sales and product teams\n\nRequirements:\n- 2+ years of marketing experience\n- Knowledge of digital marketing tools and platforms\n- Strong writing and communication skills\n- Experience with social media management\n- Analytical mindset and attention to detail",
    type: "full-time",
    tags: [
      "Marketing",
      "Digital Marketing",
      "Social Media",
      "Content",
      "Analytics",
    ],
    remote: false,
    salaryMin: 50000,
    salaryMax: 70000,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("Cleared existing jobs");

    // Create sample jobs
    const jobs = await Job.create(sampleJobs);
    console.log(`Created ${jobs.length} sample jobs`);

    // Create a sample admin user
    const adminUser = await User.findOne({ email: "admin@jobportal.com" });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin User",
        email: "admin@jobportal.com",
        passwordHash: hashedPassword,
        role: "admin",
      });
      console.log("Created admin user");
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
