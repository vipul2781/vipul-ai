const services = [
  {
    id: 1,
    title: "Build a React Website",
    description: "I will create a modern, responsive React website tailored to your business needs. Includes clean code, SEO optimization, responsive design, and cross-browser compatibility. Perfect for businesses, startups, and personal portfolios.",
    freelancerId: 1,
    freelancerName: "Rahul Sharma",
    freelancerImage: "https://randomuser.me/api/portraits/men/1.jpg",
    freelancerLevel: "Top Rated",
    responseTime: "1 hour",
    category: "Development",
    rating: 4.9,
    reviews: 45,
    image: "https://picsum.photos/seed/svc1/800/500",
    gallery: [
      "https://picsum.photos/seed/svc1a/800/500",
      "https://picsum.photos/seed/svc1b/800/500",
      "https://picsum.photos/seed/svc1c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 5000, delivery: "3 days", revisions: 2, pages: 1, features: ["1 Page", "Responsive Design", "2 Revisions", "Source Code"] },
      standard: { name: "Standard", price: 12000, delivery: "5 days", revisions: 5, pages: 5, features: ["5 Pages", "Responsive Design", "5 Revisions", "Source Code", "SEO Setup"] },
      premium: { name: "Premium", price: 25000, delivery: "7 days", revisions: "Unlimited", pages: 10, features: ["10 Pages", "Responsive Design", "Unlimited Revisions", "Source Code", "SEO Setup", "Performance Optimization"] }
    }
  },
  {
    id: 2,
    title: "Design a Modern Logo",
    description: "I will design a unique, professional, and modern logo for your brand. Each design is crafted from scratch with a focus on brand identity and market relevance. You'll receive multiple concepts and unlimited revisions until you're happy.",
    freelancerId: 6,
    freelancerName: "Kavita Joshi",
    freelancerImage: "https://randomuser.me/api/portraits/women/6.jpg",
    freelancerLevel: "Top Rated",
    responseTime: "30 minutes",
    category: "Design",
    rating: 4.9,
    reviews: 68,
    image: "https://picsum.photos/seed/svc2/800/500",
    gallery: [
      "https://picsum.photos/seed/svc2a/800/500",
      "https://picsum.photos/seed/svc2b/800/500",
      "https://picsum.photos/seed/svc2c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 2000, delivery: "2 days", revisions: 2, pages: 1, features: ["1 Logo Concept", "2 Revisions", "PNG File", "JPG File"] },
      standard: { name: "Standard", price: 5000, delivery: "3 days", revisions: 5, pages: 3, features: ["3 Logo Concepts", "5 Revisions", "All File Formats", "Source File", "Social Media Kit"] },
      premium: { name: "Premium", price: 10000, delivery: "5 days", revisions: "Unlimited", pages: 5, features: ["5 Logo Concepts", "Unlimited Revisions", "All File Formats", "Source File", "Brand Guidelines", "Stationery Design"] }
    }
  },
  {
    id: 3,
    title: "Create a Business Website",
    description: "Professional WordPress business website with custom design, responsive layout, contact forms, and SEO optimization. Perfect for small businesses, agencies, and professionals looking to establish their online presence.",
    freelancerId: 9,
    freelancerName: "Rohan Desai",
    freelancerImage: "https://randomuser.me/api/portraits/men/9.jpg",
    freelancerLevel: "Level 2",
    responseTime: "2 hours",
    category: "Development",
    rating: 4.6,
    reviews: 34,
    image: "https://picsum.photos/seed/svc3/800/500",
    gallery: [
      "https://picsum.photos/seed/svc3a/800/500",
      "https://picsum.photos/seed/svc3b/800/500",
      "https://picsum.photos/seed/svc3c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 5000, delivery: "3 days", revisions: 2, pages: 3, features: ["3 Pages", "Responsive Design", "2 Revisions", "Contact Form"] },
      standard: { name: "Standard", price: 10000, delivery: "5 days", revisions: 5, pages: 7, features: ["7 Pages", "Responsive Design", "5 Revisions", "Contact Form", "SEO Setup", "Blog Setup"] },
      premium: { name: "Premium", price: 20000, delivery: "10 days", revisions: "Unlimited", pages: 15, features: ["15 Pages", "Responsive Design", "Unlimited Revisions", "Contact Form", "SEO Setup", "Blog Setup", "E-Commerce Ready"] }
    }
  },
  {
    id: 4,
    title: "Edit YouTube Videos",
    description: "Professional YouTube video editing including jump cuts, transitions, sound effects, background music, text overlays, color correction, and thumbnails. I'll make your content engaging and professional.",
    freelancerId: 7,
    freelancerName: "Arjun Mehta",
    freelancerImage: "https://randomuser.me/api/portraits/men/7.jpg",
    freelancerLevel: "Level 2",
    responseTime: "1 hour",
    category: "Video",
    rating: 4.7,
    reviews: 29,
    image: "https://picsum.photos/seed/svc4/800/500",
    gallery: [
      "https://picsum.photos/seed/svc4a/800/500",
      "https://picsum.photos/seed/svc4b/800/500",
      "https://picsum.photos/seed/svc4c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 2000, delivery: "2 days", revisions: 1, pages: 1, features: ["Up to 10 min", "Basic Editing", "1 Revision", "Background Music"] },
      standard: { name: "Standard", price: 5000, delivery: "3 days", revisions: 3, pages: 1, features: ["Up to 20 min", "Advanced Editing", "3 Revisions", "Motion Graphics", "Thumbnail"] },
      premium: { name: "Premium", price: 10000, delivery: "5 days", revisions: "Unlimited", pages: 1, features: ["Up to 40 min", "Premium Editing", "Unlimited Revisions", "Motion Graphics", "Thumbnail", "Color Grading", "SFX"] }
    }
  },
  {
    id: 5,
    title: "SEO Optimization",
    description: "Comprehensive SEO optimization service to improve your website's search engine rankings. Includes keyword research, on-page optimization, technical SEO, content strategy, and detailed analytics reporting.",
    freelancerId: 8,
    freelancerName: "Meera Nair",
    freelancerImage: "https://randomuser.me/api/portraits/women/8.jpg",
    freelancerLevel: "Level 2",
    responseTime: "3 hours",
    category: "Marketing",
    rating: 4.5,
    reviews: 22,
    image: "https://picsum.photos/seed/svc5/800/500",
    gallery: [
      "https://picsum.photos/seed/svc5a/800/500",
      "https://picsum.photos/seed/svc5b/800/500",
      "https://picsum.photos/seed/svc5c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 3000, delivery: "3 days", revisions: 1, pages: 5, features: ["SEO Audit", "5 Keywords", "On-Page SEO", "Report"] },
      standard: { name: "Standard", price: 8000, delivery: "7 days", revisions: 2, pages: 15, features: ["SEO Audit", "15 Keywords", "On-Page SEO", "Technical SEO", "Competitor Analysis", "Report"] },
      premium: { name: "Premium", price: 15000, delivery: "14 days", revisions: "Unlimited", pages: 30, features: ["Full SEO Audit", "30 Keywords", "On-Page SEO", "Technical SEO", "Link Building", "Content Strategy", "Monthly Report"] }
    }
  },
  {
    id: 6,
    title: "Social Media Marketing",
    description: "Strategic social media marketing service to grow your brand's online presence. Includes content creation, scheduling, community management, and performance analytics across major social platforms.",
    freelancerId: 3,
    freelancerName: "Amit Shah",
    freelancerImage: "https://randomuser.me/api/portraits/men/3.jpg",
    freelancerLevel: "Level 2",
    responseTime: "2 hours",
    category: "Marketing",
    rating: 4.6,
    reviews: 31,
    image: "https://picsum.photos/seed/svc6/800/500",
    gallery: [
      "https://picsum.photos/seed/svc6a/800/500",
      "https://picsum.photos/seed/svc6b/800/500",
      "https://picsum.photos/seed/svc6c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 3000, delivery: "3 days", revisions: 1, pages: 1, features: ["1 Platform", "10 Posts", "Basic Strategy", "Monthly Report"] },
      standard: { name: "Standard", price: 8000, delivery: "7 days", revisions: 3, pages: 3, features: ["3 Platforms", "30 Posts", "Content Calendar", "Ad Management", "Monthly Report"] },
      premium: { name: "Premium", price: 15000, delivery: "30 days", revisions: "Unlimited", pages: 5, features: ["5 Platforms", "60 Posts", "Content Calendar", "Ad Management", "Community Management", "Weekly Report"] }
    }
  },
  {
    id: 7,
    title: "Complete UI/UX Design",
    description: "Full-service UI/UX design for mobile apps and websites. I'll create user flows, wireframes, high-fidelity mockups, and interactive prototypes that provide exceptional user experiences.",
    freelancerId: 2,
    freelancerName: "Priya Patel",
    freelancerImage: "https://randomuser.me/api/portraits/women/2.jpg",
    freelancerLevel: "Top Rated",
    responseTime: "1 hour",
    category: "Design",
    rating: 4.8,
    reviews: 42,
    image: "https://picsum.photos/seed/svc7/800/500",
    gallery: [
      "https://picsum.photos/seed/svc7a/800/500",
      "https://picsum.photos/seed/svc7b/800/500",
      "https://picsum.photos/seed/svc7c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 5000, delivery: "3 days", revisions: 2, pages: 3, features: ["3 Screens", "Wireframes", "2 Revisions", "Figma File"] },
      standard: { name: "Standard", price: 15000, delivery: "7 days", revisions: 5, pages: 10, features: ["10 Screens", "Wireframes", "Mockups", "5 Revisions", "Figma File", "Prototype"] },
      premium: { name: "Premium", price: 30000, delivery: "14 days", revisions: "Unlimited", pages: 25, features: ["25 Screens", "Wireframes", "Mockups", "Unlimited Revisions", "Figma File", "Interactive Prototype", "Design System"] }
    }
  },
  {
    id: 8,
    title: "React Native Mobile App",
    description: "Cross-platform mobile application development using React Native. I'll build a performant, feature-rich app that works seamlessly on both iOS and Android from a single codebase.",
    freelancerId: 5,
    freelancerName: "Vikram Singh",
    freelancerImage: "https://randomuser.me/api/portraits/men/5.jpg",
    freelancerLevel: "Top Rated",
    responseTime: "2 hours",
    category: "Development",
    rating: 4.8,
    reviews: 38,
    image: "https://picsum.photos/seed/svc8/800/500",
    gallery: [
      "https://picsum.photos/seed/svc8a/800/500",
      "https://picsum.photos/seed/svc8b/800/500",
      "https://picsum.photos/seed/svc8c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 15000, delivery: "7 days", revisions: 2, pages: 5, features: ["5 Screens", "Basic Features", "2 Revisions", "Source Code"] },
      standard: { name: "Standard", price: 35000, delivery: "14 days", revisions: 5, pages: 12, features: ["12 Screens", "Auth & API", "Push Notifications", "5 Revisions", "Source Code", "App Store Setup"] },
      premium: { name: "Premium", price: 60000, delivery: "21 days", revisions: "Unlimited", pages: 20, features: ["20+ Screens", "Full Features", "Payment Integration", "Unlimited Revisions", "Source Code", "App Store Setup", "1 Month Support"] }
    }
  },
  {
    id: 9,
    title: "Professional Blog Writing",
    description: "High-quality, SEO-optimized blog writing service. I create engaging, well-researched articles that drive traffic and establish your authority in your niche. Perfect for businesses and thought leaders.",
    freelancerId: 4,
    freelancerName: "Sneha Reddy",
    freelancerImage: "https://randomuser.me/api/portraits/women/4.jpg",
    freelancerLevel: "Level 2",
    responseTime: "4 hours",
    category: "Writing",
    rating: 4.6,
    reviews: 27,
    image: "https://picsum.photos/seed/svc9/800/500",
    gallery: [
      "https://picsum.photos/seed/svc9a/800/500",
      "https://picsum.photos/seed/svc9b/800/500",
      "https://picsum.photos/seed/svc9c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 1000, delivery: "2 days", revisions: 1, pages: 1, features: ["500 Words", "1 Blog Post", "1 Revision", "SEO Keywords"] },
      standard: { name: "Standard", price: 3000, delivery: "3 days", revisions: 3, pages: 3, features: ["1500 Words", "3 Blog Posts", "3 Revisions", "SEO Keywords", "Meta Description"] },
      premium: { name: "Premium", price: 8000, delivery: "7 days", revisions: "Unlimited", pages: 10, features: ["2000 Words Each", "10 Blog Posts", "Unlimited Revisions", "SEO Keywords", "Meta Description", "Internal Linking"] }
    }
  },
  {
    id: 10,
    title: "Brand Identity Design",
    description: "Complete brand identity package including logo, color palette, typography, brand guidelines, stationery design, and social media templates. Build a cohesive and memorable brand presence.",
    freelancerId: 6,
    freelancerName: "Kavita Joshi",
    freelancerImage: "https://randomuser.me/api/portraits/women/6.jpg",
    freelancerLevel: "Top Rated",
    responseTime: "30 minutes",
    category: "Design",
    rating: 4.9,
    reviews: 55,
    image: "https://picsum.photos/seed/svc10/800/500",
    gallery: [
      "https://picsum.photos/seed/svc10a/800/500",
      "https://picsum.photos/seed/svc10b/800/500",
      "https://picsum.photos/seed/svc10c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 8000, delivery: "5 days", revisions: 3, pages: 1, features: ["Logo Design", "Color Palette", "Typography", "3 Revisions"] },
      standard: { name: "Standard", price: 20000, delivery: "10 days", revisions: 5, pages: 1, features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines", "Stationery", "5 Revisions"] },
      premium: { name: "Premium", price: 40000, delivery: "14 days", revisions: "Unlimited", pages: 1, features: ["Logo Design", "Full Brand Guidelines", "Stationery", "Social Media Kit", "Packaging", "Unlimited Revisions"] }
    }
  },
  {
    id: 11,
    title: "Custom Illustrations",
    description: "Unique, hand-crafted digital illustrations for any purpose - book covers, marketing materials, social media, products, and more. Each illustration is created from scratch based on your vision.",
    freelancerId: 14,
    freelancerName: "Pooja Verma",
    freelancerImage: "https://randomuser.me/api/portraits/women/14.jpg",
    freelancerLevel: "Level 2",
    responseTime: "3 hours",
    category: "Design",
    rating: 4.6,
    reviews: 20,
    image: "https://picsum.photos/seed/svc11/800/500",
    gallery: [
      "https://picsum.photos/seed/svc11a/800/500",
      "https://picsum.photos/seed/svc11b/800/500",
      "https://picsum.photos/seed/svc11c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 2000, delivery: "3 days", revisions: 2, pages: 1, features: ["1 Illustration", "2 Revisions", "High Res PNG", "Commercial Use"] },
      standard: { name: "Standard", price: 5000, delivery: "5 days", revisions: 5, pages: 3, features: ["3 Illustrations", "5 Revisions", "High Res PNG & SVG", "Commercial Use", "Source File"] },
      premium: { name: "Premium", price: 12000, delivery: "10 days", revisions: "Unlimited", pages: 6, features: ["6 Illustrations", "Unlimited Revisions", "All Formats", "Commercial Use", "Source Files", "Animated Version"] }
    }
  },
  {
    id: 12,
    title: "Backend API Development",
    description: "Secure, scalable REST API development with authentication, database design, and comprehensive documentation. Built with best practices for performance and maintainability.",
    freelancerId: 13,
    freelancerName: "Nikhil Bansal",
    freelancerImage: "https://randomuser.me/api/portraits/men/13.jpg",
    freelancerLevel: "Top Rated",
    responseTime: "1 hour",
    category: "Development",
    rating: 4.8,
    reviews: 36,
    image: "https://picsum.photos/seed/svc12/800/500",
    gallery: [
      "https://picsum.photos/seed/svc12a/800/500",
      "https://picsum.photos/seed/svc12b/800/500",
      "https://picsum.photos/seed/svc12c/800/500"
    ],
    packages: {
      basic: { name: "Basic", price: 10000, delivery: "5 days", revisions: 2, pages: 5, features: ["5 Endpoints", "Basic Auth", "2 Revisions", "Documentation"] },
      standard: { name: "Standard", price: 25000, delivery: "10 days", revisions: 5, pages: 15, features: ["15 Endpoints", "JWT Auth", "Database Design", "5 Revisions", "Swagger Docs", "Testing"] },
      premium: { name: "Premium", price: 50000, delivery: "21 days", revisions: "Unlimited", pages: 30, features: ["30+ Endpoints", "Full Auth System", "Database Design", "Unlimited Revisions", "Swagger Docs", "Testing", "CI/CD Setup"] }
    }
  }
];

export default services;
