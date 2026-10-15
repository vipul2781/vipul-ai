# DiscussHub - Modern Discussion Forum & Community Platform

> **"Ask. Discuss. Share. Learn."**

DiscussHub is a modern, responsive, high-performance community forum and knowledge-sharing platform built with **React.js, Bootstrap 5, Bootstrap Icons, and React Router DOM**.

---

## 🚀 Key Features

- **🌐 12 Dedicated Pages**:
  - `/` — Homepage with Hero search, Popular Communities, Trending Discussions, Tabs, 4-step workflow, and Statistics.
  - `/communities` — Category-filtered discovery grid featuring 12+ vibrant hubs with live Join/Leave actions.
  - `/communities/:id` — Rich community header, banner covers, post feeds, pagination, guidelines, and moderators.
  - `/posts/:id` — Full discussion view with vertical voting, media previews, code blocks with copy action, interactive polls, and threaded comments.
  - `/create-post` — Multi-type post creation (Discussion, Question, Poll, Announcement, Showcase), tags pill management, image attachments, and modal preview.
  - `/create-community` — Community builder with icon/banner uploads, category classification, privacy, and customizable rule lists.
  - `/search` — Universal global search with tabs for All, Discussions, Communities, and Members.
  - `/saved` — Bookmarked discussions and comments persisted in `localStorage`.
  - `/notifications` — Activity center with unread filters, type icons, and "Mark All as Read" actions.
  - `/profile/:id` — Member profiles with follower counts, reputation badges, recent posts, and direct message triggers.
  - `/moderation` — Moderator desk with incident queues, report review modals, warning, removal, and ban tools.
  - `/about` — Platform vision, core mission, 4-step workflow, and community milestones.

- **⚡ Interactive Frontend State & Persistence**:
  - **Voting Engine**: Mutual exclusion (upvote/downvote), vote counters, and visual highlighting.
  - **Threaded Hierarchical Comments**: Unlimited nesting depths, reply drawers, collapse/expand toggles, and deletion.
  - **Community Subscriptions**: Dynamic member counter increments/decrements with toast notifications.
  - **LocalStorage**: Bookmarked posts and comments stay saved across browser refreshes.

---

## 🛠️ Tech Stack

- **React.js 19**
- **Bootstrap 5.3 & Bootstrap Icons**
- **React Router DOM v7**
- **Plus Jakarta Sans & JetBrains Mono Fonts**

---

## 💻 Running the Application

1. Open a terminal in the project directory:
   ```bash
   cd d:\vipul-ai\discusshub
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:3003
   ```
