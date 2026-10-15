// =====================================================
// SHADOW CASE: Detective Academy - Cases Data
// =====================================================

export const CASES = [
  {
    id: 1,
    title: "The Midnight Mansion",
    slug: "midnight-mansion",
    coverImage: "https://images.unsplash.com/photo-1555443805-658637491dd4?w=600&q=80",
    description: "A mysterious disappearance in an abandoned mansion on the outskirts of town. The owner was last seen at midnight. No body found. No witnesses.",
    fullStory: `On the night of October 3rd, the eccentric millionaire Reginald Blackwood vanished from his ancestral mansion, leaving behind only a shattered wine glass and a cryptic note. The mansion's staff had been dismissed weeks earlier, and the only visitors that night were family members gathered for the reading of his will. Someone wanted Reginald silenced — permanently.`,
    location: "Blackwood Manor, Ravensmoor",
    date: "October 3rd, 2024",
    incident: "Disappearance of Reginald Blackwood",
    difficulty: "Medium",
    estimatedTime: "45 min",
    clueCount: 8,
    reward: 500,
    status: "available",
    category: "Disappearance",
    objectives: [
      "Discover what happened to Reginald Blackwood",
      "Identify who was present at the mansion",
      "Find the hidden will and understand the motive",
      "Determine the culprit and their method"
    ],
    suspects: [
      {
        id: "s1",
        name: "Victoria Blackwood",
        avatar: "👩‍💼",
        occupation: "Niece & Heir",
        motive: "Stands to inherit the entire estate",
        alibi: "Claims she was in the library all evening reading",
        relationship: "Niece",
        isGuilty: false,
        statements: {
          whereWereYou: "I was in the library from 9 PM onward. You can check — I left a bookmark in the Agatha Christie novel on the third shelf.",
          didYouHearAnything: "I heard some footsteps around 11 PM but assumed it was Uncle Reginald going to his study.",
          relationshipWithVictim: "We had our differences about money, but I genuinely cared for him.",
          lastTimeYouSawVictim: "Dinner at 7 PM. He seemed agitated but wouldn't say why.",
          evidenceChallenge: "Fine. The wine glass proves nothing — he was always clumsy."
        }
      },
      {
        id: "s2",
        name: "Dr. Edmund Harlow",
        avatar: "👨‍⚕️",
        occupation: "Family Physician",
        motive: "Blackwood threatened to expose his medical malpractice",
        alibi: "Says he left the mansion at 10:30 PM",
        relationship: "Family Doctor",
        isGuilty: true,
        statements: {
          whereWereYou: "I left the mansion at precisely 10:30. I have a patient log entry from my digital records.",
          didYouHearAnything: "Nothing unusual. Reginald was in good spirits when I left.",
          relationshipWithVictim: "Strictly professional. I've been his doctor for twelve years.",
          lastTimeYouSawVictim: "At 10:15 in his study. We discussed his... medications.",
          evidenceChallenge: "That letter is a forgery! I never wrote anything like that."
        }
      },
      {
        id: "s3",
        name: "Marcus Webb",
        avatar: "👨‍💼",
        occupation: "Estate Lawyer",
        motive: "Was embezzling from the estate for years",
        alibi: "Claims he was on a phone call with a client in London",
        relationship: "Lawyer",
        isGuilty: false,
        statements: {
          whereWereYou: "On the phone with Sir Gerald Pembrook in London. The call lasted from 10 PM to 11:30 PM.",
          didYouHearAnything: "I was in the east wing. I heard nothing over my phone conversation.",
          relationshipWithVictim: "A valued client. I've managed his affairs for over a decade.",
          lastTimeYouSawVictim: "Before dinner. We reviewed some paperwork — routine estate matters.",
          evidenceChallenge: "Yes, there are some discrepancies in the accounts but they're easily explained."
        }
      }
    ],
    clues: [
      {
        id: "c1",
        title: "Shattered Wine Glass",
        icon: "🍷",
        location: "Study Room",
        description: "A crystal wine glass, shattered near the fireplace. The wine is still slightly warm, suggesting it was dropped recently. The glass has fingerprints on the base.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "The warmth suggests the glass was dropped within the hour before discovery. Fingerprint analysis points to someone with medical gloves — partial prints consistent with latex."
      },
      {
        id: "c2",
        title: "Cryptic Note",
        icon: "📝",
        location: "Desk",
        description: "A folded note reading: 'The truth about Harlow must come out. Meet me at midnight.' Written in Reginald's handwriting.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "Reginald clearly planned to expose someone named Harlow. The midnight meeting was likely with Dr. Edmund Harlow himself."
      },
      {
        id: "c3",
        title: "Muddy Boot Prints",
        icon: "👟",
        location: "Garden Path",
        description: "Fresh boot prints leading from the garden gate to the cellar entrance and back. Size 11 — inconsistent with Reginald's size 9.",
        importance: "medium",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "Someone entered through the garden — not the main entrance — suggesting they wanted to avoid being seen. Dr. Harlow wears size 11 shoes."
      },
      {
        id: "c4",
        title: "Hidden Will",
        icon: "📜",
        location: "Secret Compartment",
        description: "A revised will hidden in a false panel behind the bookshelf. It cuts Dr. Harlow out of a promised bequest and includes a damning letter about medical malpractice.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s2", "s1"],
        analysis: "The new will provides clear motive. Harlow stood to lose both money and his medical license if this document was made public."
      },
      {
        id: "c5",
        title: "Torn Appointment Card",
        icon: "🗓️",
        location: "Fireplace Ash",
        description: "A partially burned appointment card reading '...HARLOW — MIDNIGHT — DO NOT...' found among the fireplace ashes.",
        importance: "medium",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "Someone tried to destroy this evidence. It confirms a midnight appointment with Harlow was planned."
      },
      {
        id: "c6",
        title: "Phone Records",
        icon: "📱",
        location: "Study Desk Drawer",
        description: "Reginald's phone records show he called Dr. Harlow's personal number at 11:45 PM — the last call he ever made.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "This directly contradicts Harlow's claim that he left at 10:30 PM. He was still in contact with Reginald nearly 90 minutes later."
      },
      {
        id: "c7",
        title: "Broken Latch",
        icon: "🔐",
        location: "Cellar Door",
        description: "The cellar door latch has been broken from the outside. Fresh tool marks suggest forced entry using a specialized implement.",
        importance: "medium",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "The precision of the break suggests someone with knowledge of the mansion's layout — or with specialized tools."
      },
      {
        id: "c8",
        title: "Medical Bag",
        icon: "💊",
        location: "Behind Garden Hedge",
        description: "A black medical bag hidden behind a hedge near the garden gate. Contains sedatives and a syringe. The bag has Dr. Harlow's monogram.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "The sedatives explain how Reginald could be incapacitated without a struggle. This is the smoking gun connecting Harlow to the crime."
      }
    ],
    solution: {
      culprit: "s2",
      motive: "To silence Reginald before he could expose medical malpractice and destroy the secret bequest",
      method: "Dr. Harlow sedated Reginald using stolen hospital sedatives, then removed him from the property via the garden gate",
      keyEvidence: ["c2", "c4", "c6", "c8"],
      explanation: "Dr. Edmund Harlow, fearing exposure of his years-long malpractice and the loss of a promised inheritance, arranged to meet Reginald at midnight. Using his medical expertise, he administered a sedative. The phone records prove he was still there at 11:45 PM, contradicting his alibi. His medical bag — found hidden in the garden — contained the exact sedatives used."
    },
    contradictions: [
      {
        suspectId: "s2",
        question: "lastTimeYouSawVictim",
        evidence: "c6",
        contradiction: "Harlow claims he left at 10:30 PM, but phone records show Reginald called his personal number at 11:45 PM!"
      }
    ]
  },

  {
    id: 2,
    title: "The Vanishing Diamond",
    slug: "vanishing-diamond",
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    description: "The priceless Star of Calcutta diamond disappears during a high-security private exhibition. The alarm never triggered. The vault door was never opened.",
    fullStory: `The Star of Calcutta — valued at 40 million dollars — vanished from the Harrington Gallery's state-of-the-art vault during a Friday evening exhibition. The security system showed no breach. The vault recorded no opening. Yet the diamond was gone by 9 PM. Forty guests attended. One of them is a thief.`,
    location: "Harrington Gallery, Mayfair",
    date: "November 15th, 2024",
    incident: "Theft of the Star of Calcutta diamond",
    difficulty: "Hard",
    estimatedTime: "60 min",
    clueCount: 8,
    reward: 750,
    status: "available",
    category: "Theft",
    objectives: [
      "Determine how the diamond was stolen without triggering alarms",
      "Identify the thief among the guests",
      "Discover where the diamond is hidden",
      "Uncover the inside accomplice"
    ],
    suspects: [
      {
        id: "s1",
        name: "Celeste Beaumont",
        avatar: "👩‍🎨",
        occupation: "Art Dealer",
        motive: "Secretly represents a private collector who desperately wants the diamond",
        alibi: "Was speaking with journalists near the entrance gallery",
        relationship: "Guest",
        isGuilty: true,
        statements: {
          whereWereYou: "I was near the front gallery talking to the press for most of the evening. Several photographers can confirm.",
          didYouHearAnything: "I heard nothing unusual. The evening was perfectly organized.",
          relationshipWithVictim: "I was simply here to appreciate the exhibition. I have no particular interest in the Star.",
          lastTimeYouSawVictim: "The diamond? It was there when I passed the vault room at 8:15.",
          evidenceChallenge: "An earring? I lose earrings constantly. That proves nothing about me."
        }
      },
      {
        id: "s2",
        name: "Thomas Griggs",
        avatar: "👨‍🔧",
        occupation: "Security Technician",
        motive: "Gambling debts — was paid to disable certain security features",
        alibi: "Claims he was monitoring systems in the control room all evening",
        relationship: "Staff",
        isGuilty: false,
        statements: {
          whereWereYou: "Control room. The security feeds will prove it.",
          didYouHearAnything: "I monitor twelve cameras. Everything looked normal.",
          relationshipWithVictim: "I protect the art, I don't steal it.",
          lastTimeYouSawVictim: "I could see the vault room on camera. The diamond was there at 8 PM.",
          evidenceChallenge: "Yes I have debts, but I didn't touch the security system."
        }
      },
      {
        id: "s3",
        name: "Prof. Alistair Stone",
        avatar: "👨‍🏫",
        occupation: "Gemologist",
        motive: "Professional jealousy — claims the diamond authentication is fraudulent",
        alibi: "In the gemstone study room examining other pieces",
        relationship: "Expert Consultant",
        isGuilty: false,
        statements: {
          whereWereYou: "In the study room with the opaque glass door. I was examining the sapphire collection.",
          didYouHearAnything: "Nothing. That room is quite soundproofed.",
          relationshipWithVictim: "The diamond? I believe it's a synthetic replica. My theft of it would be meaningless.",
          lastTimeYouSawVictim: "I actively avoided looking at the Star. It offends my professional sensibilities.",
          evidenceChallenge: "A diagram? Anyone could draw that. I'm an academic, not a thief."
        }
      }
    ],
    clues: [
      {
        id: "c1",
        title: "Diamond Earring Fragment",
        icon: "💎",
        location: "Vault Room Floor",
        description: "A tiny fragment of a diamond earring found on the vault room floor. It matches the style worn by one of the female guests.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s1"],
        analysis: "The earring fragment places the wearer in the vault room — a restricted area."
      },
      {
        id: "c2",
        title: "Tampered Camera Feed",
        icon: "📹",
        location: "Security Control Room",
        description: "A 4-minute loop discovered in the vault room camera footage between 8:42 and 8:46 PM. Triggered remotely from inside the gallery.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s2"],
        analysis: "The camera loop was triggered from inside — the thief had an accomplice with technical access."
      },
      {
        id: "c3",
        title: "Blueprint Sketch",
        icon: "📐",
        location: "Waste Bin — Study Room",
        description: "A hand-drawn sketch of the vault room's ventilation system with measurements and timing notes.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s1", "s3"],
        analysis: "Someone planned this theft meticulously. The sketch shows an alternative entry route through ventilation."
      },
      {
        id: "c4",
        title: "Celeste's Clutch Bag",
        icon: "👜",
        location: "Coat Check",
        description: "Celeste's evening bag contains a velvet pouch of the exact dimensions to hold the Star of Calcutta. Diamond dust traces found inside.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s1"],
        analysis: "The velvet pouch has diamond dust traces. The diamond was transported in this bag."
      },
      {
        id: "c5",
        title: "Guest Access Log",
        icon: "📋",
        location: "Reception Desk",
        description: "The digital access log shows Celeste Beaumont's badge scanned in the vault corridor at 8:40 PM — during the camera loop.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s1"],
        analysis: "This directly contradicts her alibi. She was in the vault corridor during the critical window."
      },
      {
        id: "c6",
        title: "Wire Transfer Record",
        icon: "💳",
        location: "Security Office Printer",
        description: "A printed bank confirmation showing a €500,000 wire transfer to Thomas Griggs from an offshore account linked to Celeste's firm.",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s1", "s2"],
        analysis: "This proves the conspiracy between Celeste and Griggs."
      },
      {
        id: "c7",
        title: "Ventilation Panel Screws",
        icon: "🔩",
        location: "Vault Room Ceiling",
        description: "Four ventilation panel screws found loose. The panel shows fresh scratches consistent with recent use as an access point.",
        importance: "medium",
        discovered: false,
        relatedSuspects: ["s1"],
        analysis: "The thief entered and exited through the ventilation system."
      },
      {
        id: "c8",
        title: "Collector's Contact Card",
        icon: "📇",
        location: "Celeste's Dropped Scarf",
        description: "A business card from 'Anonymous Acquisitions Ltd.' with note: 'Star — confirmed — €40M. Deliver post-event.'",
        importance: "high",
        discovered: false,
        relatedSuspects: ["s1"],
        analysis: "Celeste had a buyer arranged before the theft. This was premeditated."
      }
    ],
    solution: {
      culprit: "s1",
      motive: "Commissioned by an anonymous private collector for €40 million",
      method: "Celeste accessed the vault room via ventilation shaft during the 4-minute camera loop arranged by her accomplice Griggs",
      keyEvidence: ["c4", "c5", "c6", "c8"],
      explanation: "Celeste Beaumont orchestrated the entire theft. She paid Thomas Griggs to create a 4-minute camera loop, entered the vault room through the ventilation system, stole the diamond, and transported it in a specially prepared velvet pouch."
    },
    contradictions: [
      {
        suspectId: "s1",
        question: "whereWereYou",
        evidence: "c5",
        contradiction: "Celeste claims she was with journalists all evening, but the access log shows her badge in the vault corridor at 8:40 PM — exactly during the camera loop!"
      }
    ]
  },

  {
    id: 3,
    title: "Murder on Platform 9",
    slug: "murder-platform-9",
    coverImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
    description: "A prominent journalist is found dead on Platform 9 of Kingsley Station. The platform was supposedly empty. The train cameras malfunctioned.",
    fullStory: `Investigative journalist Nadia Voss was found on Platform 9 of Kingsley Central Station at 11:05 PM on a Tuesday night. The platform had been closed for maintenance. She had been working on an exposé that reportedly named powerful individuals. Her laptop was missing. Her notes were shredded.`,
    location: "Kingsley Central Station, Platform 9",
    date: "September 17th, 2024",
    incident: "Murder of journalist Nadia Voss",
    difficulty: "Hard",
    estimatedTime: "55 min",
    clueCount: 8,
    reward: 700,
    status: "locked",
    category: "Murder",
    objectives: [
      "Determine how Nadia accessed the closed platform",
      "Identify who she was meeting that night",
      "Recover evidence of her final investigation",
      "Name the person responsible for her death"
    ],
    suspects: [
      {
        id: "s1",
        name: "Director Alan Frost",
        avatar: "👨‍💼",
        occupation: "Corporate Director",
        motive: "Subject of Nadia's exposé — faced prison if published",
        alibi: "Claims he was at a board dinner across town",
        relationship: "Investigation Target",
        isGuilty: true,
        statements: {
          whereWereYou: "I was at the Grand Hotel dining with my board. Twelve witnesses.",
          didYouHearAnything: "I don't even know this journalist. Why would I?",
          relationshipWithVictim: "Absolutely none. I've never met Ms. Voss.",
          lastTimeYouSawVictim: "I told you — I don't know her.",
          evidenceChallenge: "A burner phone? Anyone could have one of those."
        }
      },
      {
        id: "s2",
        name: "Officer Ray Patel",
        avatar: "👮",
        occupation: "Station Security Officer",
        motive: "Was bribed to provide platform access",
        alibi: "Claims he was patrolling the north platforms all evening",
        relationship: "Station Staff",
        isGuilty: false,
        statements: {
          whereWereYou: "North platforms, full patrol. My radio log confirms it.",
          didYouHearAnything: "Nothing from Platform 9. It was supposed to be empty.",
          relationshipWithVictim: "Never met her.",
          lastTimeYouSawVictim: "I didn't.",
          evidenceChallenge: "Yes I accepted a payment but it was just to let someone pick up a forgotten bag."
        }
      },
      {
        id: "s3",
        name: "Sandra Yee",
        avatar: "👩‍💻",
        occupation: "Tech Analyst — Frost Corp",
        motive: "Feared being implicated in the exposé as a data thief",
        alibi: "Working late at Frost Corp offices",
        relationship: "Colleague of Target",
        isGuilty: false,
        statements: {
          whereWereYou: "My office. Badge logs show I swiped out at midnight.",
          didYouHearAnything: "About the journalist? Not until the morning news.",
          relationshipWithVictim: "She called my office once. I hung up.",
          lastTimeYouSawVictim: "Never met in person.",
          evidenceChallenge: "Those emails were taken out of context completely."
        }
      }
    ],
    clues: [
      {
        id: "c1", title: "Shredded Notes", icon: "📄",
        location: "Platform Waste Bin",
        description: "Partially reconstructed shredded paper: '...Frost... accounts... 2019-2022... shell companies...'",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Nadia's investigation focused on Frost and financial fraud."
      },
      {
        id: "c2", title: "Burner Phone", icon: "📱",
        location: "Behind Platform Bench",
        description: "A disposable burner phone with one contact: 'Source.' Last message: 'I'm here. Where are you?' sent at 10:48 PM.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "The meeting was arranged through this untraceable phone."
      },
      {
        id: "c3", title: "CCTV Override Log", icon: "📹",
        location: "Station Control Room",
        description: "The camera malfunction was deliberate — override triggered using stolen supervisor credentials.",
        importance: "high", discovered: false, relatedSuspects: ["s1", "s2"],
        analysis: "This was premeditated. Someone with resources stole credentials and planned the camera shutdown."
      },
      {
        id: "c4", title: "Hotel Receipt", icon: "🧾",
        location: "Director Frost's Office (search)",
        description: "A receipt from the Grand Hotel showing Director Frost checked out at 9:30 PM — not midnight as his alibi suggests.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Frost's alibi is false. He left at 9:30, giving him time to reach Kingsley Station."
      },
      {
        id: "c5", title: "Encrypted USB Drive", icon: "💾",
        location: "Nadia's Hidden Pocket",
        description: "A USB drive sewn into the lining of Nadia's coat. Contains files labeled 'FROST_FINAL_DRAFT.docx'.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Nadia had backups her killer didn't know about."
      },
      {
        id: "c6", title: "Platform Access Record", icon: "🎫",
        location: "Station Manager's Office",
        description: "A maintenance key used to access Platform 9 at 10:35 PM was signed out by Officer Patel 'for engineering.'",
        importance: "medium", discovered: false, relatedSuspects: ["s2"],
        analysis: "Patel provided platform access under false pretenses."
      },
      {
        id: "c7", title: "Taxi GPS Record", icon: "🚕",
        location: "Taxi Company Database",
        description: "A taxi GPS log shows a trip from the Grand Hotel to within 200 meters of Kingsley Station at 10:55 PM, using Frost's registered account.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "This places Frost at Kingsley Station at exactly the right time."
      },
      {
        id: "c8", title: "Laptop Bag Strap", icon: "💻",
        location: "Station Lost Property",
        description: "A torn laptop bag strap with Nadia's initials 'NV'. Someone turned it in anonymously the next morning.",
        importance: "medium", discovered: false, relatedSuspects: ["s1"],
        analysis: "The killer took the laptop but left the torn strap."
      }
    ],
    solution: {
      culprit: "s1",
      motive: "Silence the journalist before her exposé on his financial fraud was published",
      method: "Frost arranged the meeting using a burner phone, had cameras disabled, and arrived via taxi after leaving his dinner early",
      keyEvidence: ["c4", "c5", "c7", "c1"],
      explanation: "Director Alan Frost left his alibi dinner early (hotel receipt: 9:30 PM), took a registered taxi to Kingsley Station, lured Nadia there with a burner phone. The hotel receipt and taxi GPS record completely destroy his alibi."
    },
    contradictions: [
      {
        suspectId: "s1", question: "whereWereYou", evidence: "c4",
        contradiction: "Frost claims he was at the Grand Hotel board dinner all evening, but a hotel receipt shows he checked out at 9:30 PM — over an hour before the murder!"
      }
    ]
  },

  {
    id: 4,
    title: "The Silent Witness",
    slug: "silent-witness",
    coverImage: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=600&q=80",
    description: "A key witness in a high-profile trial disappears the night before they are scheduled to testify. Was it fear — or something more sinister?",
    fullStory: `Maria Chen was scheduled to testify in the Delacroix corruption trial at 9 AM. By 7 AM, her protection detail found her apartment empty, her phone smashed, and her go-bag missing. Did she flee in fear, or was she taken?`,
    location: "Chen Residence, Westgate District",
    date: "March 4th, 2024",
    incident: "Disappearance of protected witness Maria Chen",
    difficulty: "Easy",
    estimatedTime: "30 min",
    clueCount: 6,
    reward: 300,
    status: "available",
    category: "Disappearance",
    objectives: [
      "Determine if Maria left voluntarily or was taken",
      "Find the leak in the witness protection detail",
      "Locate Maria or evidence of her destination",
      "Identify who compromised the protection"
    ],
    suspects: [
      {
        id: "s1",
        name: "Agent Dex Morrison",
        avatar: "🕵️",
        occupation: "Witness Protection Agent",
        motive: "Secretly on Delacroix's payroll",
        alibi: "Claims he was running a perimeter check",
        relationship: "Protection Agent",
        isGuilty: true,
        statements: {
          whereWereYou: "I was doing a perimeter sweep. Standard protocol.",
          didYouHearAnything: "Nothing until my partner radioed that Maria was gone.",
          relationshipWithVictim: "Strictly professional. I protect witnesses, period.",
          lastTimeYouSawVictim: "At midnight. She was reading in the living room.",
          evidenceChallenge: "That's not my number. Someone's setting me up."
        }
      },
      {
        id: "s2",
        name: "Prosecutor Dana Wells",
        avatar: "👩‍⚖️",
        occupation: "Trial Prosecutor",
        motive: "Suspected of secretly wanting the case to fail",
        alibi: "At her office preparing court briefs",
        relationship: "Legal Handler",
        isGuilty: false,
        statements: {
          whereWereYou: "My office all night. I need that testimony — why would I sabotage my own case?",
          didYouHearAnything: "Only the phone call at 7 AM telling me Maria was gone.",
          relationshipWithVictim: "I spent months preparing her. She was crucial.",
          lastTimeYouSawVictim: "Yesterday afternoon, final prep session.",
          evidenceChallenge: "I never contacted any third party. This is ridiculous."
        }
      },
      {
        id: "s3",
        name: "Victor Delacroix Jr.",
        avatar: "👨‍💰",
        occupation: "Son of the Accused",
        motive: "Would do anything to prevent his father's conviction",
        alibi: "Claims he was at a club downtown",
        relationship: "Opposing Party",
        isGuilty: false,
        statements: {
          whereWereYou: "Club Elysium till 3 AM. Check the VIP log.",
          didYouHearAnything: "About the witness? Not until the news.",
          relationshipWithVictim: "She's trying to destroy my father based on lies.",
          lastTimeYouSawVictim: "Never met her in person.",
          evidenceChallenge: "Money transfers? My family makes hundreds of transactions daily."
        }
      }
    ],
    clues: [
      {
        id: "c1", title: "Burner Phone Text", icon: "📱",
        location: "Smashed Phone Recovery",
        description: "Recovered text from unknown number at 4:13 AM: 'They know. Side exit. Blue sedan. NOW.'",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Only someone inside the protection detail would know the building layout well enough to direct her to a specific exit."
      },
      {
        id: "c2", title: "Unknown Number Trace", icon: "📡",
        location: "Phone Records",
        description: "The unknown number traces back to a prepaid phone purchased near Agent Morrison's home address two days before.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Morrison bought the burner phone and sent the warning text to Maria."
      },
      {
        id: "c3", title: "Cash Deposit", icon: "💵",
        location: "Morrison's Bank Records",
        description: "A €50,000 cash deposit to Morrison's account 48 hours before. Origin: offshore account linked to the Delacroix organization.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Morrison was paid to compromise the witness protection."
      },
      {
        id: "c4", title: "Parking Garage Footage", icon: "🎥",
        location: "Neighboring Building Camera",
        description: "A blue sedan — plates registered to a Delacroix shell company — waiting at the side exit from 4:05 AM. Maria enters at 4:21 AM with Morrison watching.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Morrison watched Maria get into a Delacroix vehicle."
      },
      {
        id: "c5", title: "Torn Protection Manual Page", icon: "📋",
        location: "Floor Near Exit",
        description: "A page from the witness protection protocol manual with the side exit highlighted.",
        importance: "medium", discovered: false, relatedSuspects: ["s1"],
        analysis: "Morrison tore out this page to reference the exact exit to direct Maria to."
      },
      {
        id: "c6", title: "Maria's Hidden Note", icon: "📝",
        location: "Under Living Room Rug",
        description: "'If I disappear — Morrison. Don't trust him. He knows things he shouldn't.' Written in Maria's handwriting.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Maria suspected Morrison. She left this as insurance."
      }
    ],
    solution: {
      culprit: "s1",
      motive: "Bribed by the Delacroix organization to deliver the witness to them",
      method: "Sent a false warning text to panic Maria, guided her to a waiting Delacroix vehicle at the side exit",
      keyEvidence: ["c2", "c3", "c4", "c6"],
      explanation: "Agent Morrison was a corrupt protection officer on the Delacroix payroll. He bought a burner phone to send a panic text, directed Maria to the side exit, and handed her to a Delacroix vehicle. Maria herself suspected him and left a hidden note."
    },
    contradictions: [
      {
        suspectId: "s1", question: "lastTimeYouSawVictim", evidence: "c4",
        contradiction: "Morrison claims he last saw Maria at midnight in the living room, but footage shows him watching her enter a Delacroix vehicle at 4:21 AM!"
      }
    ]
  },

  {
    id: 5,
    title: "The Secret Laboratory",
    slug: "secret-laboratory",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    description: "A top-secret research formula vanishes from a high-security lab. Three scientists had access. One of them is a corporate spy.",
    fullStory: `The Prometheus Formula — a revolutionary clean energy breakthrough — was stolen from Nexus Research Institute's Level 5 laboratory. The theft occurred during a 20-minute power outage. Only three scientists had biometric clearance.`,
    location: "Nexus Research Institute, Lab Level 5",
    date: "December 1st, 2024",
    incident: "Theft of the Prometheus Formula",
    difficulty: "Expert",
    estimatedTime: "75 min",
    clueCount: 8,
    reward: 1000,
    status: "locked",
    category: "Corporate Espionage",
    objectives: [
      "Determine how the formula was extracted during the outage",
      "Identify the corporate spy among the scientists",
      "Find evidence of the external contact",
      "Recover the formula or its copies"
    ],
    suspects: [
      {
        id: "s1",
        name: "Dr. Priya Mehta",
        avatar: "👩‍🔬",
        occupation: "Lead Researcher",
        motive: "Offered a $10M contract by rival corporation",
        alibi: "Claims she was in the emergency stairwell during the outage",
        relationship: "Lead Scientist",
        isGuilty: true,
        statements: {
          whereWereYou: "In the stairwell — the emergency lighting came on and I went to check the emergency board.",
          didYouHearAnything: "Only the backup generators kicking in.",
          relationshipWithVictim: "The formula is my life's work. I'd never betray it.",
          lastTimeYouSawVictim: "I last accessed the secure terminal at 6 PM, two hours before the outage.",
          evidenceChallenge: "Encrypted emails? Show me one with my actual signature."
        }
      },
      {
        id: "s2",
        name: "Dr. Felix Grant",
        avatar: "👨‍🔬",
        occupation: "Materials Scientist",
        motive: "Owes significant debt to parties connected to a rival firm",
        alibi: "In his personal lab module working on unrelated research",
        relationship: "Co-Researcher",
        isGuilty: false,
        statements: {
          whereWereYou: "Lab module C, my personal workstation. The outage killed my experiment progress.",
          didYouHearAnything: "Power went out, backup lights came on, alarms for a second, then silence.",
          relationshipWithVictim: "The formula? I contributed the thermal stability component.",
          lastTimeYouSawVictim: "I accessed the main lab at 5 PM to review my contribution.",
          evidenceChallenge: "Yes I have debts but I didn't sell anything."
        }
      },
      {
        id: "s3",
        name: "Security Chief Ron Kade",
        avatar: "💂",
        occupation: "Institute Security Director",
        motive: "Paid to arrange the power outage as cover",
        alibi: "Managing the security response to the outage",
        relationship: "Security",
        isGuilty: false,
        statements: {
          whereWereYou: "At the security station coordinating the outage response. I have radio logs.",
          didYouHearAnything: "Everything. I'm security chief. But nothing indicated a theft in progress.",
          relationshipWithVictim: "I secure the lab. I don't understand the science.",
          lastTimeYouSawVictim: "I saw Dr. Mehta near the server corridor at 7:55 PM, just before the outage.",
          evidenceChallenge: "That bank account isn't mine. I've never seen it before."
        }
      }
    ],
    clues: [
      {
        id: "c1", title: "Server Access Log", icon: "🖥️",
        location: "IT Security Office",
        description: "Server access log showing Dr. Mehta's biometric credentials used to access the Formula database at 8:02 PM — during the power outage.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Biometric credentials don't lie. Mehta accessed the formula database during the outage."
      },
      {
        id: "c2", title: "Encrypted USB", icon: "💾",
        location: "Mehta's Lab Coat Pocket",
        description: "A USB drive in Dr. Mehta's lab coat. File creation timestamps match the outage window exactly.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "This is the transfer medium. The formula was copied directly to this drive."
      },
      {
        id: "c3", title: "Encrypted Email Thread", icon: "📧",
        location: "Deleted Email Recovery",
        description: "Recovered deleted emails between 'PM_private' and 'QuantumSynth_Acquisitions' discussing formula specs, payment, and a December 1st deadline.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "PM_private is identifiable as Priya Mehta. The December 1st deadline explains the timing."
      },
      {
        id: "c4", title: "Planned Outage Memo", icon: "📋",
        location: "Security Chief's Shredder",
        description: "Partially reconstructed memo showing the power outage was planned. Signed 'RK' citing a fictitious maintenance reason.",
        importance: "high", discovered: false, relatedSuspects: ["s3", "s1"],
        analysis: "Ron Kade arranged the outage as cover."
      },
      {
        id: "c5", title: "UPS Override Code", icon: "🔋",
        location: "Behind Server Rack",
        description: "A sticky note with the UPS override code — allowing secure terminal to stay powered during the outage.",
        importance: "medium", discovered: false, relatedSuspects: ["s1"],
        analysis: "Mehta needed this code to keep the terminal live during the outage."
      },
      {
        id: "c6", title: "Offshore Transfer", icon: "💳",
        location: "Mehta's Personal Tablet",
        description: "Digital bank confirmation: $500,000 transferred to Dr. Mehta's offshore account from QuantumSynth Corp — dated December 1st.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Payment was made on the same day as the theft."
      },
      {
        id: "c7", title: "Stairwell Camera Gap", icon: "📹",
        location: "Security Footage Review",
        description: "The stairwell camera shows NO sign of Dr. Mehta during the outage window. Her alibi is absent from any footage.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Mehta's alibi is a lie. She was in the server corridor, not the stairwell."
      },
      {
        id: "c8", title: "Fingerprint on Terminal", icon: "🔍",
        location: "Secure Terminal",
        description: "Dr. Mehta's fresh fingerprints found on the secure terminal keyboard despite her claim of last accessing it at 6 PM.",
        importance: "high", discovered: false, relatedSuspects: ["s1"],
        analysis: "Forensic analysis confirms fresh prints — made during the outage."
      }
    ],
    solution: {
      culprit: "s1",
      motive: "Paid $10M by rival corporation QuantumSynth to steal the Prometheus Formula",
      method: "Used UPS override to keep terminal powered during a planned outage, copied formula to USB drive",
      keyEvidence: ["c1", "c2", "c3", "c6"],
      explanation: "Dr. Priya Mehta orchestrated the theft with Security Chief Kade arranging the power outage. Using a UPS override code, she kept the secure terminal live and copied the formula to a hidden USB drive."
    },
    contradictions: [
      {
        suspectId: "s1", question: "lastTimeYouSawVictim", evidence: "c7",
        contradiction: "Mehta claims she was in the stairwell during the outage, but stairwell cameras show she was NEVER THERE during that window!"
      }
    ]
  },

  {
    id: 6,
    title: "The Last Letter",
    slug: "last-letter",
    coverImage: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&q=80",
    description: "An elderly recluse is found dead, clutching a sealed letter addressed 'To whoever finds the truth.' The letter contains a coded message.",
    fullStory: `Retired cryptographer Professor Ernest Finch was found in his locked study, dead from apparent heart failure. But the letter in his hand suggests he knew someone was coming for him. The coded message inside points to a secret he'd been keeping for thirty years.`,
    location: "Finch Residence, Oldgate Village",
    date: "August 22nd, 2024",
    incident: "Suspicious death of Professor Ernest Finch",
    difficulty: "Medium",
    estimatedTime: "40 min",
    clueCount: 7,
    reward: 450,
    status: "available",
    category: "Suspicious Death",
    objectives: [
      "Decode the Professor's final message",
      "Determine if his death was natural or staged",
      "Uncover the 30-year secret he was protecting",
      "Identify who feared the secret most"
    ],
    suspects: [
      {
        id: "s1",
        name: "Harriet Finch",
        avatar: "👵",
        occupation: "Daughter & Sole Heir",
        motive: "The secret threatens to disinherit her if revealed",
        alibi: "Claims she was visiting a friend in Bristol",
        relationship: "Daughter",
        isGuilty: false,
        statements: {
          whereWereYou: "Bristol. I have train tickets and receipts from the restaurant where we dined.",
          didYouHearAnything: "Father called me two days before he died. He seemed frightened.",
          relationshipWithVictim: "He was my father. A complicated relationship but I loved him.",
          lastTimeYouSawVictim: "A week ago. He seemed worried but wouldn't tell me why.",
          evidenceChallenge: "A will? He never told me about any changes."
        }
      },
      {
        id: "s2",
        name: "Geoffrey Marsh",
        avatar: "👴",
        occupation: "Former Intelligence Colleague",
        motive: "The secret implicates him in a Cold War operation gone wrong",
        alibi: "Claims to have been home alone all evening",
        relationship: "Old Colleague",
        isGuilty: true,
        statements: {
          whereWereYou: "At home. I'm 74 years old. Where do you think I was?",
          didYouHearAnything: "Ernest and I hadn't spoken in a decade.",
          relationshipWithVictim: "Old colleagues. Ancient history.",
          lastTimeYouSawVictim: "Ten years ago at a conference. We were not close.",
          evidenceChallenge: "That file? It's government property. I can't discuss it."
        }
      },
      {
        id: "s3",
        name: "Claire Noon",
        avatar: "👩‍📚",
        occupation: "National Archive Researcher",
        motive: "Wanted to publish the secret for professional fame",
        alibi: "At the National Archive all day",
        relationship: "Researcher",
        isGuilty: false,
        statements: {
          whereWereYou: "The archive. My access card logs every entry and exit.",
          didYouHearAnything: "I knew the Professor professionally. He'd been helping with declassified files.",
          relationshipWithVictim: "Academic collaboration only.",
          lastTimeYouSawVictim: "Last Thursday. He gave me a coded document to analyze.",
          evidenceChallenge: "He asked me to hold those documents safely. I was helping him."
        }
      }
    ],
    clues: [
      {
        id: "c1", title: "The Coded Letter", icon: "✉️",
        location: "Professor's Hand",
        description: "A letter containing a 30-character cipher. Decoded (Caesar shift 7): 'MARSH KNOWS WHAT HAPPENED IN PRAGUE 1987'",
        importance: "high", discovered: false, relatedSuspects: ["s2"],
        analysis: "The decoded message directly names Marsh in connection with a 1987 Prague incident."
      },
      {
        id: "c2", title: "Forced Lock Evidence", icon: "🔐",
        location: "Study Window",
        description: "The study window latch shows microscopic marks of being opened and re-locked from outside.",
        importance: "high", discovered: false, relatedSuspects: ["s2"],
        analysis: "The locked-room mystery is solved. Entry was via the window, professionally re-secured after use."
      },
      {
        id: "c3", title: "Injection Mark", icon: "💉",
        location: "Autopsy Report",
        description: "Toxicology reveals a micro-dose of potassium chloride — mimics natural cardiac arrest, virtually undetectable in routine autopsies.",
        importance: "high", discovered: false, relatedSuspects: ["s2"],
        analysis: "The death was staged. Potassium chloride injection is a classic intelligence agency method."
      },
      {
        id: "c4", title: "Classified Prague File", icon: "🗄️",
        location: "Hidden Floor Safe",
        description: "A classified government file detailing Operation Nightfall, Prague, 1987. Finch's report indicates Marsh deliberately betrayed an asset.",
        importance: "high", discovered: false, relatedSuspects: ["s2"],
        analysis: "This is the secret. Marsh was a double agent. Exposure would mean criminal prosecution."
      },
      {
        id: "c5", title: "Recent Will Change", icon: "📜",
        location: "Solicitor's Records",
        description: "Finch changed his will 3 days before death: 'All classified documents to be delivered to the Attorney General upon my death.'",
        importance: "medium", discovered: false, relatedSuspects: ["s2"],
        analysis: "Finch knew someone was coming. He ensured documents would reach authorities regardless."
      },
      {
        id: "c6", title: "Marsh's Travel Record", icon: "🚗",
        location: "ANPR Camera Data",
        description: "Number plate recognition cameras record Marsh's vehicle within 2 miles of Finch's residence at 9:15 PM.",
        importance: "high", discovered: false, relatedSuspects: ["s2"],
        analysis: "Marsh was in the area. His alibi of being home alone is destroyed by camera data."
      },
      {
        id: "c7", title: "Phone Threat Recording", icon: "📞",
        location: "Finch's Answerphone",
        description: "Voicemail from a disguised voice: 'You kept it long enough, Ernest. It ends now.' Left 36 hours before death. Voice analysis matches Marsh.",
        importance: "high", discovered: false, relatedSuspects: ["s2"],
        analysis: "Voice demodulation reveals vocal signature matching Geoffrey Marsh's known recordings."
      }
    ],
    solution: {
      culprit: "s2",
      motive: "Silence the only person who could prove his Cold War betrayal",
      method: "Entered through the study window using intelligence training, administered untraceable potassium chloride injection",
      keyEvidence: ["c1", "c3", "c4", "c6"],
      explanation: "Geoffrey Marsh, a former double agent, killed Professor Finch to prevent the Prague 1987 file from reaching authorities. He entered via the window, administered a potassium chloride injection, and staged a natural death. The decoded letter, ANPR records, toxicology, and classified file all condemn him."
    },
    contradictions: [
      {
        suspectId: "s2", question: "whereWereYou", evidence: "c6",
        contradiction: "Marsh claims he was home all evening, but ANPR cameras recorded his vehicle 2 miles from Finch's house at 9:15 PM — the estimated time of death!"
      }
    ]
  }
];

export const QUESTIONS = [
  { id: "whereWereYou", text: "Where were you at the time of the incident?" },
  { id: "didYouHearAnything", text: "Did you hear or see anything unusual?" },
  { id: "relationshipWithVictim", text: "What is your relationship with the victim/case?" },
  { id: "lastTimeYouSawVictim", text: "When did you last see the victim or item in question?" },
  { id: "evidenceChallenge", text: "Present Evidence" }
];
