export const initialComments = [
  {
    id: "c-1",
    postId: "post-1",
    parentId: null,
    author: {
      id: "priya_patel",
      name: "Priya Patel",
      username: "priya_patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    content: "Feature-Sliced Design (FSD) was a complete game changer for our team of 15 devs. When you group by feature (e.g. features/cart, features/checkout) rather than type (components, hooks), deleting or deprecating a legacy feature is as simple as deleting one folder without orphaned components all over the repo.",
    votes: 42,
    createdAt: "2 hours ago",
    timestamp: Date.now() - 7200000,
    replies: [
      {
        id: "c-1-1",
        postId: "post-1",
        parentId: "c-1",
        author: {
          id: "rahul_sharma",
          name: "Rahul Sharma",
          username: "rahul_sharma",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        },
        content: "Totally agree Priya! How do you handle cross-feature dependencies though? Do you enforce a strict rule that features can never import from sibling features directly, and instead must pass through an entities or shared layer?",
        votes: 19,
        createdAt: "1 hour ago",
        timestamp: Date.now() - 3600000,
        replies: [
          {
            id: "c-1-1-1",
            postId: "post-1",
            parentId: "c-1-1",
            author: {
              id: "priya_patel",
              name: "Priya Patel",
              username: "priya_patel",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
            },
            content: "Yes, exactly! We use ESLint's import/order and boundaries plugins to strictly forbid sibling imports. If cart needs user data, it imports from 'entities/user' or receives it via composition in the pages layer.",
            votes: 15,
            createdAt: "45 minutes ago",
            timestamp: Date.now() - 2700000,
            replies: []
          }
        ]
      },
      {
        id: "c-1-2",
        postId: "post-1",
        parentId: "c-1",
        author: {
          id: "maya_lin",
          name: "Maya Lin",
          username: "maya_lin",
          avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80"
        },
        content: "We tried FSD but junior developers found the strict layered hierarchy (app > pages > widgets > features > entities > shared) a bit dogmatic initially. Once we set up generator scripts (e.g., plop.js), adoption skyrocketed.",
        votes: 11,
        createdAt: "30 minutes ago",
        timestamp: Date.now() - 1800000,
        replies: []
      }
    ]
  },
  {
    id: "c-2",
    postId: "post-1",
    parentId: null,
    author: {
      id: "alex_chen",
      name: "Alex Chen",
      username: "alex_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    content: "Also don't sleep on package-based monorepos using Turborepo or Nx! Separating UI design system into `packages/ui` and business logic into `packages/core` forces clean boundaries and drastically cuts build times.",
    votes: 31,
    createdAt: "1 hour ago",
    timestamp: Date.now() - 3600000,
    replies: [
      {
        id: "c-2-1",
        postId: "post-1",
        parentId: "c-2",
        author: {
          id: "tariq_ahmed",
          name: "Tariq Ahmed",
          username: "tariq_ahmed",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
        },
        content: "Seconding Turborepo. The remote caching on GitHub Actions saved our CI pipeline over 35 minutes per PR.",
        votes: 8,
        createdAt: "20 minutes ago",
        timestamp: Date.now() - 1200000,
        replies: []
      }
    ]
  },
  {
    id: "c-3",
    postId: "post-2",
    parentId: null,
    author: {
      id: "rahul_sharma",
      name: "Rahul Sharma",
      username: "rahul_sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    content: "This matches our experience! The optimistic UI ergonomics in TanStack Query (with queryClient.setQueryData rollback) are still unmatched for highly collaborative data-dense apps.",
    votes: 27,
    createdAt: "3 hours ago",
    timestamp: Date.now() - 10800000,
    replies: [
      {
        id: "c-3-1",
        postId: "post-2",
        parentId: "c-3",
        author: {
          id: "maya_lin",
          name: "Maya Lin",
          username: "maya_lin",
          avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80"
        },
        content: "React 19's `useOptimistic` hook makes it much better now, but error boundaries handling inside actions still needs more polished developer ergonomics.",
        votes: 14,
        createdAt: "2 hours ago",
        timestamp: Date.now() - 7200000,
        replies: []
      }
    ]
  },
  {
    id: "c-4",
    postId: "post-3",
    parentId: null,
    author: {
      id: "jason_bourne_dev",
      name: "Jason Bourne",
      username: "jason_bourne_dev",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
    },
    content: "One security caveat for anyone using this compose file in staging: ensure you don't expose Redis or Postgres ports (`5432:5432`) directly to the public network. Bind them to 127.0.0.1:5432 or keep them strictly on internal docker network bridge.",
    votes: 36,
    createdAt: "5 hours ago",
    timestamp: Date.now() - 18000000,
    replies: []
  },
  {
    id: "c-5",
    postId: "post-4",
    parentId: null,
    author: {
      id: "alex_chen",
      name: "Alex Chen",
      username: "alex_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    content: "Zustand is our team favorite by far. Zero boilerplate, no Provider wrappers cluttering the root component, and super easy outside-of-React subscription for websocket event handlers.",
    votes: 49,
    createdAt: "7 hours ago",
    timestamp: Date.now() - 25200000,
    replies: []
  },
  {
    id: "c-6",
    postId: "post-5",
    parentId: null,
    author: {
      id: "priya_patel",
      name: "Priya Patel",
      username: "priya_patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    content: "Finally! No more weird 0-indexed months where January is 0 and December is 11. Temporal is the best thing to happen to JavaScript standard library in a decade.",
    votes: 38,
    createdAt: "10 hours ago",
    timestamp: Date.now() - 36000000,
    replies: []
  },
  {
    id: "c-7",
    postId: "post-6",
    parentId: null,
    author: {
      id: "elena_rostova",
      name: "Elena Rostova",
      username: "elena_rostova",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80"
    },
    content: "Crucial post. Too many bootcamp tutorials teach `localStorage.setItem('token', token)` without warning beginners about malicious script injections through npm supply chain attacks.",
    votes: 45,
    createdAt: "11 hours ago",
    timestamp: Date.now() - 39600000,
    replies: []
  },
  {
    id: "c-8",
    postId: "post-7",
    parentId: null,
    author: {
      id: "carlos_gomez",
      name: "Carlos Gomez",
      username: "carlos_gomez",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
    },
    content: "The tonal contrast and atmospheric haze are pristine. If anything, a gentle linear gradient masking the upper right sky with -0.3EV exposure would keep the eye locked onto that central peak.",
    votes: 18,
    createdAt: "16 hours ago",
    timestamp: Date.now() - 57600000,
    replies: [
      {
        id: "c-8-1",
        postId: "post-7",
        parentId: "c-8",
        author: {
          id: "sophia_miller",
          name: "Sophia Miller",
          username: "sophia_miller",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
        },
        content: "Great critique Carlos! I tested that in Lightroom and it balanced the highlights noticeably better. Appreciate the feedback!",
        votes: 12,
        createdAt: "14 hours ago",
        timestamp: Date.now() - 50400000,
        replies: []
      }
    ]
  },
  {
    id: "c-9",
    postId: "post-8",
    parentId: null,
    author: {
      id: "david_kim",
      name: "David Kim",
      username: "david_kim",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
    },
    content: "How did you handle shader compilation stuttering on the first launch? Did you implement PSO caching or warm-up passes?",
    votes: 16,
    createdAt: "20 hours ago",
    timestamp: Date.now() - 72000000,
    replies: []
  },
  {
    id: "c-10",
    postId: "post-9",
    parentId: null,
    author: {
      id: "neha_verma",
      name: "Neha Verma",
      username: "neha_verma",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80"
    },
    content: "I love the artistic intent, but having to keep subtitles on even in your native language can be frustrating for accessibility. There should be a dedicated dialogue-enhanced theater audio track option.",
    votes: 52,
    createdAt: "22 hours ago",
    timestamp: Date.now() - 79200000,
    replies: []
  },
  {
    id: "c-11",
    postId: "post-10",
    parentId: null,
    author: {
      id: "elena_rostova",
      name: "Elena Rostova",
      username: "elena_rostova",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80"
    },
    content: "DMS detection is thrilling, although the statistical confidence is currently around 2-sigma. We'll need follow-up transit observations to reach the gold standard 5-sigma discovery threshold.",
    votes: 39,
    createdAt: "1 day ago",
    timestamp: Date.now() - 86400000,
    replies: []
  },
  {
    id: "c-12",
    postId: "post-11",
    parentId: null,
    author: {
      id: "rahul_sharma",
      name: "Rahul Sharma",
      username: "rahul_sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    content: "The rubber duck debugging method is essentially a mini version of the Feynman technique. Speaking out loud forces your brain to serialize thoughts into coherent logical sentences.",
    votes: 29,
    createdAt: "1 day ago",
    timestamp: Date.now() - 90000000,
    replies: []
  },
  {
    id: "c-13",
    postId: "post-12",
    parentId: null,
    author: {
      id: "marcus_vance",
      name: "Marcus Vance",
      username: "marcus_vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    content: "Fabfilter Pro-MB dynamic sidechaining is also fantastic for this. Saves so much headroom without that unnatural pumping artifact.",
    votes: 14,
    createdAt: "2 days ago",
    timestamp: Date.now() - 172800000,
    replies: []
  },
  {
    id: "c-14",
    postId: "post-13",
    parentId: null,
    author: {
      id: "alex_chen",
      name: "Alex Chen",
      username: "alex_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    content: "Can attest! Went out too hot at kilometer 10 during my first marathon and suffered through miles 20-26. Negative splits require strict discipline early on, but pay off massively.",
    votes: 21,
    createdAt: "2 days ago",
    timestamp: Date.now() - 175000000,
    replies: []
  },
  {
    id: "c-15",
    postId: "post-14",
    parentId: null,
    author: {
      id: "maya_lin",
      name: "Maya Lin",
      username: "maya_lin",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80"
    },
    content: "I started taking a 15-minute screen-free walk after every 90-minute Pomodoro session. Not only did my eye strain vanish, but I also solved tricky bugs while walking away from the keyboard.",
    votes: 34,
    createdAt: "2 days ago",
    timestamp: Date.now() - 180000000,
    replies: []
  },
  {
    id: "c-16",
    postId: "post-15",
    parentId: null,
    author: {
      id: "zara_almansoori",
      name: "Zara Al-Mansoori",
      username: "zara_almansoori",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
    },
    content: "The soft database query analogy is brilliant! I am definitely incorporating this diagram into my upcoming university AI workshop.",
    votes: 23,
    createdAt: "3 days ago",
    timestamp: Date.now() - 259200000,
    replies: []
  },
  {
    id: "c-17",
    postId: "post-16",
    parentId: null,
    author: {
      id: "priya_patel",
      name: "Priya Patel",
      username: "priya_patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    content: "Container queries are truly the holy grail of component-driven architecture. Building a card component that automatically reformats itself whether rendered in a 3-column feed or a narrow right sidebar is so elegant.",
    votes: 41,
    createdAt: "3 days ago",
    timestamp: Date.now() - 265000000,
    replies: []
  },
  {
    id: "c-18",
    postId: "post-17",
    parentId: null,
    author: {
      id: "jason_bourne_dev",
      name: "Jason Bourne",
      username: "jason_bourne_dev",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
    },
    content: "Finally we can drop all those custom helper functions like `isNonNullable`! Such a welcome quality of life improvement.",
    votes: 17,
    createdAt: "4 days ago",
    timestamp: Date.now() - 345600000,
    replies: []
  },
  {
    id: "c-19",
    postId: "post-18",
    parentId: null,
    author: {
      id: "alex_chen",
      name: "Alex Chen",
      username: "alex_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    content: "React Router's useFetcher for optimistic non-navigation mutations (like toggling a like button or saving a draft) is so slick.",
    votes: 25,
    createdAt: "4 days ago",
    timestamp: Date.now() - 350000000,
    replies: []
  },
  {
    id: "c-20",
    postId: "post-20",
    parentId: null,
    author: {
      id: "carlos_gomez",
      name: "Carlos Gomez",
      username: "carlos_gomez",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
    },
    content: "The first time you spot the Erdtree glowing in the distance and slowly realize that every single cliff and fortress you can see is accessible by horseback is pure gaming magic.",
    votes: 56,
    createdAt: "5 days ago",
    timestamp: Date.now() - 432000000,
    replies: []
  }
];
