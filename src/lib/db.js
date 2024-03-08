import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    maxIdleTimeMS: 60000,
  });
  return client;
}
