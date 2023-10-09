import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { customId } = req.query;

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
      const classroom = await db
        .collection("classrooms")
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "students",
              foreignField: "_id",
              as: "studentsData",
            },
          },
        ])
        .sort({ customId: 1 })
        .toArray();

      if (!classroom) {
        client.close();
        return res.status(404).json({ error: "Classroom not found." });
      }
      client.close();
      return res.status(200).json({
        classroom: classroom[0],
        message: `Classroom with custom ID "${customId}" found.`,
      });
    } catch (error) {
      client?.close();
      res.status(error.status).json({ error: error.message });
    }
  }
};

export default handler;
