import { jwt } from "better-auth/plugins"

import { MongoClient } from "mongodb";

import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("studiospace");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
 plugins: [
    jwt() 
  ],
session: {
  cookieCache: {  enabled: true,
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    
  }},


  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      
    }
  },

  database: mongodbAdapter(db),
});