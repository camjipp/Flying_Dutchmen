import { Horse, NewsItem, RaceResult, SpotlightItem, Stats, UpcomingRunner } from "@/lib/types";

export const horses: Horse[] = [
  {
    id: "horse_slay_the_day",
    slug: "slay-the-day",
    name: "Slay the Day",
    year: 2023,
    sex: "Filly",
    sire: "Into Mischief",
    dam: "Mind Out, by Tapit",
    trainer: "Brian A. Lynch",
    status: "active",
    record: "5: 3-1-0",
    earnings: "$337,238",
    image: "/images/horses/slay-the-day-v3.png",
    imagePresentation: "cutout",
    foaled: "February 2, 2023",
    heroSubline: "Thoroughbred, Bay, Filly",
    color: "Bay",
    birthplace: "Kentucky",
    registration: "(KY) 91",
    jockey: "John R. Velazquez",
    owner: "Flying Dutchmen Breeding and Racing LLC",
    breeder: "Pin Oak Stud, LLC",
    salesNote: "Sold to Flying Dutchmen. Consigned by Taylor Made Sales Agency.",
    racingClass: "Graded Stakes Winner",
    periodStats2026: {
      starts: 3,
      firsts: 2,
      seconds: 1,
      thirds: 0,
      earnings: "$262,850"
    },
    periodStatsCareer: {
      starts: 5,
      firsts: 3,
      seconds: 1,
      thirds: 0,
      earnings: "$337,238"
    },
    bio: "Into Mischief filly out of Mind Out (Tapit) who has already earned graded black type with a sharp turn of foot on the Kentucky circuit. She races in the navy and white for Flying Dutchmen Breeding and Racing LLC with a profile built for one-turn and mile-and-a-sixteenth dirt assignments.",
    recentResults: [
      {
        date: "2026-04-18",
        track: "Keeneland",
        race: "FanDuel Limestone Stakes (G3)",
        finish: "1st"
      },
      {
        date: "2026-03-22",
        track: "Fair Grounds",
        race: "Rachel Alexandra Stakes (G2)",
        finish: "2nd"
      },
      {
        date: "2026-02-15",
        track: "Oaklawn Park",
        race: "Martha Washington Stakes",
        finish: "1st"
      }
    ]
  },
  {
    id: "horse_velvet_tactic",
    slug: "velvet-tactic",
    name: "Velvet Tactic",
    year: 2023,
    sex: "Filly",
    sire: "Harbor Signal",
    dam: "Ivory Tide",
    trainer: "Camille Ortega",
    status: "active",
    record: "8: 3-2-2",
    earnings: "$742,100",
    image: "/images/horses/placeholder.svg",
    foaled: "February 2, 2023",
    bio: "Progressive three-year-old filly with strong late pace and adaptable campaign profile.",
    recentResults: [
      {
        date: "2026-04-12",
        track: "Keeneland",
        race: "G3 Spring Oaks Trial",
        finish: "2nd"
      },
      {
        date: "2026-02-28",
        track: "Gulfstream Park",
        race: "Allowance Optional Claiming",
        finish: "1st"
      }
    ]
  },
  {
    id: "horse_brass_voyager",
    slug: "brass-voyager",
    name: "Brass Voyager",
    year: 2020,
    sex: "Horse",
    sire: "Black Meridian",
    dam: "Satin Route",
    trainer: "Darren Pike",
    status: "retired",
    record: "24: 8-4-5",
    earnings: "$2,032,400",
    image: "/images/horses/placeholder.svg",
    foaled: "April 14, 2020",
    bio: "Durable graded performer retired sound and transitioning into long-term breeding plans.",
    recentResults: [
      {
        date: "2025-11-03",
        track: "Del Mar",
        race: "G1 Pacific Classic",
        finish: "3rd"
      },
      {
        date: "2025-09-01",
        track: "Saratoga",
        race: "G2 Summer Championship",
        finish: "1st"
      }
    ]
  },
  {
    id: "horse_iron_harbor",
    slug: "iron-harbor",
    name: "Iron Harbor",
    year: 2021,
    sex: "Colt",
    sire: "Iron Beacon",
    dam: "Safe Harbor",
    trainer: "Caleb Rowe",
    status: "active",
    record: "9: 4-2-1",
    earnings: "$418,600",
    image: "/images/horses/placeholder.svg",
    foaled: "May 6, 2021",
    bio: "Versatile dirt sprinter–miler who carries speed into two turns and fits aggressively spotted allowance and listed company.",
    recentResults: [
      {
        date: "2026-03-29",
        track: "Santa Anita",
        race: "Allowance Optional Claiming",
        finish: "1st"
      }
    ]
  },
  {
    id: "horse_harbor_command",
    slug: "harbor-command",
    name: "Harbor Command",
    year: 2022,
    sex: "Gelding",
    sire: "Harbor Signal",
    dam: "Command Post",
    trainer: "Caleb Rowe",
    status: "active",
    record: "7: 3-1-2",
    earnings: "$286,400",
    image: "/images/horses/placeholder.svg",
    foaled: "August 22, 2022",
    bio: "Sharp-turning six-furlong type with a high cruising rate; pointed to sprint stakes on the Mid-Atlantic circuit.",
    recentResults: []
  }
];

