import { connectToDatabase } from "@/src/lib/db";
import { NotionAPI } from "notion-client";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { subjectId } = req.query;

    if (!subjectId) {
      return res.status(422).json(`Missing "subjectId" value.`);
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
      // Get subject data
      const subject = await db
        .collection("subjects")
        .findOne({ customId: subjectId });

      // Get notion recordMap
      const notion = new NotionAPI();
      const recordMap = await notion.getPage(subject.notionId);

      client.close();
      return res.status(200).json({ subject, recordMap });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
