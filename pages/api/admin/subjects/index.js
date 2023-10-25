import createCustomId from "@/lib/createCustomId";
import { NotionAPI } from "notion-client";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
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
      // Get all subject titles and customIds
      const subjects = await db
        .collection("subjects")
        .find()
        .project({ _id: 0, customId: 1, title: 1 })
        .toArray();

      client.close();
      return res.status(200).json({ subjects });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    const { subjectName, notionId, classroomValue } = req.body;
    if (!subjectName || !notionId || !classroomValue) {
      return res.status(422).json({
        error: 'Missing "subjectName", "notionId" or "classroomValue" value.',
      });
    }
    const customId = createCustomId(subjectName);

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
      // Check if subject exists
      const subject = await db.collection("subjects").findOne({ customId });

      if (subject) {
        throw new Error("La materia ya existe");
      }

      // Check if Notion ID is valid
      const notion = new NotionAPI();
      await notion.getPage(notionId);

      // Create subject
      await db.collection("subjects").insertOne({
        customId,
        title: subjectName,
        notionId,
        classrooms: classroomValue,
      });

      client.close();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    const { subjectName, notionId, classroomValue, prevCustomId } = req.body;

    if (!subjectName || !notionId || !classroomValue || !prevCustomId) {
      return res.status(422).json({
        error: "Falta ingresar algún dato.",
      });
    }
    const customId = createCustomId(subjectName);

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
      // Check if Notion ID is valid
      const notion = new NotionAPI();
      await notion.getPage(notionId);

      // Update subject
      await db.collection("subjects").updateOne(
        { customId: prevCustomId },
        {
          $set: {
            title: subjectName,
            customId: customId,
            classrooms: classroomValue,
            notionId,
          },
        }
      );

      client.close();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
