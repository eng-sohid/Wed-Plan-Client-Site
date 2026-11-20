import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.MONGO_DB_URL as string;

// Ek instance e ekta-i client
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

const client =
  globalForMongo._mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    maxIdleTimeMS: 5000,
    retryReads: true,
    retryWrites: true,
  });

globalForMongo._mongoClient = client;
attachDatabasePool(client);

const db = client.db(process.env.DB_NAME || "wedplan");

export const auth = betterAuth({
  // `{ client }` deowa hocche na: transaction lagbe na
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // Prottek request e database na dhore cookie theke session pore
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["customer", "vendor"],
        required: false,
        defaultValue: "customer",
        input: true,
      },
      businessName: { type: "string", required: false, input: true },
      phone: { type: "string", required: false, input: true },
    },
  },

  // Prevent users from changing their role later
  databaseHooks: {
    user: {
      update: {
        before: async (data) => {
          if (Object.prototype.hasOwnProperty.call(data, "role")) {
            return false;
          }
          return { data };
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
