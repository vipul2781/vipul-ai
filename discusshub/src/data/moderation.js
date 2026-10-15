export const initialReportedPosts = [
  {
    id: "rep-p1",
    postId: "post-1",
    postTitle: "Crypto Moonshot 1000x bot pump signal Telegram link",
    postContent: "Join this exclusive VIP telegram signal group for guaranteed 1000% crypto returns overnight. Click here...",
    author: "spammer_99",
    community: "Web Development",
    communityId: "webdev",
    reason: "Spam / Unauthorized Commercial Promotion",
    reportsCount: 14,
    date: "10 mins ago",
    status: "Pending",
    severity: "High"
  },
  {
    id: "rep-p2",
    postId: "post-2",
    postTitle: "Why all developers from [Region] write horrible code",
    postContent: "Generalizing and attacking developers based on geographical background rather than technical merits...",
    author: "toxic_user_404",
    community: "React Developers",
    communityId: "reactdevs",
    reason: "Harassment & Hate Speech",
    reportsCount: 9,
    date: "45 mins ago",
    status: "Pending",
    severity: "Critical"
  },
  {
    id: "rep-p3",
    postId: "post-3",
    postTitle: "Cheap prescription drugs without doctor prescription online",
    postContent: "Buy discounted medications with international overnight shipping without prescription...",
    author: "pharma_bot_12",
    community: "Lifelong Education",
    communityId: "education",
    reason: "Illegal or Prohibited Goods",
    reportsCount: 22,
    date: "2 hours ago",
    status: "Pending",
    severity: "Critical"
  },
  {
    id: "rep-p4",
    postId: "post-4",
    postTitle: "Leaked credentials from corporate staging database dump",
    postContent: "Here are API secrets and AWS credentials supposedly dumped from yesterday's incident...",
    author: "dark_leaks",
    community: "Technology & AI",
    communityId: "technology",
    reason: "Doxxing / Personal Identifiable Information",
    reportsCount: 18,
    date: "3 hours ago",
    status: "Pending",
    severity: "Critical"
  },
  {
    id: "rep-p5",
    postId: "post-5",
    postTitle: "How do you structure a large React application?",
    postContent: "Flagged erroneously by user as off-topic despite being on topic.",
    author: "rahul_sharma",
    community: "React Developers",
    communityId: "reactdevs",
    reason: "Off-Topic Discussion",
    reportsCount: 1,
    date: "1 day ago",
    status: "Resolved",
    severity: "Low"
  }
];

export const initialReportedComments = [
  {
    id: "rep-c1",
    commentId: "c-101",
    commentContent: "You are utterly incompetent, stop programming and leave this industry immediately.",
    author: "angry_coder",
    postTitle: "Beginner's guide to React Router v6.4+",
    reason: "Personal Insults / Uncivil Behavior",
    reportsCount: 6,
    date: "25 mins ago",
    status: "Pending"
  },
  {
    id: "rep-c2",
    commentId: "c-102",
    commentContent: "Check out this free hack tool to scrape private LinkedIn profiles: bit.ly/malicious-link",
    author: "bot_spammer_3",
    postTitle: "Understanding Transformer Attention",
    reason: "Malware / Phishing Link",
    reportsCount: 11,
    date: "1 hour ago",
    status: "Pending"
  },
  {
    id: "rep-c3",
    commentId: "c-103",
    commentContent: "Repeated copy-pasting of the exact same message across 15 different comment threads.",
    author: "promo_king",
    postTitle: "The hidden beauty of JavaScript Temporal API",
    reason: "Duplicate Spamming",
    reportsCount: 8,
    date: "3 hours ago",
    status: "Pending"
  },
  {
    id: "rep-c4",
    commentId: "c-104",
    commentContent: "Minor disagreement over tab vs spaces indentation.",
    author: "code_purist",
    postTitle: "Docker Compose setup for full-stack developers",
    reason: "Flame baiting",
    reportsCount: 2,
    date: "2 days ago",
    status: "Resolved"
  }
];

export const initialBannedUsers = [
  { id: "ban-1", username: "spammer_99", reason: "Automated spam bot", bannedAt: "2 days ago", bannedBy: "Alex Chen" },
  { id: "ban-2", username: "toxic_user_404", reason: "Severe harassment violation", bannedAt: "1 day ago", bannedBy: "Priya Patel" },
  { id: "ban-3", username: "pharma_bot_12", reason: "Illegal pharmaceuticals sales link", bannedAt: "3 days ago", bannedBy: "Rahul Sharma" },
  { id: "ban-4", username: "credential_thief", reason: "Doxxing and malicious credential dumping", bannedAt: "5 days ago", bannedBy: "Jason Bourne" }
];

export const initialModLog = [
  { id: "log-1", action: "Post Removed", target: "Crypto Moonshot 1000x", moderator: "Priya Patel", time: "10 mins ago" },
  { id: "log-2", action: "User Warned", target: "angry_coder", moderator: "Rahul Sharma", time: "30 mins ago" },
  { id: "log-3", action: "User Banned", target: "toxic_user_404", moderator: "Alex Chen", time: "1 hour ago" },
  { id: "log-4", action: "Report Dismissed", target: "How do you structure a large React application?", moderator: "Maya Lin", time: "5 hours ago" }
];
