// import { MongoClient, ObjectId, type Db } from "mongodb";
// import type { Booking, Studio } from "./types";

// if (!process.env.MONGODB_URI) {
//   throw new Error("MONGODB_URI is not set in .env");
// }

// // Cache the client on globalThis so dev HMR doesn't open new pools per reload.
// const globalForMongo = globalThis as unknown as {
//   _ssMongoClientPromise?: Promise<MongoClient>;
// };

// function getClientPromise(): Promise<MongoClient> {
//   if (!globalForMongo._ssMongoClientPromise) {
//     globalForMongo._ssMongoClientPromise = new MongoClient(
//       process.env.MONGODB_URI as string,
//     ).connect();
//   }
//   return globalForMongo._ssMongoClientPromise;
// }

// export async function getDb(): Promise<Db> {
//   const client = await getClientPromise();
//   return client.db("studiospace");
// }

// type StudioDoc = Omit<Studio, "_id"> & { _id?: string | ObjectId };
// type BookingDoc = Omit<Booking, "_id"> & { _id?: string | ObjectId };

// export const studiosCol = (db: Db) => db.collection<StudioDoc>("studios");
// export const bookingsCol = (db: Db) => db.collection<BookingDoc>("bookings");

// export function serialize<T extends { _id: unknown }>(doc: T | null) {
//   if (!doc) return null;
//   return { ...doc, _id: String(doc._id) };
// }

// /* ---------------- demo data (same as the old mock-db seed) ---------------- */

// const DEMO = "examiner@studiospace.com";

// function demoStudio(
//   n: number,
//   images: number[],
//   title: string,
//   category: string,
//   rate: number,
//   deposit: number,
//   capacity: number,
//   location: string,
//   rating: number,
//   amenities: string[],
//   ownerName: string,
//   ownerEmail: string,
//   overview: string,
// ): Studio {
//   const img = images.map((x) => `/studios/${x}.jpg`);
//   return {
//     _id: `s${n}`,
//     title,
//     category,
//     hourlyRate: rate,
//     deposit,
//     capacity,
//     location,
//     images: img,
//     amenities,
//     overview,
//     rating,
//     ownerName,
//     ownerEmail,
//     createdAt: new Date(2026, 9, 30 - n).toISOString(),
//   };
// }

// export const SEED_STUDIOS: Studio[] = [
//   demoStudio(1, [4, 2, 1], "North Light Cyc Wall", "Photo Studio", 55, 100, 12, "Gulshan, Dhaka", 4.9, ["Wi-Fi", "Lighting kit", "Parking", "Changing room"], "Tanvir Rahman", "tanvir@host.com", "A 20 ft white cyc wall with daylight windows and two strobe heads. Ideal for product, fashion and portrait shoots."),
//   demoStudio(2, [5, 3, 1], "Monsoon Podcast Lounge", "Podcast Lounge", 30, 50, 5, "Dhanmondi, Dhaka", 4.8, ["Wi-Fi", "Acoustic panels", "Kitchenette"], "Nusrat Jahan", "nusrat@host.com", "Four-mic setup with treated walls and a sofa corner, ready for interviews and video podcasts."),
//   demoStudio(3, [2, 4, 3], "Stage 9 Cinema Floor", "Film Stage", 120, 300, 40, "Uttara, Dhaka", 4.7, ["Green screen", "Lighting kit", "Parking", "Blackout curtains"], "Imran Hossain", "imran@host.com", "1,800 sq ft soundproofed stage with a drive-in door and a built-in grid for rigging lights."),
//   demoStudio(4, [1, 3, 5], "Padma Recording Suite", "Music Suite", 45, 120, 8, "Banani, Dhaka", 4.9, ["Acoustic panels", "Wi-Fi", "Kitchenette"], "Rafi Ahmed", "rafi@host.com", "Control room and live room with a vocal booth, 16-channel console and a grand piano."),
//   demoStudio(5, [4, 1, 2], "Clay and Canvas Workshop", "Workshop", 25, 40, 15, "Agrabad, Chattogram", 4.6, ["Wi-Fi", "Kitchenette", "Parking"], "Sadia Islam", "sadia@host.com", "Bright workshop with long tables, a kiln and wall space for painting and ceramics classes."),
//   demoStudio(6, [2, 5, 4], "Blue Hour Loft", "Photo Studio", 40, 80, 10, "Sylhet Sadar", 4.5, ["Wi-Fi", "Lighting kit", "Changing room"], "Mahin Chowdhury", "mahin@host.com", "Brick-wall loft with big windows, props and a small set kitchen for lifestyle shoots."),
//   demoStudio(7, [5, 2, 3], "Echo Room Voiceover Booth", "Podcast Lounge", 20, 30, 3, "Khulna Sadar", 4.4, ["Acoustic panels", "Wi-Fi"], "Farhan Kabir", "farhan@host.com", "Compact isolation booth for voiceover, dubbing and narration, with a large-diaphragm mic on hand."),
//   demoStudio(8, [3, 1, 5], "Riverside Band Room", "Music Suite", 35, 60, 7, "Barishal Sadar", 4.6, ["Parking", "Acoustic panels", "Wi-Fi"], "Demo Examiner", DEMO, "Rehearsal room with a full backline, drum kit and PA, plus a river view lounge."),
// ];

// const SEED_BOOKINGS: Booking[] = [
//   {
//     _id: "b1",
//     studioId: "s1",
//     studioTitle: "North Light Cyc Wall",
//     userEmail: "other@user.com",
//     date: "2026-11-10",
//     startHour: 10,
//     endHour: 14,
//     total: 220,
//     status: "Confirmed",
//     createdAt: new Date(2026, 9, 28).toISOString(),
//   },
// ];

// /** Insert the demo data once if the collections are still empty. Runtime only. */
// export async function ensureSeed(db: Db) {
//   const studios = studiosCol(db);
//   if ((await studios.countDocuments()) === 0) {
//     await studios.insertMany(
//       SEED_STUDIOS.map(({ _id, ...s }) => ({ ...s, _id })),
//     );
//   }
//   const bookings = bookingsCol(db);
//   if ((await bookings.countDocuments()) === 0) {
//     await bookings.insertMany(
//       SEED_BOOKINGS.map(({ _id, ...b }) => ({ ...b, _id })),
//     );
//   }
// }
