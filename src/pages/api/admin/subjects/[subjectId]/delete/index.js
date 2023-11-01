import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { subjectId } = req.query;
    if (!subjectId) {
      return res.status(422).json({ error: `Missing "subjectId" value.` });
    }

    // Connect to db
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      return res.status(500).json({
        error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
    }
    const db = client.db();

    try {
      // Delete subject
      await db.collection("subjects").deleteOne({ customId: subjectId });

      client.close();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
