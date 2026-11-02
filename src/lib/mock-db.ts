// import type { Booking, Studio } from "./types";

// // TEMP: Express + MongoDB ready hole ei file ar api.ts er mock logic delete hobe.
// const KEY = "ss-db-v1";
// type DB = { studios: Studio[]; bookings: Booking[] };

// const img = (...n: number[]) => n.map((x) => `/studios/${x}.jpg`);
// function s(n: number, images: number[], title: string, category: string, rate: number, deposit: number, capacity: number, location: string, rating: number, amenities: string[], ownerName: string, ownerEmail: string, overview: string): Studio {
//   return { _id: `s${n}`, title, category, hourlyRate: rate, deposit, capacity, location, images: img(...images), amenities, overview, rating, ownerName, ownerEmail, createdAt: new Date(2026, 9, 30 - n).toISOString() };
// }

// const DEMO = "examiner@studiospace.com";

// function seed(): DB {
//   return {
//     studios: [
//       s(1, [4, 2, 1], "North Light Cyc Wall", "Photo Studio", 55, 100, 12, "Gulshan, Dhaka", 4.9, ["Wi-Fi", "Lighting kit", "Parking", "Changing room"], "Tanvir Rahman", "tanvir@host.com", "A 20 ft white cyc wall with daylight windows and two strobe heads. Ideal for product, fashion and portrait shoots."),
//       s(2, [5, 3, 1], "Monsoon Podcast Lounge", "Podcast Lounge", 30, 50, 5, "Dhanmondi, Dhaka", 4.8, ["Wi-Fi", "Acoustic panels", "Kitchenette"], "Nusrat Jahan", "nusrat@host.com", "Four-mic setup with treated walls and a sofa corner, ready for interviews and video podcasts."),
//       s(3, [2, 4, 3], "Stage 9 Cinema Floor", "Film Stage", 120, 300, 40, "Uttara, Dhaka", 4.7, ["Green screen", "Lighting kit", "Parking", "Blackout curtains"], "Imran Hossain", "imran@host.com", "1,800 sq ft soundproofed stage with a drive-in door and a built-in grid for rigging lights."),
//       s(4, [1, 3, 5], "Padma Recording Suite", "Music Suite", 45, 120, 8, "Banani, Dhaka", 4.9, ["Acoustic panels", "Wi-Fi", "Kitchenette"], "Rafi Ahmed", "rafi@host.com", "Control room and live room with a vocal booth, 16-channel console and a grand piano."),
//       s(5, [4, 1, 2], "Clay and Canvas Workshop", "Workshop", 25, 40, 15, "Agrabad, Chattogram", 4.6, ["Wi-Fi", "Kitchenette", "Parking"], "Sadia Islam", "sadia@host.com", "Bright workshop with long tables, a kiln and wall space for painting and ceramics classes."),
//       s(6, [2, 5, 4], "Blue Hour Loft", "Photo Studio", 40, 80, 10, "Sylhet Sadar", 4.5, ["Wi-Fi", "Lighting kit", "Changing room"], "Mahin Chowdhury", "mahin@host.com", "Brick-wall loft with big windows, props and a small set kitchen for lifestyle shoots."),
//       s(7, [5, 2, 3], "Echo Room Voiceover Booth", "Podcast Lounge", 20, 30, 3, "Khulna Sadar", 4.4, ["Acoustic panels", "Wi-Fi"], "Farhan Kabir", "farhan@host.com", "Compact isolation booth for voiceover, dubbing and narration, with a large-diaphragm mic on hand."),
//       s(8, [3, 1, 5], "Riverside Band Room", "Music Suite", 35, 60, 7, "Barishal Sadar", 4.6, ["Parking", "Acoustic panels", "Wi-Fi"], "Demo Examiner", DEMO, "Rehearsal room with a full backline, drum kit and PA, plus a river view lounge."),
//     ],
//     bookings: [
//       { _id: "b1", studioId: "s1", studioTitle: "North Light Cyc Wall", userEmail: "other@user.com", date: "2026-11-10", startHour: 10, endHour: 14, total: 220, status: "Confirmed", createdAt: new Date(2026, 9, 28).toISOString() },
//     ],
//   };
// }

// export function readDB(): DB {
//   if (typeof window === "undefined") return seed();
//   try {
//     const raw = localStorage.getItem(KEY);
//     if (raw) return JSON.parse(raw) as DB;
//   } catch {}
//   return seed();
// }

// export function writeDB(db: DB) {
//   try {
//     localStorage.setItem(KEY, JSON.stringify(db));
//   } catch {}
// }