export const results: RaceResult[] = [
  {
    id: "result_20260420_slay_the_day",
    horseName: "Slay the Day",
    horseSlug: "slay-the-day",
    date: "2026-04-18",
    track: "Keeneland",
    race: "FanDuel Limestone Stakes (G3)",
    finish: "1st",
    jockey: "John R. Velazquez",
    trainer: "Brian A. Lynch",
    notes: "Rated kindly off the pace, angled out in upper stretch, and drove clear to graduate at the graded level."
  },
  {
    id: "result_20260412_velvet_tactic",
    horseName: "Velvet Tactic",
    horseSlug: "velvet-tactic",
    date: "2026-04-12",
    track: "Keeneland",
    race: "G3 Spring Oaks Trial",
    finish: "2nd",
    jockey: "Javier Soto",
    trainer: "Camille Ortega",
    notes: "Closed strongly through traffic; beaten a neck at the wire."
  },
  {
    id: "result_20260329_iron_harbor",
    horseName: "Iron Harbor",
    horseSlug: "iron-harbor",
    date: "2026-03-29",
    track: "Santa Anita",
    race: "Allowance Optional Claiming",
    finish: "1st",
    jockey: "Mateo Ruiz",
    trainer: "Caleb Rowe",
    notes: "Broke sharply, set moderate fractions, and held decisively late."
  },
  {
    id: "result_20260315_slay_the_day",
    horseName: "Slay the Day",
    horseSlug: "slay-the-day",
    date: "2026-03-22",
    track: "Fair Grounds",
    race: "Rachel Alexandra Stakes (G2)",
    finish: "2nd",
    jockey: "John R. Velazquez",
    trainer: "Brian A. Lynch",
    notes: "Closed with a sustained run from mid-pack; denied only late while earning a career top speed figure."
  },
  {
    id: "result_20260302_velvet_tactic",
    horseName: "Velvet Tactic",
    horseSlug: "velvet-tactic",
    date: "2026-03-02",
    track: "Gulfstream Park",
    race: "Allowance Optional Claiming",
    finish: "1st",
    jockey: "Javier Soto",
    trainer: "Camille Ortega",
    notes: "Controlled splits throughout; geared down late."
  }
];

export const upcomingRunners: UpcomingRunner[] = [
  {
    id: "entry_20260503_slay_the_day",
    horseName: "Slay the Day",
    horseSlug: "slay-the-day",
    date: "2026-05-03",
    track: "Churchill Downs",
    race: "G1 Derby Day Invitational",
    postTime: "5:42 PM ET",
    jockey: "John R. Velazquez",
    trainer: "Brian A. Lynch"
  },
  {
    id: "entry_20260509_velvet_tactic",
    horseName: "Velvet Tactic",
    horseSlug: "velvet-tactic",
    date: "2026-05-09",
    track: "Belmont at Aqueduct",
    race: "G2 Metropolitan Oaks",
    postTime: "3:58 PM ET",
    jockey: "Javier Soto",
    trainer: "Camille Ortega"
  },
  {
    id: "entry_20260511_harbor_command",
    horseName: "Harbor Command",
    horseSlug: "harbor-command",
    date: "2026-05-11",
    track: "Pimlico",
    race: "Listed Harbor Sprint",
    postTime: "2:46 PM ET",
    jockey: "Evan Cruz",
    trainer: "Caleb Rowe"
  },
  {
    id: "entry_20260517_iron_harbor",
    horseName: "Iron Harbor",
    horseSlug: "iron-harbor",
    date: "2026-05-17",
    track: "Saratoga",
    race: "G3 Commentator Stakes",
    postTime: "4:22 PM ET",
    jockey: "Mateo Ruiz",
    trainer: "Caleb Rowe"
  }
];

