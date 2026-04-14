export type NavItem = {
  label: string;
  href: string;
  icon: "works" | "resume" | "shelf";
};

export type SocialItem = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "facebook" | "mail";
};

export type SkillItem = {
  title: string;
  description: string;
};

export type FactItem = {
  icon: "sparkles" | "briefcase" | "sprout" | "gamepad" | "smile";
  prefix?: string;
  highlight?: string;
  suffix?: string;
};

export type JourneyItem = {
  year: string;
  title: string;
  subtitle?: string;
  type: "education" | "certificate" | "experience";
};

export type ProjectPreview = {
  title: string;
  subtitle: string;
  description: string;
  stack?: string[];
  palette: [string, string, string];
};

export const siteData = {
  brand: "PK",
  email: "pyaephyoekyaw1800@gmail.com",
  location: "Yangon, Myanmar",
  resumeUrl: "/Pyae_Phyoe_Kyaw_CV.pdf",
  nav: [
    { label: "About", href: "#about", icon: "shelf" },
    { label: "Journey", href: "#journey", icon: "resume" },
    { label: "Skills", href: "#skills", icon: "works" },
    { label: "Works", href: "#works", icon: "works" },
    { label: "Contact", href: "#contact", icon: "shelf" },
  ] satisfies NavItem[],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pyaephyoekyaw1800", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/pyaephyokyaw456", icon: "github" },
    { label: "Facebook", href: "https://www.facebook.com/share/1B4r1pD5dD/", icon: "facebook" },
    { label: "Email", href: "mailto:pyaephyoekyaw1800@gmail.com", icon: "mail" },
  ] satisfies SocialItem[],
  hero: {
    badge: "Hello, I'm",
    titleTop: "Pyae Phyoe Kyaw",
    titleBottom: "",
    role: "Fullstack Developer",
    body: "I engineer secure backend systems and interactive web interfaces. Currently focusing on high-throughput API Gateways for core banking infrastructure at Myanmar Information Technology.",
    cta: "Let's talk",
    image: "/herosection-photo-transparent.png",
  },
  skills: {
    title: "My Top Skills",
    eyebrow: "What I Do",
    illustration: "/skills_illustration.png",
    groups: [
      {
        title: "Backend & Architecture",
        description:
          "I engineer highly scalable, maintainable architectures with hands-on expertise in Microservices. I build robust authentication layers via Spring Security, gracefully handle complex concurrency scenarios, and generate complex business analytics using Jasper Reports.",
      },
      {
        title: "Database & Performance",
        description:
          "I ensure peak system performance through effective caching strategies and preventative load testing via Apache JMeter. I excel at optimizing database searches and constructing precise indexing logic to completely prevent query deadlocks.",
      },
      {
        title: "Frontend Ecology",
        description:
          "I design responsive, highly interactive web applications using Angular, React, and Next.js. I leverage TypeScript for type-safe rendering and Tailwind CSS for fluid, modern user experiences.",
      },
      {
        title: "DevOps & Deployments",
        description:
          "I am experienced in CI/CD containerization using Docker and cloud scaling with AWS. I also handle traditional server environments flawlessly, managing the complete pipeline of packaging and deploying Java .war archives to production servers.",
      },
    ] satisfies SkillItem[],
    techCategories: [
      {
        category: "Backend Architecture",
        skills: [
          { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
          { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
          { name: "Spring Security", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzZEQjMzRiI+PHBhdGggZD0iTTEyIDFMMyA1djZjMCA1LjU1IDMuODQgMTAuNzQgOSAxMiA1LjE2LTEuMjYgOS02LjQ1IDktMTJWNWwtOS00em0tMiAxNmwtNC00IDEuNDEtMS40MUwxMCAxNC4xN2w2LjU5LTYuNTlMMTggOWwtOCA4eiIvPjwvc3ZnPg==" },
          { name: "Hibernate JPA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg" },
          { name: "Apache JMeter", icon: "https://upload.wikimedia.org/wikipedia/commons/2/25/Apache_JMeter_logo.svg" }
        ]
      },
      {
        category: "Database & APIs",
        skills: [
          { name: "MSSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
          { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
          { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
          { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
          { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" }
        ]
      },
      {
        category: "Frontend Ecology",
        skills: [
          { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
          { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
          { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
          { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
          { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" }
        ]
      },
      {
        category: "DevOps & Tools",
        skills: [
          { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
          { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
          { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }
        ]
      }
    ],
    cta: "See my works",
  },
  about: {
    title: "README",
    facts: [
      {
        icon: "sparkles",
        prefix: "Building",
        highlight: "secure API Gateways for Core Banking",
      },
      {
        icon: "briefcase",
        prefix: "Architecting",
        highlight: "resilient fintech systems",
      },
      {
        icon: "sprout",
        prefix: "Scaling",
        highlight: "high-throughput financial databases",
      },
      {
        icon: "gamepad",
        prefix: "Exploring",
        highlight: "new tech stacks and cloud migrations",
      },
      {
        icon: "smile",
        prefix: "Fun fact:",
        suffix: "I've deployed everything from classic .war files to modern Docker containers.",
      },
    ] satisfies FactItem[],
    paragraphs: [
      "I'm a Fullstack Developer based in Yangon, currently building core banking solutions at Myanmar Information Technology (MIT). My daily work focuses on engineering secure, high-throughput API Gateways that keep complex financial services running smoothly.",
      "My technical roots are deep in the Java ecosystem. I regularly work with Spring Boot, PostgreSQL, and Redis to build APIs that can handle heavy transaction loads. When I'm not optimizing backend logic or pushing TPS boundaries with JMeter, I'm building clean, interactive user interfaces using Angular and TypeScript.",
      "I enjoy being involved in the complete software lifecycle. I've handled everything from designing Jasper Reports and deploying classic .war files to local servers, to exploring modern Docker containers and AWS cloud infrastructure. I love the challenge of making robust systems run faster and more efficiently.",
    ],
    journey: [
      {
        year: "Nov 2025 - Present",
        title: "Junior Fullstack Developer",
        subtitle: "Myanmar Information Technology (MIT)",
        type: "experience"
      },
      {
        year: "May - Oct 2025",
        title: "OneStop Bootcamp Batch-13",
        subtitle: "Java Developer Class (JDC)",
        type: "certificate"
      },
      {
        year: "2025",
        title: "B.C.Sc (Computer Science)",
        subtitle: "University of Computer Studies, Mandalay (UCSM)",
        type: "education"
      }
    ] satisfies JourneyItem[],
  },
  works: {
    title: "My Works",
    eyebrow: "Few of my past and present projects",
    webTitle: "Web Applications",
    webProjects: [
      {
        title: "Core Banking System",
        subtitle: "Backend-API of Core Banking System",
        description: "Engineered the mission-critical API layer at MIT orchestrating backend Core Banking modules. Built with Spring Boot, it bridges traditional JavaEE components with modern microservices.",
        stack: ["Spring Boot", "JavaEE", "Hibernate JPA", "PostgreSQL", "MSSQL", "Redis"],
        palette: ["#0f172a", "#1e293b", "#fa695c"],
      },
      {
        title: "ATM Services Infrastructure",
        subtitle: "TPS-Optimized transaction handler",
        description: "Architected a high-concurrency ATM service backend utilizing Spring Boot, PostgreSQL, MSSQL, and Redis. Subjected to rigorous Apache JMeter load/stress testing to maximize Transactions Per Second (TPS).",
        stack: ["Spring Boot", "PostgreSQL", "Redis", "JMeter"],
        palette: ["#171513", "#2c2826", "#4ade80"],
      },
      {
        title: "Banking Admin Portal",
        subtitle: "Enterprise management interface",
        description: "A secure, type-safe frontend dashboard for banking operators built from the ground up using Angular and TypeScript. Connects securely to the Core Banking APIs.",
        stack: ["Angular", "TypeScript", "Tailwind CSS"],
        palette: ["#111827", "#1f2937", "#60a5fa"],
      },
      {
        title: "EduVerse Platform",
        subtitle: "Role-Based Learning System",
        description: "Developed an entire learning management system utilizing Spring Boot and JWT Authentication. Includes robust role-based access for students, teachers, and admins, ensuring secure operations.",
        stack: ["Spring Boot", "JWT Auth", "PostgreSQL"],
        palette: ["#1e1b4b", "#312e81", "#818cf8"],
      },
      {
        title: "Dev Portfolio Architecture",
        subtitle: "High-performance web interactive",
        description: "Engineered this minimalist, responsive portfolio to showcase fullstack capabilities. Features Apple-style Bento grids, magnetic hover mechanics, and abstract glassmorphism UI structures.",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        palette: ["#18181b", "#27272a", "#d946ef"],
      },
    ] satisfies ProjectPreview[],
    nativeTitle: "Core Technologies",
    nativeName: "JavaEE, Spring Boot, Angular, Redis, PostgreSQL, AWS",
    nativeStack: "Enterprise-grade Tech Stack",
    resumePrompt: "I cook with these ingredients",
    resumeCta: "MY RESUME",
  },
  contact: {
    title: "Keep In Touch",
    body: "I am currently open to new opportunities. Whether you need a highly conceptual web interface, a rock-solid Spring Boot backend, or just want to chat about enterprise architecture, I'd love to connect.",
    footerLabel: "Portfolio 2026",
  },
} as const;
