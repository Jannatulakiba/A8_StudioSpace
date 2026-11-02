export const CATEGORIES = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  "Photo Studio": "Photo Studios",
  "Film Stage": "Sound Stages",
  "Podcast Lounge": "Podcast Rooms",
  "Music Suite": "Music Suites",
  Workshop: "Art Workshops",
};

export const AMENITIES = ["Wi-Fi", "Blackout curtains", "Green screen", "Acoustic panels", "Parking", "Kitchenette", "Lighting kit", "Changing room"];

export const START_HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6..22
export const END_HOURS = Array.from({ length: 17 }, (_, i) => i + 7); // 7..23

export const REVIEWS = [
  { name: "Ayesha K.", rating: 5, text: "Clean, quiet and exactly as pictured. Host replied within minutes." },
  { name: "Dipto M.", rating: 4, text: "Great light for our lookbook shoot. Parking was tight on a weekday." },
];
