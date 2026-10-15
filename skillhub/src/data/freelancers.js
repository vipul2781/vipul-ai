const freelancers = [
  {
    id: 1,
    name: "Rahul Sharma",
    title: "Full Stack Developer",
    location: "Ahmedabad",
    rating: 4.9,
    reviews: 124,
    hourlyRate: 1200,
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Bootstrap"],
    category: "Web Development",
    experience: "Expert",
    availability: "Available Now",
    languages: ["English", "Hindi", "Gujarati"],
    online: true,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    about: "I am a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in MERN stack development and have delivered 100+ projects for clients worldwide. I focus on clean code, performance, and user experience.",
    services: [
      { id: 1, title: "Build a React Website", description: "I will create a modern, responsive React website with clean UI", price: 15000, delivery: "5 days", rating: 4.9 },
      { id: 2, title: "Full Stack Web Application", description: "Complete MERN stack application with authentication and database", price: 35000, delivery: "14 days", rating: 4.8 }
    ],
    portfolio: [
      { id: 1, title: "E-Commerce Platform", category: "Web Development", description: "A full-featured e-commerce platform with cart, payments, and admin panel", image: "https://picsum.photos/seed/port1/600/400" },
      { id: 2, title: "Social Media Dashboard", category: "Web Development", description: "Analytics dashboard for social media management", image: "https://picsum.photos/seed/port2/600/400" },
      { id: 3, title: "Task Management App", category: "Web Development", description: "Collaborative task management tool with real-time updates", image: "https://picsum.photos/seed/port3/600/400" }
    ],
    experienceHistory: [
      { company: "TechSoft Solutions", position: "Senior Developer", duration: "2022 – Present", description: "Leading frontend development team for enterprise clients" },
      { company: "WebCraft India", position: "Full Stack Developer", duration: "2019 – 2022", description: "Developed 50+ web applications using MERN stack" }
    ],
    education: [
      { degree: "B.Tech in Computer Science", institution: "Gujarat Technological University", year: "2019" }
    ]
  },
  {
    id: 2,
    name: "Priya Patel",
    title: "UI/UX Designer",
    location: "Mumbai",
    rating: 4.8,
    reviews: 98,
    hourlyRate: 1500,
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "UI Design"],
    category: "Design",
    experience: "Expert",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    about: "Creative UI/UX designer with a keen eye for detail and 6+ years of experience in creating beautiful, user-centered designs. I believe in designs that not only look great but also solve real problems.",
    services: [
      { id: 3, title: "Design a Modern Logo", description: "Professional logo design with unlimited revisions", price: 5000, delivery: "3 days", rating: 4.9 },
      { id: 4, title: "Complete UI/UX Design", description: "Full app or website UI/UX design with wireframes and prototypes", price: 25000, delivery: "10 days", rating: 4.8 }
    ],
    portfolio: [
      { id: 4, title: "Banking App Redesign", category: "UI/UX Design", description: "Complete redesign of a banking application", image: "https://picsum.photos/seed/port4/600/400" },
      { id: 5, title: "Food Delivery App", category: "UI/UX Design", description: "UI design for a food delivery mobile application", image: "https://picsum.photos/seed/port5/600/400" }
    ],
    experienceHistory: [
      { company: "DesignHub Studios", position: "Lead Designer", duration: "2021 – Present", description: "Managing design team and creating enterprise-level UI/UX solutions" },
      { company: "CreativeMinds", position: "UI/UX Designer", duration: "2018 – 2021", description: "Designed 80+ mobile and web applications" }
    ],
    education: [
      { degree: "M.Des in Interaction Design", institution: "NID Ahmedabad", year: "2018" }
    ]
  },
  {
    id: 3,
    name: "Amit Shah",
    title: "Digital Marketing Expert",
    location: "Pune",
    rating: 4.7,
    reviews: 87,
    hourlyRate: 800,
    skills: ["SEO", "Google Ads", "Social Media", "Content Marketing", "Analytics", "Facebook Ads"],
    category: "Marketing",
    experience: "Intermediate",
    availability: "Available Now",
    languages: ["English", "Hindi", "Gujarati"],
    online: true,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    about: "Results-driven digital marketing expert with 4+ years of experience helping businesses grow their online presence. Specialized in SEO, PPC, and social media marketing.",
    services: [
      { id: 5, title: "SEO Optimization", description: "Complete on-page and off-page SEO for better rankings", price: 10000, delivery: "7 days", rating: 4.7 },
      { id: 6, title: "Social Media Marketing", description: "Strategic social media marketing plan with content calendar", price: 8000, delivery: "5 days", rating: 4.6 }
    ],
    portfolio: [
      { id: 6, title: "E-Commerce SEO Campaign", category: "Digital Marketing", description: "Increased organic traffic by 300% in 6 months", image: "https://picsum.photos/seed/port6/600/400" }
    ],
    experienceHistory: [
      { company: "GrowthLabs", position: "Marketing Manager", duration: "2022 – Present", description: "Managing digital marketing campaigns for SMBs" }
    ],
    education: [
      { degree: "MBA in Marketing", institution: "Pune University", year: "2020" }
    ]
  },
  {
    id: 4,
    name: "Sneha Reddy",
    title: "Content Writer",
    location: "Hyderabad",
    rating: 4.6,
    reviews: 65,
    hourlyRate: 600,
    skills: ["Blog Writing", "Copywriting", "SEO Writing", "Technical Writing", "Editing", "Research"],
    category: "Writing",
    experience: "Intermediate",
    availability: "Available This Week",
    languages: ["English", "Hindi"],
    online: false,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    about: "Professional content writer with 3+ years of experience in creating engaging, SEO-optimized content. I write blogs, articles, website content, and technical documentation.",
    services: [
      { id: 7, title: "Blog Writing", description: "SEO-optimized blog posts that drive traffic", price: 2000, delivery: "2 days", rating: 4.6 },
      { id: 8, title: "Website Content Writing", description: "Professional website copy that converts", price: 5000, delivery: "4 days", rating: 4.7 }
    ],
    portfolio: [
      { id: 7, title: "Tech Blog Series", category: "Content Writing", description: "Series of tech articles for a SaaS company", image: "https://picsum.photos/seed/port7/600/400" }
    ],
    experienceHistory: [
      { company: "ContentFirst Media", position: "Senior Writer", duration: "2021 – Present", description: "Writing for top tech companies and startups" }
    ],
    education: [
      { degree: "M.A. in English Literature", institution: "Osmania University", year: "2019" }
    ]
  },
  {
    id: 5,
    name: "Vikram Singh",
    title: "Mobile App Developer",
    location: "Bangalore",
    rating: 4.8,
    reviews: 112,
    hourlyRate: 2000,
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "TypeScript"],
    category: "Mobile Development",
    experience: "Expert",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    about: "Expert mobile app developer with 7+ years of experience in building cross-platform and native mobile applications. I've published 30+ apps on both App Store and Play Store.",
    services: [
      { id: 9, title: "React Native App", description: "Cross-platform mobile app with modern UI and features", price: 40000, delivery: "21 days", rating: 4.8 },
      { id: 10, title: "Flutter App Development", description: "Beautiful Flutter app with custom animations", price: 35000, delivery: "18 days", rating: 4.9 }
    ],
    portfolio: [
      { id: 8, title: "Fitness Tracker App", category: "Mobile Development", description: "Cross-platform fitness tracking application", image: "https://picsum.photos/seed/port8/600/400" },
      { id: 9, title: "Food Delivery App", category: "Mobile Development", description: "Full-featured food delivery mobile app", image: "https://picsum.photos/seed/port9/600/400" }
    ],
    experienceHistory: [
      { company: "AppWorks Technologies", position: "Lead Mobile Developer", duration: "2020 – Present", description: "Building enterprise mobile solutions" },
      { company: "MobileFirst India", position: "Android Developer", duration: "2017 – 2020", description: "Developed 20+ Android applications" }
    ],
    education: [
      { degree: "B.E. in Information Technology", institution: "VTU Bangalore", year: "2017" }
    ]
  },
  {
    id: 6,
    name: "Kavita Joshi",
    title: "Graphic Designer",
    location: "Delhi",
    rating: 4.9,
    reviews: 145,
    hourlyRate: 1000,
    skills: ["Photoshop", "Illustrator", "InDesign", "Logo Design", "Branding", "Typography"],
    category: "Design",
    experience: "Expert",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    about: "Award-winning graphic designer with 8+ years of experience in branding, logo design, and visual communication. I create designs that tell stories and build brands.",
    services: [
      { id: 11, title: "Brand Identity Design", description: "Complete brand identity including logo, colors, and guidelines", price: 20000, delivery: "7 days", rating: 4.9 },
      { id: 12, title: "Social Media Graphics", description: "Eye-catching social media post designs", price: 3000, delivery: "2 days", rating: 4.8 }
    ],
    portfolio: [
      { id: 10, title: "Restaurant Branding", category: "Graphic Design", description: "Complete branding for a premium restaurant chain", image: "https://picsum.photos/seed/port10/600/400" },
      { id: 11, title: "Corporate Identity", category: "Graphic Design", description: "Brand identity for a tech startup", image: "https://picsum.photos/seed/port11/600/400" }
    ],
    experienceHistory: [
      { company: "BrandStudio Delhi", position: "Creative Director", duration: "2021 – Present", description: "Leading creative team for major brand campaigns" }
    ],
    education: [
      { degree: "B.F.A. in Visual Communication", institution: "College of Art, Delhi", year: "2016" }
    ]
  },
  {
    id: 7,
    name: "Arjun Mehta",
    title: "Video Editor & Motion Designer",
    location: "Mumbai",
    rating: 4.7,
    reviews: 78,
    hourlyRate: 900,
    skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Color Grading", "VFX"],
    category: "Video",
    experience: "Intermediate",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: false,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    about: "Creative video editor and motion designer with 4+ years of experience in creating compelling visual content for brands, YouTubers, and businesses.",
    services: [
      { id: 13, title: "Edit YouTube Videos", description: "Professional YouTube video editing with thumbnails", price: 3000, delivery: "3 days", rating: 4.7 },
      { id: 14, title: "Motion Graphics Video", description: "Animated explainer or promotional video", price: 15000, delivery: "7 days", rating: 4.8 }
    ],
    portfolio: [
      { id: 12, title: "Brand Commercial", category: "Video Editing", description: "30-second commercial for a fashion brand", image: "https://picsum.photos/seed/port12/600/400" }
    ],
    experienceHistory: [
      { company: "Pixel Motion Studios", position: "Senior Editor", duration: "2022 – Present", description: "Editing for major YouTube channels and brands" }
    ],
    education: [
      { degree: "Diploma in Film Editing", institution: "FTII Pune", year: "2020" }
    ]
  },
  {
    id: 8,
    name: "Meera Nair",
    title: "SEO Specialist",
    location: "Chennai",
    rating: 4.5,
    reviews: 56,
    hourlyRate: 700,
    skills: ["SEO", "Google Analytics", "Keyword Research", "Link Building", "Technical SEO", "Content Strategy"],
    category: "Marketing",
    experience: "Intermediate",
    availability: "Available This Week",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    about: "SEO specialist helping businesses rank higher on Google. 3+ years of experience in technical SEO, content strategy, and link building.",
    services: [
      { id: 15, title: "Complete SEO Audit", description: "Detailed SEO audit with actionable recommendations", price: 5000, delivery: "3 days", rating: 4.5 },
      { id: 16, title: "Monthly SEO Package", description: "Ongoing SEO optimization and reporting", price: 15000, delivery: "30 days", rating: 4.6 }
    ],
    portfolio: [
      { id: 13, title: "SaaS Company SEO", category: "SEO", description: "Grew organic traffic from 5K to 50K monthly visits", image: "https://picsum.photos/seed/port13/600/400" }
    ],
    experienceHistory: [
      { company: "RankUp Digital", position: "SEO Lead", duration: "2021 – Present", description: "Managing SEO campaigns for 20+ clients" }
    ],
    education: [
      { degree: "B.Com with Digital Marketing", institution: "Loyola College Chennai", year: "2020" }
    ]
  },
  {
    id: 9,
    name: "Rohan Desai",
    title: "WordPress Developer",
    location: "Ahmedabad",
    rating: 4.6,
    reviews: 92,
    hourlyRate: 800,
    skills: ["WordPress", "PHP", "WooCommerce", "Elementor", "CSS", "JavaScript"],
    category: "Web Development",
    experience: "Intermediate",
    availability: "Available Now",
    languages: ["English", "Hindi", "Gujarati"],
    online: true,
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    about: "WordPress developer with 4+ years of experience creating custom themes, plugins, and e-commerce websites. I've built 200+ WordPress sites.",
    services: [
      { id: 17, title: "Create a Business Website", description: "Professional WordPress business website", price: 10000, delivery: "5 days", rating: 4.6 },
      { id: 18, title: "WooCommerce Store", description: "Complete e-commerce store with payment integration", price: 20000, delivery: "10 days", rating: 4.7 }
    ],
    portfolio: [
      { id: 14, title: "Real Estate Website", category: "Web Development", description: "Property listing website with advanced search", image: "https://picsum.photos/seed/port14/600/400" }
    ],
    experienceHistory: [
      { company: "WebSolutions Gujarat", position: "WordPress Developer", duration: "2020 – Present", description: "Specializing in custom WordPress development" }
    ],
    education: [
      { degree: "B.Sc. in Computer Science", institution: "Gujarat University", year: "2019" }
    ]
  },
  {
    id: 10,
    name: "Ananya Gupta",
    title: "Data Analyst",
    location: "Bangalore",
    rating: 4.7,
    reviews: 43,
    hourlyRate: 1100,
    skills: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Data Visualization"],
    category: "Web Development",
    experience: "Intermediate",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    about: "Data analyst passionate about turning data into actionable insights. 3+ years of experience with Python, SQL, and visualization tools.",
    services: [
      { id: 19, title: "Data Analysis Report", description: "Comprehensive data analysis with visualizations", price: 8000, delivery: "5 days", rating: 4.7 },
      { id: 20, title: "Dashboard Creation", description: "Interactive Tableau/Power BI dashboard", price: 12000, delivery: "7 days", rating: 4.8 }
    ],
    portfolio: [
      { id: 15, title: "Sales Analytics Dashboard", category: "Data Analysis", description: "Interactive sales dashboard for a retail company", image: "https://picsum.photos/seed/port15/600/400" }
    ],
    experienceHistory: [
      { company: "DataInsight Analytics", position: "Data Analyst", duration: "2021 – Present", description: "Providing data analytics solutions to businesses" }
    ],
    education: [
      { degree: "M.Sc. in Statistics", institution: "IISc Bangalore", year: "2021" }
    ]
  },
  {
    id: 11,
    name: "Karan Thakur",
    title: "Frontend Developer",
    location: "Jaipur",
    rating: 4.5,
    reviews: 67,
    hourlyRate: 900,
    skills: ["React", "Vue.js", "CSS3", "SASS", "Tailwind CSS", "JavaScript"],
    category: "Web Development",
    experience: "Intermediate",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: false,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    about: "Frontend developer specializing in creating pixel-perfect, responsive web interfaces. 3+ years of experience with modern JavaScript frameworks.",
    services: [
      { id: 21, title: "Responsive Website", description: "Pixel-perfect responsive website from design", price: 8000, delivery: "5 days", rating: 4.5 },
      { id: 22, title: "Landing Page Design", description: "High-converting landing page with animations", price: 5000, delivery: "3 days", rating: 4.6 }
    ],
    portfolio: [
      { id: 16, title: "SaaS Landing Page", category: "Web Development", description: "Modern landing page for a SaaS product", image: "https://picsum.photos/seed/port16/600/400" }
    ],
    experienceHistory: [
      { company: "PixelCraft Studios", position: "Frontend Developer", duration: "2021 – Present", description: "Creating modern web interfaces" }
    ],
    education: [
      { degree: "B.Tech in Computer Science", institution: "JECRC University, Jaipur", year: "2020" }
    ]
  },
  {
    id: 12,
    name: "Divya Iyer",
    title: "Social Media Manager",
    location: "Chennai",
    rating: 4.4,
    reviews: 38,
    hourlyRate: 500,
    skills: ["Instagram Marketing", "Facebook Ads", "Content Creation", "Canva", "Hootsuite", "Analytics"],
    category: "Marketing",
    experience: "Beginner",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    about: "Social media manager helping brands build their online presence. I create engaging content strategies and manage social media campaigns.",
    services: [
      { id: 23, title: "Social Media Management", description: "Complete social media management for one month", price: 8000, delivery: "30 days", rating: 4.4 },
      { id: 24, title: "Instagram Growth Strategy", description: "Strategic plan to grow your Instagram following", price: 3000, delivery: "3 days", rating: 4.3 }
    ],
    portfolio: [
      { id: 17, title: "Brand Social Campaign", category: "Marketing", description: "Social media campaign that went viral", image: "https://picsum.photos/seed/port17/600/400" }
    ],
    experienceHistory: [
      { company: "SocialBuzz Agency", position: "Social Media Manager", duration: "2023 – Present", description: "Managing social accounts for multiple brands" }
    ],
    education: [
      { degree: "B.A. in Mass Communication", institution: "Madras University", year: "2022" }
    ]
  },
  {
    id: 13,
    name: "Nikhil Bansal",
    title: "Backend Developer",
    location: "Delhi",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 1500,
    skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker", "REST API"],
    category: "Web Development",
    experience: "Expert",
    availability: "Available This Week",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    about: "Backend developer with 6+ years of experience building scalable, secure backend systems. Expert in Python, Django, and cloud infrastructure.",
    services: [
      { id: 25, title: "Backend API Development", description: "Scalable REST API with authentication and documentation", price: 25000, delivery: "10 days", rating: 4.8 },
      { id: 26, title: "Cloud Infrastructure Setup", description: "AWS infrastructure setup with CI/CD pipeline", price: 15000, delivery: "5 days", rating: 4.9 }
    ],
    portfolio: [
      { id: 18, title: "Healthcare API", category: "Web Development", description: "HIPAA-compliant healthcare backend system", image: "https://picsum.photos/seed/port18/600/400" }
    ],
    experienceHistory: [
      { company: "CloudNine Tech", position: "Senior Backend Engineer", duration: "2020 – Present", description: "Architecting backend systems for enterprise clients" }
    ],
    education: [
      { degree: "M.Tech in Computer Science", institution: "IIT Delhi", year: "2018" }
    ]
  },
  {
    id: 14,
    name: "Pooja Verma",
    title: "Illustration & Animation",
    location: "Pune",
    rating: 4.6,
    reviews: 52,
    hourlyRate: 1000,
    skills: ["Illustration", "Character Design", "2D Animation", "Procreate", "After Effects", "Photoshop"],
    category: "Design",
    experience: "Intermediate",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: false,
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    about: "Digital illustrator and animator creating vibrant visuals for brands, games, and publications. 4+ years of experience in digital art.",
    services: [
      { id: 27, title: "Custom Illustrations", description: "Unique digital illustrations for any purpose", price: 5000, delivery: "4 days", rating: 4.6 },
      { id: 28, title: "2D Animation Video", description: "Engaging 2D animated video for your brand", price: 20000, delivery: "10 days", rating: 4.7 }
    ],
    portfolio: [
      { id: 19, title: "Children's Book Illustrations", category: "Illustration", description: "Illustrated a 32-page children's book", image: "https://picsum.photos/seed/port19/600/400" }
    ],
    experienceHistory: [
      { company: "ArtWorks Studio", position: "Illustrator", duration: "2021 – Present", description: "Creating illustrations for books and brands" }
    ],
    education: [
      { degree: "B.F.A. in Applied Arts", institution: "Sir J.J. School of Art, Mumbai", year: "2020" }
    ]
  },
  {
    id: 15,
    name: "Sanjay Kulkarni",
    title: "DevOps Engineer",
    location: "Hyderabad",
    rating: 4.9,
    reviews: 76,
    hourlyRate: 2500,
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    category: "Web Development",
    experience: "Expert",
    availability: "Available Now",
    languages: ["English", "Hindi"],
    online: true,
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    about: "DevOps engineer with 7+ years of experience in cloud infrastructure, CI/CD, and container orchestration. I help businesses deploy and scale their applications efficiently.",
    services: [
      { id: 29, title: "AWS Infrastructure Setup", description: "Complete AWS setup with auto-scaling and monitoring", price: 30000, delivery: "7 days", rating: 4.9 },
      { id: 30, title: "CI/CD Pipeline", description: "Automated deployment pipeline with testing", price: 15000, delivery: "5 days", rating: 4.8 }
    ],
    portfolio: [
      { id: 20, title: "Microservices Architecture", category: "DevOps", description: "Kubernetes-based microservices deployment for fintech", image: "https://picsum.photos/seed/port20/600/400" }
    ],
    experienceHistory: [
      { company: "CloudScale Solutions", position: "DevOps Lead", duration: "2020 – Present", description: "Managing cloud infrastructure for 50+ applications" }
    ],
    education: [
      { degree: "B.Tech in Computer Science", institution: "JNTU Hyderabad", year: "2017" }
    ]
  }
];

export default freelancers;