export const news: NewsItem[] = [
  {
    id: "news_20260422_derby_day_assignment",
    slug: "slay-the-day-derby-day-assignment",
    title: "Slay the Day set for Derby Day assignment",
    date: "2026-04-22",
    category: "Campaign Update",
    excerpt: "Following a graded win, the filly remains on schedule for Churchill with one maintenance work planned.",
    image: "/images/news/northern-standard-derby.jpg",
    body: "Following her Limestone (G3) victory at Keeneland, Slay the Day remains on schedule for Derby Day. The team has confirmed one maintenance move and a conservative travel plan to keep her current condition intact."
  },
  {
    id: "news_20260414_velvet_tactic_training_report",
    slug: "velvet-tactic-training-report",
    title: "Velvet Tactic resumes training after graded placing",
    date: "2026-04-14",
    category: "Stable Report",
    excerpt: "The filly returned to the track this week and remains pointed to a graded summer sequence.",
    image: "/images/news/velvet-tactic-training.jpg",
    body: "Velvet Tactic cooled out with no concerns after her graded run and resumed routine gallops within the week. The stable expects one prep race before her next major target."
  },
  {
    id: "news_20260330_roster_activity_update",
    slug: "flying-dutchmen-roster-activity-update",
    title: "Roster activity update: spring placements finalized",
    date: "2026-03-30",
    category: "Stable Management",
    excerpt: "Upcoming entries have been finalized across Kentucky and New York circuits for the next cycle.",
    image: "/images/news/roster-activity.jpg",
    body: "Flying Dutchmen has finalized upcoming placements for active strings, balancing graded opportunities with spacing strategy. Current scheduling prioritizes consistency and long-range stakes readiness."
  }
];

/** Short operational lines for the /news “Stable notes” band. */
export const stableNewsNotes: string[] = [
  "Slay the Day breezed 5f in 1:00 at Keeneland.",
  "Velvet Tactic targeting G3 entry next month.",
  "Iron Harbor galloped 1¼ miles; reported clean into next entry."
];

export const spotlightItems: SpotlightItem[] = [
  {
    id: "spotlight_bh_boersma_inglis",
    tier: "feature",
    kind: "article",
    title: "Young American Boersma Makes a Splash at Inglis Easter",
    source: "BloodHorse",
    href: "https://www.bloodhorse.com/horse-racing/articles/290922/young-american-boersma-makes-a-splash-at-inglis-easter",
    image: "/images/news/northern-standard-derby.jpg",
    excerpt:
      "Payton Boersma and The Flying Dutchmen’s first overseas buy at Inglis Easter—and how the stable is building with Arrowfield in Australia.",
    ctaLabel: "Read Article →"
  },
  {
    id: "spotlight_yt_tampa_derby",
    tier: "feature",
    kind: "youtube",
    title: "OWEN ALMIGHTY wins the G3 Tampa Bay Derby",
    source: "YouTube · GHRTV",
    href: "https://www.youtube.com/watch?v=jbEgUOXOEdw",
    image: "https://i.ytimg.com/vi/jbEgUOXOEdw/hqdefault.jpg",
    excerpt: "Race replay and call as Owen Almighty takes the Tampa Bay Derby (G3) at Tampa Bay Downs.",
    ctaLabel: "Watch →"
  },
  {
    id: "spotlight_ig_fanduel_reel",
    tier: "support",
    kind: "instagram",
    title: "FanDuel Racing reel",
    source: "Instagram · @fanduel_racing",
    href: "https://www.instagram.com/reel/DXSROP_EYF3/",
    image: "/images/news/roster-activity.jpg"
  },
  {
    id: "spotlight_x_twinspires_chilukki",
    tier: "support",
    kind: "x",
    title: "Shred the Gnar wins the G3 Chilukki off a 6-month layoff",
    source: "X · @TwinSpires",
    href: "https://x.com/TwinSpires/status/1989771773705859549",
    image: "https://pbs.twimg.com/media/G50W118W8AAxjiL.jpg"
  },
  {
    id: "spotlight_derby_day_news",
    tier: "support",
    kind: "article",
    title: "Slay the Day set for Derby Day assignment",
    source: "Flying Dutchmen",
    href: "/news/slay-the-day-derby-day-assignment",
    image: "/images/news/northern-standard-derby.jpg",
    showInExpandOnly: true
  },
  {
    id: "spotlight_ig_flying_dutchmen",
    tier: "support",
    kind: "instagram",
    title: "Flying Dutchmen on Instagram",
    source: "Instagram · @flyingdutchmenky",
    href: "https://www.instagram.com/p/DWPLzqPmHRh/",
    image: "/images/news/velvet-tactic-training.jpg"
  },
  {
    id: "spotlight_yt_limestone_keeneland",
    tier: "support",
    kind: "youtube",
    title: "Slay the Day wins the 2026 FanDuel Limestone (G3)",
    source: "YouTube · Keeneland",
    href: "https://www.youtube.com/watch?v=Sq-dXDGDXcE",
    image: "https://i.ytimg.com/vi/Sq-dXDGDXcE/hqdefault.jpg"
  }
];

export const stats: Stats = {
  wins: 28,
  starts: 119,
  earnings: "$6,984,200",
  stakesPerformers: 14
};
