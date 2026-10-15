export const roomsData = [
  {
    id: 'room-1',
    title: 'Luxury Master Bedroom with Attached Balcony in High-Rise',
    city: 'Ahmedabad',
    location: 'Bodakdev, SG Highway',
    rent: 14500,
    securityDeposit: 29000,
    bedrooms: 3,
    bathrooms: 3,
    roomType: 'Private Room',
    propertyType: 'Apartment',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-01',
    featured: true,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Spacious and sun-drenched private master bedroom in a modern 3BHK high-rise gated society. Features king-sized bed with orthopaedic mattress, modular wardrobe, study desk, AC, and a scenic private balcony overlooking green gardens. The apartment has high-speed Wi-Fi, fully equipped modular kitchen, and power backup.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Washing Machine', 'Kitchen', 'Balcony', 'Security', 'TV'],
    houseRules: [
      'No smoking inside the premises',
      'Pets not allowed due to society regulations',
      'Guests and friends allowed with prior notice',
      'Quiet hours after 10:30 PM'
    ],
    currentHousemates: [
      {
        id: 'hm-c1',
        name: 'Kavya Sharma',
        age: 25,
        occupation: 'UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        description: 'Friendly and creative, loves coffee and weekend baking.'
      },
      {
        id: 'hm-c2',
        name: 'Rohan Mehta',
        age: 27,
        occupation: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        description: 'Quiet, avid reader, keeps shared spaces super neat.'
      }
    ]
  },
  {
    id: 'room-2',
    title: 'Chic Studio Apartment Near Metro Station',
    city: 'Mumbai',
    location: 'Bandra West, Mumbai',
    rent: 28000,
    securityDeposit: 56000,
    bedrooms: 1,
    bathrooms: 1,
    roomType: 'Studio',
    propertyType: 'Flat',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-05',
    featured: true,
    rating: 4.8,
    reviewsCount: 24,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designer studio apartment situated in the vibrant heart of Bandra. Walking distance to cafes, seaside promenade, and railway station. Fully furnished with custom interiors, smart TV, split AC, modern kitchenette with microwave, and sleek bathroom.',
    amenities: ['Wi-Fi', 'AC', 'Kitchen', 'Security', 'TV', 'Washing Machine'],
    houseRules: [
      'Visitors allowed till 11 PM',
      'Keep music down during nighttime',
      'No smoking inside',
      'Pet friendly upon small deposit'
    ],
    currentHousemates: []
  },
  {
    id: 'room-3',
    title: 'Spacious Shared Room for Tech Professionals',
    city: 'Bangalore',
    location: 'Koramangala 4th Block',
    rent: 9500,
    securityDeposit: 19000,
    bedrooms: 3,
    bathrooms: 3,
    roomType: 'Shared Room',
    propertyType: 'Apartment',
    furnished: 'Furnished',
    genderPreference: 'Male Only',
    availableDate: '2026-09-30',
    featured: true,
    rating: 4.7,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'One bed available in a large double-sharing room in an elite society in Koramangala. 5 mins walk to top cafes, co-working spaces, and bus stops. Rent includes 300 Mbps broadband, weekly housekeeping, and society maintenance.',
    amenities: ['Wi-Fi', 'Parking', 'Washing Machine', 'Kitchen', 'Security', 'Balcony'],
    houseRules: [
      'Working professionals preferred',
      'Clean up kitchen after cooking',
      'No loud parties on weekdays',
      'Alcohol permissible in moderation'
    ],
    currentHousemates: [
      {
        id: 'hm-c3',
        name: 'Arjun Verma',
        age: 24,
        occupation: 'Backend Engineer at FinTech',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        description: 'Tech enthusiast, gym regular, chill roommate.'
      }
    ]
  },
  {
    id: 'room-4',
    title: 'Peaceful Private Room with Garden View in Villa',
    city: 'Pune',
    location: 'Koregaon Park, Lane 7',
    rent: 13000,
    securityDeposit: 26000,
    bedrooms: 4,
    bathrooms: 4,
    roomType: 'Private Room',
    propertyType: 'House',
    furnished: 'Semi Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-10',
    featured: true,
    rating: 4.9,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Serene independent room inside an exquisite standalone bungalow in Koregaon Park. Surrounded by tall lush trees, quiet roads, and boutique cafes. Wooden flooring, large wardrobe, private attached bathroom, and lawn access.',
    amenities: ['Wi-Fi', 'Parking', 'Kitchen', 'Balcony', 'Security', 'Washing Machine'],
    houseRules: [
      'Pet friendly environment',
      'Vegetarian/Eggetarian kitchen',
      'Smoking outdoors only',
      'Peaceful ambience maintained'
    ],
    currentHousemates: [
      {
        id: 'hm-c4',
        name: 'Pooja Iyer',
        age: 26,
        occupation: 'Brand Strategist',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        description: 'Plant mom, loves jazz, works hybrid schedule.'
      }
    ]
  },
  {
    id: 'room-5',
    title: 'Modern Room in Premium Gated Community',
    city: 'Hyderabad',
    location: 'Gachibowli, Financial District',
    rent: 16000,
    securityDeposit: 32000,
    bedrooms: 3,
    bathrooms: 3,
    roomType: 'Private Room',
    propertyType: 'Apartment',
    furnished: 'Furnished',
    genderPreference: 'Female Only',
    availableDate: '2026-10-01',
    featured: true,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Looking for a female flatmate for a master bedroom with attached washroom in My Home Bhooja community. Access to clubhouse, swimming pool, gym, badminton court, and 24/7 security. Fully setup kitchen with dishwasher and water purifier.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Washing Machine', 'Kitchen', 'Balcony', 'Security', 'TV'],
    houseRules: [
      'Female flatmate only',
      'No smoking inside',
      'Maintain common area hygiene',
      'Guests allowed with prior heads-up'
    ],
    currentHousemates: [
      {
        id: 'hm-c5',
        name: 'Sneha Reddy',
        age: 26,
        occupation: 'Product Manager at Microsoft',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        description: 'Organized, loves weekend running and cooking pasta.'
      }
    ]
  },
  {
    id: 'room-6',
    title: 'Cozy Sunny Room Near Metro & Hauz Khas Village',
    city: 'Delhi',
    location: 'Hauz Khas Enclave, South Delhi',
    rent: 18500,
    securityDeposit: 37000,
    bedrooms: 2,
    bathrooms: 2,
    roomType: 'Private Room',
    propertyType: 'Flat',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-15',
    featured: true,
    rating: 4.9,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Beautiful 2nd-floor bedroom with private balcony in a safe green gated colony. 300 meters from Yellow line metro. Equipped with inverter AC, study desk, ergonomic chair, and ample sunlight throughout the day.',
    amenities: ['Wi-Fi', 'AC', 'Kitchen', 'Balcony', 'Security', 'Washing Machine'],
    houseRules: [
      'Quiet hours after 11 PM',
      'Clean common spaces',
      'Non-smoking inside room',
      'Visitors allowed'
    ],
    currentHousemates: [
      {
        id: 'hm-c6',
        name: 'Aman Saxena',
        age: 28,
        occupation: 'Corporate Lawyer',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        description: 'Friendly, busy on weekdays, loves movie nights.'
      }
    ]
  },
  {
    id: 'room-7',
    title: 'Budget-Friendly Room for Students in Navrangpura',
    city: 'Ahmedabad',
    location: 'Navrangpura, Near Gujarat University',
    rent: 7500,
    securityDeposit: 15000,
    bedrooms: 2,
    bathrooms: 2,
    roomType: 'Shared Room',
    propertyType: 'PG',
    furnished: 'Semi Furnished',
    genderPreference: 'Male Only',
    availableDate: '2026-10-01',
    featured: false,
    rating: 4.5,
    reviewsCount: 12,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Affordable sharing room in a clean, student-friendly PG close to CEPT and Gujarat University. Includes individual study tables, beds with storage, high-speed WiFi, RO drinking water, and daily cleaning service.',
    amenities: ['Wi-Fi', 'Parking', 'Security', 'Washing Machine'],
    houseRules: [
      'Curfew 11:30 PM',
      'Maintain study atmosphere in evenings',
      'No smoking or alcohol on premises',
      'Visitors in common room only'
    ],
    currentHousemates: [
      {
        id: 'hm-c7',
        name: 'Vikas Patel',
        age: 21,
        occupation: 'Architecture Student',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
        description: 'Hardworking, quiet, friendly classmate.'
      }
    ]
  },
  {
    id: 'room-8',
    title: 'Premium Sea-Facing Flat Bedroom in Worli',
    city: 'Mumbai',
    location: 'Worli Sea Face, Mumbai',
    rent: 36000,
    securityDeposit: 75000,
    bedrooms: 3,
    bathrooms: 3,
    roomType: 'Private Room',
    propertyType: 'Apartment',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-20',
    featured: false,
    rating: 5.0,
    reviewsCount: 14,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Breathtaking Arabian sea views from your bedroom window! Located in a coveted sea-front society in Worli. Full home automation, Italian marble flooring, luxury en-suite bathroom with bathtub, and modular kitchen.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Washing Machine', 'Kitchen', 'Balcony', 'Security', 'TV'],
    houseRules: [
      'Strictly non-smoking inside',
      'Well-mannered professionals only',
      'Respect roommate privacy'
    ],
    currentHousemates: [
      {
        id: 'hm-c8',
        name: 'Aditi Rao',
        age: 29,
        occupation: 'Investment Banker',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        description: 'Frequently travels, quiet and respectful.'
      }
    ]
  },
  {
    id: 'room-9',
    title: 'Minimalist 1RK Studio near Manyata Tech Park',
    city: 'Bangalore',
    location: 'Nagawara, Bangalore',
    rent: 12000,
    securityDeposit: 24000,
    bedrooms: 1,
    bathrooms: 1,
    roomType: 'Studio',
    propertyType: 'Flat',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-01',
    featured: false,
    rating: 4.6,
    reviewsCount: 17,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perfect private compact studio for individuals working in Manyata Tech Park. Modern Scandinavian furniture, fast fiber net, induction stove, mini-fridge, and covered two-wheeler parking included.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Kitchen', 'Security'],
    houseRules: [
      'Single occupancy only',
      'No loud musical instruments late night',
      'Prompt rent payment by 5th'
    ],
    currentHousemates: []
  },
  {
    id: 'room-10',
    title: 'Warm & Airy Room in IT Corridor Gated Society',
    city: 'Pune',
    location: 'Hinjewadi Phase 1, Pune',
    rent: 11000,
    securityDeposit: 22000,
    bedrooms: 3,
    bathrooms: 2,
    roomType: 'Private Room',
    propertyType: 'Apartment',
    furnished: 'Semi Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-12',
    featured: false,
    rating: 4.7,
    reviewsCount: 11,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sunlit bedroom in a 3BHK flat at Megapolis Hinjewadi. Walking distance from major IT campuses (TCS, Infosys, Wipro). Fully set up kitchen with refrigerator, washing machine, and 24hr water and electricity backup.',
    amenities: ['Wi-Fi', 'Parking', 'Washing Machine', 'Kitchen', 'Security', 'Balcony'],
    houseRules: [
      'Split utility bills equally',
      'Keep kitchen clean after cooking',
      'Smoking on balcony only'
    ],
    currentHousemates: [
      {
        id: 'hm-c9',
        name: 'Saurabh Kulkarni',
        age: 26,
        occupation: 'Cloud Consultant',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
        description: 'Gamer, fitness buff, cheerful roommate.'
      }
    ]
  },
  {
    id: 'room-11',
    title: 'Spacious Independent Floor Room in DLF Phase 2',
    city: 'Delhi',
    location: 'DLF Phase 2, Cyber City, Gurgaon',
    rent: 21000,
    securityDeposit: 42000,
    bedrooms: 4,
    bathrooms: 4,
    roomType: 'Private Room',
    propertyType: 'House',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-05',
    featured: false,
    rating: 4.8,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Upscale private room on builder floor right opposite Cyber Hub. Hardwood closets, premium spring mattress, smart LED TV, attached bathroom with glass cubicle shower, and dedicated car parking.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Washing Machine', 'Kitchen', 'Balcony', 'Security', 'TV'],
    houseRules: [
      'Working professionals only',
      'Visitors allowed with responsibility',
      'Smoking strictly restricted to terrace'
    ],
    currentHousemates: [
      {
        id: 'hm-c10',
        name: 'Tarun Chawla',
        age: 28,
        occupation: 'Senior Consultant',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
        description: 'Fintech marketer, loves badminton on weekends.'
      }
    ]
  },
  {
    id: 'room-12',
    title: 'Cozy Master Room with City Skyline Views',
    city: 'Hyderabad',
    location: 'Madhapur, Near Durgam Cheruvu',
    rent: 15000,
    securityDeposit: 30000,
    bedrooms: 3,
    bathrooms: 3,
    roomType: 'Private Room',
    propertyType: 'Apartment',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-01',
    featured: false,
    rating: 4.9,
    reviewsCount: 20,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Large corner bedroom on 14th floor overlooking Durgam Cheruvu cable bridge and lake. Gated community with 24-hr security, badminton, gym, and swimming pool. Rent includes superfast Wi-Fi and cook service sharing.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Washing Machine', 'Kitchen', 'Balcony', 'Security', 'TV'],
    houseRules: [
      'Equal sharing of cook and grocery expenses',
      'No loud noise past 11 PM',
      'Clean up kitchen post cooking'
    ],
    currentHousemates: [
      {
        id: 'hm-c11',
        name: 'Karthik Varma',
        age: 27,
        occupation: 'DevOps Specialist',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        description: 'Enjoys video games, weekend cycling, and cooking.'
      }
    ]
  },
  {
    id: 'room-13',
    title: 'Affordable Unfurnished 2BHK Flat Share',
    city: 'Ahmedabad',
    location: 'Satellite, Jodhpur Gam Road',
    rent: 8500,
    securityDeposit: 17000,
    bedrooms: 2,
    bathrooms: 2,
    roomType: 'Private Room',
    propertyType: 'Flat',
    furnished: 'Unfurnished',
    genderPreference: 'Any',
    availableDate: '2026-10-10',
    featured: false,
    rating: 4.4,
    reviewsCount: 9,
    images: [
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clean unfurnished bedroom in a safe family-oriented society. Bring your own mattress or furniture. Kitchen is shared and has gas connection. Water and municipal electricity 24 hours.',
    amenities: ['Parking', 'Kitchen', 'Balcony', 'Security'],
    houseRules: [
      'Quiet environment',
      'Non-smokers preferred',
      'Electricity bill shared 50-50'
    ],
    currentHousemates: [
      {
        id: 'hm-c12',
        name: 'Deepak Joshi',
        age: 25,
        occupation: 'Chartered Accountant',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        description: 'Studious, polite, vegetarian.'
      }
    ]
  },
  {
    id: 'room-14',
    title: 'Deluxe Suite with Private Terrace in Powai',
    city: 'Mumbai',
    location: 'Hiranandani Gardens, Powai',
    rent: 32000,
    securityDeposit: 64000,
    bedrooms: 3,
    bathrooms: 3,
    roomType: 'Private Room',
    propertyType: 'Apartment',
    furnished: 'Furnished',
    genderPreference: 'Any',
    availableDate: '2026-10-01',
    featured: true,
    rating: 4.9,
    reviewsCount: 28,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'European architecture flat in prestigious Hiranandani Powai. Close to IIT Bombay and prime corporate hubs. Includes clubhouse access, Olympic swimming pool, gym, high speed elevator, and dedicated covered parking.',
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Washing Machine', 'Kitchen', 'Balcony', 'Security', 'TV'],
    houseRules: [
      'No smoking in bedrooms',
      'Guests allowed on weekends',
      'Keep common spaces tidy'
    ],
    currentHousemates: [
      {
        id: 'hm-c13',
        name: 'Simran Walia',
        age: 26,
        occupation: 'Brand Lead',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        description: 'Loves yoga, music, and healthy meals.'
      }
    ]
  }
];
