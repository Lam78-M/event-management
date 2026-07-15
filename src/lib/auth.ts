import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },
 socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string // clientKey-র বদলে clientSecret এবং শেষে as string দিন
  }
},

  database: mongodbAdapter(db, {
    client
  }),

  // 🎯 Better Auth custom schema setup pipeline
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
      // 🚀 এখানে নতুন approved ফিল্ডটি যোগ করা হলো
      approved: {
        type: "boolean",
        required: false,
        defaultValue: false, // নতুন রেজিস্টার করা সব ইউজার ডিফল্টভাবে false (Pending) থাকবে
      },
    },
  },
});