export const initialPosts = [
  {
    id: "post-1",
    title: "How do you structure a large React application in 2026? Features vs Layers",
    content: "We're currently scaling our enterprise dashboard from 20 to 120+ domain routes and running into maintainability bottlenecks with traditional layered architecture (components/, hooks/, services/). We've been experimenting with feature-sliced design (FSD) where each business domain holds its own components, hooks, api layer, and types. What patterns have worked best for your teams when scaling past 50,000 lines of code?",
    author: {
      id: "rahul_sharma",
      name: "Rahul Sharma",
      username: "rahul_sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "reactdevs",
    communityName: "React Developers",
    communityTag: "r/ReactDevelopers",
    communityIcon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Discussion",
    votes: 342,
    commentsCount: 78,
    createdAt: "2 hours ago",
    timestamp: Date.now() - 7200000,
    tags: ["React", "Architecture", "JavaScript", "Frontend"],
    isTrending: true,
    isPopular: true,
    codeSnippet: `// Example Feature Module Layout:
// src/features/billing/
// ├── components/ (InvoiceTable.jsx, PlanCard.jsx)
// ├── hooks/      (useSubscription.js)
// ├── api/        (billingApi.js)
// ├── types/      (index.d.ts)
// └── index.js    (public exports only)`
  },
  {
    id: "post-2",
    title: "React 19 Server Actions vs Traditional REST API with TanStack Query: Real benchmark",
    content: "After migrating our customer portal from TanStack Query + Express backend to direct React Server Actions in Next.js, we recorded mixed results. While initial payload dropped by 22% and hydration latency improved, mutation error boundaries and optimistic state updates were noticeably trickier to roll back gracefully. Here's our comprehensive breakdown.",
    author: {
      id: "priya_patel",
      name: "Priya Patel",
      username: "priya_patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "webdev",
    communityName: "Web Development",
    communityTag: "r/WebDevelopment",
    communityIcon: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Showcase",
    votes: 289,
    commentsCount: 54,
    createdAt: "4 hours ago",
    timestamp: Date.now() - 14400000,
    tags: ["WebDev", "React", "Performance", "REST"],
    isTrending: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-3",
    title: "Docker Compose setup for full-stack developers: PostgreSQL, Redis, Node, Vite",
    content: "Tired of coworkers saying 'well it works on my machine'? I wrote an ultra-fast local development compose spec with hot-module reload preserved, healthcheck wait conditions, and automatic persistent volume caching. Check out the snippet below and let me know your thoughts!",
    author: {
      id: "alex_chen",
      name: "Alex Chen",
      username: "alex_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "webdev",
    communityName: "Web Development",
    communityTag: "r/WebDevelopment",
    communityIcon: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Discussion",
    votes: 412,
    commentsCount: 92,
    createdAt: "6 hours ago",
    timestamp: Date.now() - 21600000,
    tags: ["Docker", "DevOps", "Node.js", "PostgreSQL"],
    isTrending: true,
    isPopular: true,
    codeSnippet: `services:
  web:
    build: .
    ports: ["3000:3000"]
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development`
  },
  {
    id: "post-4",
    title: "Community Poll: What is your primary state management tool in 2026?",
    content: "With React's built-in state primitives maturing and libraries continuing to innovate, where does the community currently stand? Cast your vote below and share why you picked it in the comments.",
    author: {
      id: "maya_lin",
      name: "Maya Lin",
      username: "maya_lin",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "reactdevs",
    communityName: "React Developers",
    communityTag: "r/ReactDevelopers",
    communityIcon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Poll",
    votes: 518,
    commentsCount: 114,
    createdAt: "8 hours ago",
    timestamp: Date.now() - 28800000,
    tags: ["React", "Zustand", "Redux", "Poll"],
    isTrending: true,
    isPopular: true,
    pollData: {
      question: "Which state manager is your default choice?",
      options: [
        { text: "Zustand (Micro state)", votes: 642 },
        { text: "TanStack Query + URL State", votes: 819 },
        { text: "Redux Toolkit (RTK)", votes: 310 },
        { text: "Pure Context API + useReducer", votes: 204 }
      ]
    }
  },
  {
    id: "post-5",
    title: "The hidden beauty of JavaScript Temporal API: Goodbye moment and date-fns!",
    content: "The Temporal proposal is finally rolling into modern browser engines and Node.js. It resolves decades-old date calculation flaws, leap seconds bugs, and time zone offsets. Here is a quick comparison showing how clean date manipulation looks without any external libraries.",
    author: {
      id: "rahul_sharma",
      name: "Rahul Sharma",
      username: "rahul_sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "javascript",
    communityName: "JavaScript",
    communityTag: "r/JavaScript",
    communityIcon: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Discussion",
    votes: 198,
    commentsCount: 37,
    createdAt: "12 hours ago",
    timestamp: Date.now() - 43200000,
    tags: ["JavaScript", "ECMAScript", "WebDevelopment"],
    isTrending: true,
    isPopular: false,
    codeSnippet: `const start = Temporal.Now.plainDateISO();
const end = start.add({ months: 2, days: 5 });
const duration = start.until(end, { largestUnit: 'days' });
console.log(duration.days); // Accurate & timezone safe!`
  },
  {
    id: "post-6",
    title: "Cybersecurity Alert: Common mistakes in JSON Web Token (JWT) storage in SPAs",
    content: "Still storing access tokens directly in localStorage? While convenient, it exposes your users to XSS token theft. In this post, we explain why secure HTTP-only cookies paired with SameSite=Lax and CSRF token double-submit headers remain the gold standard for web apps.",
    author: {
      id: "jason_bourne_dev",
      name: "Jason Bourne",
      username: "jason_bourne_dev",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "technology",
    communityName: "Technology & AI",
    communityTag: "r/Technology",
    communityIcon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80",
    category: "Technology",
    postType: "Announcement",
    votes: 387,
    commentsCount: 65,
    createdAt: "14 hours ago",
    timestamp: Date.now() - 50400000,
    tags: ["Cybersecurity", "JWT", "Security", "WebDev"],
    isTrending: true,
    isPopular: true
  },
  {
    id: "post-7",
    title: "Golden Hour in the Dolomites: 70-200mm f/2.8 lens review & RAW breakdown",
    content: "Captured this panoramic shot at Tre Cime di Lavaredo just as the setting sun kissed the jagged limestone peaks. Handheld at 1/500s, f/5.6, ISO 200 on Sony A7R V. What adjustments would you make to the highlight roll-off in the clouds?",
    author: {
      id: "sophia_miller",
      name: "Sophia Miller",
      username: "sophia_miller",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "photography",
    communityName: "Photography Hub",
    communityTag: "r/Photography",
    communityIcon: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&auto=format&fit=crop&q=80",
    category: "Photography",
    postType: "Showcase",
    votes: 462,
    commentsCount: 48,
    createdAt: "18 hours ago",
    timestamp: Date.now() - 64800000,
    tags: ["Photography", "SonyAlpha", "Landscape", "EXIF"],
    isTrending: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-8",
    title: "Unreal Engine 5.4 Nanite Tessellation & Lumen: Indie developer post-mortem",
    content: "We spent 8 months building our stylized dungeon crawler using UE5's Nanite geometry. The performance improvements in 5.4 on mid-tier hardware (RTX 3060) are astonishing, but dynamic foliage and translucency still require careful profiling. Here is what we learned.",
    author: {
      id: "marcus_vance",
      name: "Marcus Vance",
      username: "marcus_vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "gaming",
    communityName: "Gaming Haven",
    communityTag: "r/Gaming",
    communityIcon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80",
    category: "Gaming",
    postType: "Discussion",
    votes: 275,
    commentsCount: 39,
    createdAt: "1 day ago",
    timestamp: Date.now() - 86400000,
    tags: ["Gaming", "UnrealEngine", "GameDev", "3D"],
    isTrending: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-9",
    title: "Why Christopher Nolan's sound mixing prioritizes visceral sensory over crisp dialogue",
    content: "From Interstellar and Tenet to Oppenheimer, sound design in contemporary auteur cinema often sacrifices line clarity for acoustic authenticity and physiological impact. Let's analyze why sound mixing choices are intentional artistic decisions rather than technical oversights.",
    author: {
      id: "ananya_deshmukh",
      name: "Ananya Deshmukh",
      username: "ananya_deshmukh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "movies",
    communityName: "Movies & Cinema",
    communityTag: "r/Movies",
    communityIcon: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=100&auto=format&fit=crop&q=80",
    category: "Entertainment",
    postType: "Discussion",
    votes: 312,
    commentsCount: 62,
    createdAt: "1 day ago",
    timestamp: Date.now() - 93600000,
    tags: ["Movies", "Cinema", "SoundDesign", "Directing"],
    isTrending: false,
    isPopular: true
  },
  {
    id: "post-10",
    title: "James Webb Space Telescope detects potential atmospheric biomarkers on K2-18b",
    content: "Spectroscopic transmission data from JWST NIRISS and NIRSpec instruments has revealed methane and carbon dioxide in the hydrogen-rich atmosphere of exoplanet K2-18b, with tentative hints of dimethyl sulfide (DMS). Here is a breakdown of what this means for astrobiology.",
    author: {
      id: "david_kim",
      name: "David Kim",
      username: "david_kim",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "science",
    communityName: "Cosmos & Science",
    communityTag: "r/Science",
    communityIcon: "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=100&auto=format&fit=crop&q=80",
    category: "Science",
    postType: "Announcement",
    votes: 540,
    commentsCount: 88,
    createdAt: "2 days ago",
    timestamp: Date.now() - 172800000,
    tags: ["Science", "Space", "JWST", "Astronomy"],
    isTrending: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-11",
    title: "How to apply the Feynman Technique to master complex algorithmic concepts",
    content: "When learning distributed systems or dynamic programming, passive reading gives a dangerous illusion of competence. By teaching the concept to a complete beginner using simple analogies and identifying where you stumble, true intuition forms. Here is my 4-step template.",
    author: {
      id: "zara_almansoori",
      name: "Zara Al-Mansoori",
      username: "zara_almansoori",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "education",
    communityName: "Lifelong Education",
    communityTag: "r/Education",
    communityIcon: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80",
    category: "Education",
    postType: "Discussion",
    votes: 265,
    commentsCount: 34,
    createdAt: "2 days ago",
    timestamp: Date.now() - 180000000,
    tags: ["Education", "Learning", "Productivity", "Feynman"],
    isTrending: false,
    isPopular: false
  },
  {
    id: "post-12",
    title: "Sidechain Compression in Ableton 12: Ducking bass without killing low-end warmth",
    content: "Most beginner producers slap an aggressive sidechain compressor on their sub-bass that cuts off everything below 80Hz abruptly. Using dynamic EQ or multiband sidechaining lets you duck only the kick fundamental (50-65Hz) while leaving the sub rumble intact. Here is the exact routing rack.",
    author: {
      id: "carlos_gomez",
      name: "Carlos Gomez",
      username: "carlos_gomez",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "music",
    communityName: "Music Production",
    communityTag: "r/MusicProduction",
    communityIcon: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80",
    category: "Music",
    postType: "Showcase",
    votes: 215,
    commentsCount: 29,
    createdAt: "3 days ago",
    timestamp: Date.now() - 259200000,
    tags: ["Music", "Ableton", "AudioEngineering", "Mixing"],
    isTrending: false,
    isPopular: false
  },
  {
    id: "post-13",
    title: "Marathon pacing strategy: Negative splits vs even pacing according to physiological data",
    content: "Analyzing finish times across 45,000 Boston and London Marathon runners reveals that runners who aim for a 2-3% negative split (running the second half slightly faster) are 40% less likely to hit the infamous wall at kilometer 32. Here is the heart rate lactate threshold math.",
    author: {
      id: "liam_smith",
      name: "Liam Smith",
      username: "liam_smith",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "sports",
    communityName: "Sports & Athletics",
    communityTag: "r/SportsAnalytics",
    communityIcon: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&auto=format&fit=crop&q=80",
    category: "Sports",
    postType: "Discussion",
    votes: 184,
    commentsCount: 21,
    createdAt: "3 days ago",
    timestamp: Date.now() - 270000000,
    tags: ["Sports", "Running", "Marathon", "Analytics"],
    isTrending: false,
    isPopular: false
  },
  {
    id: "post-14",
    title: "The 90-minute ultradian rhythm: Why 8-hour uninterrupted coding marathons are a myth",
    content: "Human cognitive biology does not operate on a flat 8-hour attention curve. Neuroscience shows our brains experience 90 to 120-minute ultradian cycles of peak mental alertness followed by natural energy dips. Structuring your deep work sprints around these natural cycles completely eliminates afternoon brain fog.",
    author: {
      id: "neha_verma",
      name: "Neha Verma",
      username: "neha_verma",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "lifestyle",
    communityName: "Mindful Productivity",
    communityTag: "r/Productivity",
    communityIcon: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&auto=format&fit=crop&q=80",
    category: "Lifestyle",
    postType: "Discussion",
    votes: 395,
    commentsCount: 52,
    createdAt: "3 days ago",
    timestamp: Date.now() - 280000000,
    tags: ["Productivity", "Mindfulness", "RemoteWork", "Health"],
    isTrending: false,
    isPopular: true
  },
  {
    id: "post-15",
    title: "Understanding Transformer Attention: Why query, key, and value vectors make intuitive sense",
    content: "Self-attention is often explained through dry matrix multiplications, but it is actually identical to a soft database lookup. The Query is your search prompt, the Keys are the index tags of all candidate tokens, and the Values are the actual information retrieved. Here is an interactive visual walk-through.",
    author: {
      id: "elena_rostova",
      name: "Elena Rostova",
      username: "elena_rostova",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "technology",
    communityName: "Technology & AI",
    communityTag: "r/Technology",
    communityIcon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80",
    category: "Technology",
    postType: "Discussion",
    votes: 489,
    commentsCount: 71,
    createdAt: "4 days ago",
    timestamp: Date.now() - 345600000,
    tags: ["AI", "MachineLearning", "Transformers", "DeepLearning"],
    isTrending: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-16",
    title: "CSS Container Queries vs Media Queries: When should you actually use container units?",
    content: "Media queries respond to the global viewport, making modular reusable components difficult when placed in sidebars vs main content areas. Container queries (cqw, cqh) allow cards to adapt to their immediate parent container width. Let's see how this transforms component library design.",
    author: {
      id: "maya_lin",
      name: "Maya Lin",
      username: "maya_lin",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "webdev",
    communityName: "Web Development",
    communityTag: "r/WebDevelopment",
    communityIcon: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Discussion",
    votes: 326,
    commentsCount: 41,
    createdAt: "4 days ago",
    timestamp: Date.now() - 360000000,
    tags: ["CSS", "Frontend", "WebDev", "Responsive"],
    isTrending: false,
    isPopular: true,
    codeSnippet: `.card-container {
  container-type: inline-size;
}

@container (min-width: 450px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}`
  },
  {
    id: "post-17",
    title: "TypeScript 5.5 type narrowing in array methods (.filter(Boolean)): Finally native!",
    content: "For years, writing array.filter(x => x !== undefined) returned (T | undefined)[] unless you cast with a custom type predicate like (x): x is T. TypeScript 5.5 automatically infers type narrowing on array filter callbacks without any boilerplate. Look at this clean code.",
    author: {
      id: "rahul_sharma",
      name: "Rahul Sharma",
      username: "rahul_sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "javascript",
    communityName: "JavaScript",
    communityTag: "r/JavaScript",
    communityIcon: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Discussion",
    votes: 374,
    commentsCount: 46,
    createdAt: "5 days ago",
    timestamp: Date.now() - 432000000,
    tags: ["TypeScript", "JavaScript", "CleanCode"],
    isTrending: false,
    isPopular: true,
    codeSnippet: `const mixed = ['apple', null, 'orange', undefined];
// In TS 5.5+, valid is automatically inferred as string[]:
const valid = mixed.filter((item): item is string => item !== null && item !== undefined);`
  },
  {
    id: "post-18",
    title: "Beginner's guide to React Router v6.4+ Data APIs: loaders, actions, and useFetcher",
    content: "If you are still fetching data inside useEffect hooks on component mount, you are causing unnecessary waterfalls and layout shift. React Router's loader functions fetch parallel data before the route component even renders. Here is a battle-tested example.",
    author: {
      id: "priya_patel",
      name: "Priya Patel",
      username: "priya_patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "reactdevs",
    communityName: "React Developers",
    communityTag: "r/ReactDevelopers",
    communityIcon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Discussion",
    votes: 410,
    commentsCount: 58,
    createdAt: "5 days ago",
    timestamp: Date.now() - 440000000,
    tags: ["React", "ReactRouter", "WebDev", "DataFetching"],
    isTrending: false,
    isPopular: true
  },
  {
    id: "post-19",
    title: "Street Photography in Old Delhi: High-contrast monochrome with Fujifilm simulations",
    content: "Spent a rainy morning navigating the spices and narrow alleyways of Chandni Chowk with the X100VI and ACROS film simulation with red filter. The shadows and light beams piercing through cloth awnings created unreal geometry. Sharing a series of 5 frames.",
    author: {
      id: "sophia_miller",
      name: "Sophia Miller",
      username: "sophia_miller",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "photography",
    communityName: "Photography Hub",
    communityTag: "r/Photography",
    communityIcon: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&auto=format&fit=crop&q=80",
    category: "Photography",
    postType: "Showcase",
    votes: 310,
    commentsCount: 33,
    createdAt: "6 days ago",
    timestamp: Date.now() - 518400000,
    tags: ["Photography", "Street", "Fujifilm", "BlackAndWhite"],
    isTrending: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-20",
    title: "Why Elden Ring's open world design works where conventional checklist maps fail",
    content: "Most modern open world games fill your compass with a hundred markers before you even embark, robbing the player of organic discovery. By using environmental landmarks, topography cues, and subtle soundscapes, Elden Ring brings back the genuine thrill of curiosity.",
    author: {
      id: "marcus_vance",
      name: "Marcus Vance",
      username: "marcus_vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "gaming",
    communityName: "Gaming Haven",
    communityTag: "r/Gaming",
    communityIcon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80",
    category: "Gaming",
    postType: "Discussion",
    votes: 498,
    commentsCount: 82,
    createdAt: "6 days ago",
    timestamp: Date.now() - 530000000,
    tags: ["Gaming", "GameDesign", "EldenRing", "RPG"],
    isTrending: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "post-21",
    title: "Understanding Micro-frontends with Module Federation: Is the complexity worth it?",
    content: "Micro-frontends solve organizational scaling problems, not technical ones. If your team has fewer than 50 engineers, you are almost always better off with a well-architected modular monorepo using Turborepo or Nx rather than runtime Webpack 5 module federation. Here's our architectural audit.",
    author: {
      id: "tariq_ahmed",
      name: "Tariq Ahmed",
      username: "tariq_ahmed",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
    },
    communityId: "webdev",
    communityName: "Web Development",
    communityTag: "r/WebDevelopment",
    communityIcon: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=100&auto=format&fit=crop&q=80",
    category: "Programming",
    postType: "Question",
    votes: 245,
    commentsCount: 39,
    createdAt: "7 days ago",
    timestamp: Date.now() - 604800000,
    tags: ["WebDev", "MicroFrontends", "Architecture"],
    isTrending: false,
    isPopular: false
  }
];
