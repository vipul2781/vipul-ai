# RoomMate - Modern Room & Housemate Finder

A responsive, startup-grade **Room and Housemate Finder** web platform built with **React.js, React Router, and Bootstrap 5**.

---

## 🌟 Key Features

1. **Home Page (`/`)**:
   - Modern hero section with animated gradient backdrop and instant search bar (Location, Move-in Date, Budget).
   - **Popular Locations**: Cards for Ahmedabad, Mumbai, Bangalore, Delhi NCR, Pune, and Hyderabad with high-res photos and direct exploration links.
   - **Featured Rooms**: 6 curated room cards with pricing in INR, availability, bed/bath counts, and interactive heart bookmarking.
   - **How It Works**: 3-step guide (Search, Connect, Move In).
   - **Why Choose RoomMate?**: 4 feature pillars (Verified Listings, Easy Search, Compatible Housemates, Safe & Simple).
   - CTA banner for instant engagement.

2. **Find Rooms Page (`/rooms`)**:
   - Responsive multi-facet sidebar filters: City, Maximum Rent Slider (₹5,000 to ₹50,000), Room Type (Private, Shared, Studio), Property Type (Apartment, House, PG, Flat), Furnishing, Gender Preference, and Bedrooms.
   - Live search input matching titles, locations, and landmarks.
   - Sorting options: *Recommended*, *Price: Low to High*, *Price: High to Low*, and *Newest Available*.
   - Grid of 14 realistic Indian room listings with badges and detail links.

3. **Room Details Page (`/rooms/:id`)**:
   - Interactive photo gallery with main large view and thumbnail switching.
   - Comprehensive property specs: Rent, security deposit, availability, furnishing, bedrooms, bathrooms.
   - Amenities cards with Bootstrap icons: Wi-Fi, AC, Parking, Washing Machine, Kitchen, Balcony, Security, TV.
   - House rules and current flatmate bios with avatars.
   - Interactive modal actions: **Contact Owner**, **Send Message**, and **Save Listing**.

4. **Housemates Page (`/housemates`)**:
   - Discovery portal for prospective flatmates with lifestyle tag filters: *Non-Smoker*, *Pet Friendly*, *Early Riser*, *Night Owl*, *Vegetarian*, *Clean & Organized*, *Social*, and *Quiet*.
   - Filter by City, Gender, Age Range (18-23, 24-27, 28+), and Budget ceiling.
   - Profile cards highlighting AI compatibility match percentages (e.g. 92% Match), monthly budgets, move-in timelines, and bios.

5. **Housemate Profile Page (`/housemates/:id`)**:
   - Detailed profile view with large avatar, verified badge, bio, hobbies, and room requirements.
   - **Compatibility Index Breakdown** with animated progress bars:
     - Budget alignment
     - Location preferences
     - Lifestyle & habits
     - Move-in timeline
   - One-click triggers for **Connect**, **Send Message**, and **Save Profile**.

6. **Post a Room Page (`/post-room`)**:
   - Complete multi-section room posting form: Property info, room info, amenities checkboxes, tenant preferences, image upload with demo selectors, and description.
   - Live listing preview toggle.
   - Submitting updates application state, persists custom listings to `localStorage`, and triggers toast and success alerts.

7. **Favorites Page (`/favorites`)**:
   - Unified tabbed view for **Saved Rooms** and **Saved Housemates**.
   - Persistent storage via `localStorage`.
   - Remove actions and empty states with quick explore call-to-actions.

8. **About Page (`/about`)**:
   - Mission statement, core advantages, interactive statistics counters (10,000+ Rooms, 5,000+ Housemates, 20+ Cities, 95% Happy Users), and 3-step platform walkthrough.

---

## 🛠️ Technology Stack

- **React 18**
- **React Router 6** (`react-router-dom`)
- **Bootstrap 5.3 & Bootstrap Icons 1.11**
- **Vite 5** (Ultra-fast build and development)
- **Google Fonts** (`Outfit` and `Plus Jakarta Sans`)
- **Pure Frontend State**: Context API + `localStorage` persistence

---

## 🚀 Running the Project

To start the development server:

```bash
npm start
```
or
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create an optimized production build:

```bash
npm run build
```
