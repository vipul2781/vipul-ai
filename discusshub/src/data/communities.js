export const initialCommunities = [
  {
    id: "webdev",
    slug: "webdev",
    name: "Web Development",
    tagline: "r/WebDevelopment",
    description: "Discuss frontend, backend, frameworks, tools, web standards, and modern web development best practices.",
    category: "Programming",
    icon: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    membersCount: 125400,
    onlineCount: 5200,
    postsCount: 18450,
    postsThisWeek: 2540,
    createdAt: "March 2019",
    isJoined: true,
    privacy: "Public",
    rules: [
      "Be respectful and constructive in all discussions.",
      "No direct spam, low-effort affiliate links, or self-promotion.",
      "Format code blocks properly using markdown syntax.",
      "No harassment, hate speech, or derogatory comments.",
      "Use clear, descriptive titles that summarize the question or topic."
    ],
    moderators: [
      { id: "rahul_sharma", name: "Rahul Sharma", role: "Lead Moderator", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "alex_chen", name: "Alex Chen", role: "DevOps Moderator", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "priya_patel", name: "Priya Patel", role: "Community Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "reactdevs",
    slug: "reactdevs",
    name: "React Developers",
    tagline: "r/ReactDevelopers",
    description: "Everything React ecosystem: React 19, Next.js, Vite, React Router, Redux, Zustand, React Query, and UI libraries.",
    category: "Programming",
    icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    membersCount: 98200,
    onlineCount: 4100,
    postsCount: 14200,
    postsThisWeek: 1890,
    createdAt: "August 2020",
    isJoined: true,
    privacy: "Public",
    rules: [
      "Keep discussions focused on React and modern frontend libraries.",
      "Provide reproducible examples or CodeSandboxes when asking for bug help.",
      "Respect community guidelines and welcome beginners.",
      "Disclose sponsorships or tools you maintain when discussing them."
    ],
    moderators: [
      { id: "priya_patel", name: "Priya Patel", role: "Lead Moderator", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
      { id: "maya_lin", name: "Maya Lin", role: "Senior Moderator", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "javascript",
    slug: "javascript",
    name: "JavaScript",
    tagline: "r/JavaScript",
    description: "The home for ECMAScript, TypeScript, Node.js, V8 engine deep-dives, modern frameworks, and runtime quirks.",
    category: "Programming",
    icon: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    membersCount: 142000,
    onlineCount: 6800,
    postsCount: 22800,
    postsThisWeek: 3100,
    createdAt: "May 2018",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Keep questions technical and specify the runtime (Browser/Node/Deno).",
      "No homework solution requests without showing your initial attempt.",
      "Treat all members with courtesy."
    ],
    moderators: [
      { id: "rahul_sharma", name: "Rahul Sharma", role: "Founder", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "alex_chen", name: "Alex Chen", role: "Tech Moderator", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "gaming",
    slug: "gaming",
    name: "Gaming Haven",
    tagline: "r/Gaming",
    description: "From indie gems and cozy simulators to AAA blockbusters and esports tournaments. Clips, news, and gear setups.",
    category: "Gaming",
    icon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
    membersCount: 88700,
    onlineCount: 3900,
    postsCount: 16700,
    postsThisWeek: 2100,
    createdAt: "November 2019",
    isJoined: true,
    privacy: "Public",
    rules: [
      "No console wars or toxic gamer rhetoric.",
      "Spoiler tags are mandatory for recent releases (within 6 months).",
      "Give proper credit for fan art and gameplay clips."
    ],
    moderators: [
      { id: "marcus_vance", name: "Marcus Vance", role: "Chief Moderator", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "technology",
    slug: "technology",
    name: "Technology & AI",
    tagline: "r/Technology",
    description: "Cutting-edge hardware, generative AI breakthroughs, quantum computing, cybersecurity policies, and future tech.",
    category: "Technology",
    icon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80",
    membersCount: 165000,
    onlineCount: 7400,
    postsCount: 29400,
    postsThisWeek: 4200,
    createdAt: "January 2018",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Provide original sources for all breaking technology news.",
      "Fact-check claims before creating discussions.",
      "No sensationalist clickbait titles."
    ],
    moderators: [
      { id: "elena_rostova", name: "Elena Rostova", role: "AI Research Mod", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80" },
      { id: "jason_bourne_dev", name: "Jason Bourne", role: "Cybersecurity Mod", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "photography",
    slug: "photography",
    name: "Photography Hub",
    tagline: "r/Photography",
    description: "Share your captures, discuss glass and sensors, master Lightroom/Darktable post-processing, and receive constructive critiques.",
    category: "Photography",
    icon: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&auto=format&fit=crop&q=80",
    membersCount: 54300,
    onlineCount: 1850,
    postsCount: 8900,
    postsThisWeek: 940,
    createdAt: "September 2020",
    isJoined: true,
    privacy: "Public",
    rules: [
      "Always post EXIF data (Camera, Lens, Shutter, Aperture, ISO) when seeking feedback.",
      "Constructive critique only; explain 'why' you like or suggest adjustments.",
      "Only upload photos you have shot yourself."
    ],
    moderators: [
      { id: "sophia_miller", name: "Sophia Miller", role: "Visual Curator", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "movies",
    slug: "movies",
    name: "Movies & Cinema",
    tagline: "r/Movies",
    description: "Film analysis, director retrospectives, cinematography deep-dives, box office trends, and festival highlights.",
    category: "Entertainment",
    icon: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop&q=80",
    membersCount: 71200,
    onlineCount: 2900,
    postsCount: 11300,
    postsThisWeek: 1450,
    createdAt: "February 2020",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Use spoiler tags prominently for all major plot twists.",
      "Encourage diverse cinema from around the globe.",
      "Civil discussion on ratings and reviews."
    ],
    moderators: [
      { id: "ananya_deshmukh", name: "Ananya Deshmukh", role: "Chief Critic", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "education",
    slug: "education",
    name: "Lifelong Education",
    tagline: "r/Education",
    description: "Curated learning paths, MOOC reviews, study techniques, memory science, and academic research discussions.",
    category: "Education",
    icon: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80",
    membersCount: 46800,
    onlineCount: 1600,
    postsCount: 6700,
    postsThisWeek: 820,
    createdAt: "July 2021",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Share verified and peer-reviewed educational materials.",
      "Maintain a collaborative, encouraging learning tone.",
      "Cite primary references where applicable."
    ],
    moderators: [
      { id: "zara_almansoori", name: "Zara Al-Mansoori", role: "Academic Dean", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "science",
    slug: "science",
    name: "Cosmos & Science",
    tagline: "r/Science",
    description: "Explore the frontiers of astronomy, quantum mechanics, evolutionary biology, neuroscience, and energy physics.",
    category: "Science",
    icon: "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    membersCount: 63400,
    onlineCount: 2400,
    postsCount: 9200,
    postsThisWeek: 1120,
    createdAt: "June 2020",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Speculation must be grounded in empirical scientific principles.",
      "Cite journal DOIs or university announcements.",
      "No pseudoscience or conspiracy theories."
    ],
    moderators: [
      { id: "david_kim", name: "David Kim", role: "Astronomy Mod", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "music",
    slug: "music",
    name: "Music Production",
    tagline: "r/MusicProduction",
    description: "DAWs, synthesis, mixing, analog gear, songwriting techniques, acoustics, and audio plugin masterclasses.",
    category: "Music",
    icon: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    membersCount: 38900,
    onlineCount: 1350,
    postsCount: 5400,
    postsThisWeek: 640,
    createdAt: "October 2021",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Share your signal chain when uploading audio snippets.",
      "Feedback threads must include constructive notes on mix balance.",
      "No pirated sample packs or cracked VST distribution."
    ],
    moderators: [
      { id: "carlos_gomez", name: "Carlos Gomez", role: "Audio Engineer", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "sports",
    slug: "sports",
    name: "Sports & Athletics",
    tagline: "r/SportsAnalytics",
    description: "Athletic endurance, data-driven football tactical analysis, basketball metrics, running milestones, and strength training.",
    category: "Sports",
    icon: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200&auto=format&fit=crop&q=80",
    membersCount: 31200,
    onlineCount: 950,
    postsCount: 4200,
    postsThisWeek: 510,
    createdAt: "January 2022",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Healthy debate without partisan insult slinging.",
      "Back claims with game footage or statistical metrics.",
      "Support beginner athletes and marathoners."
    ],
    moderators: [
      { id: "liam_smith", name: "Liam Smith", role: "Sports Mod", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "lifestyle",
    slug: "lifestyle",
    name: "Mindful Productivity",
    tagline: "r/Productivity",
    description: "Habit formation, deep work protocols, digital decluttering, ergonomic workspaces, and healthy remote lifestyles.",
    category: "Lifestyle",
    icon: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80",
    membersCount: 41500,
    onlineCount: 1420,
    postsCount: 6100,
    postsThisWeek: 730,
    createdAt: "May 2022",
    isJoined: false,
    privacy: "Public",
    rules: [
      "Focus on sustainable habits rather than extreme burnout hustle.",
      "Be empathetic with people overcoming executive dysfunction.",
      "No generic self-help spam."
    ],
    moderators: [
      { id: "neha_verma", name: "Neha Verma", role: "Wellness Lead", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80" }
    ]
  }
];
