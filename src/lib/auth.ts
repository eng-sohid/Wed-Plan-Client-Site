import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URL!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("wedplan"), {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  user: {
    additionalFields: {
      role: {
        type: ["customer", "vendor"],
        required: false,
        defaultValue: "customer",
        input: true,
      },
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
