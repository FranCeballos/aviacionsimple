import { connectToDatabase } from "@/lib/db";
const handler = async (req, res) => {
  if (req.method === "GET") {
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      return res.status(500).json({
        error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
    }
    const db = client.db();

    let classrooms;
    try {
      classrooms = await db.collection("classrooms").find().toArray();
      client.close();
      return res.status(200).json({ classrooms });
    } catch (error) {
      return res.status(500).json({
        error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
    }
  }
};

export default handler;
