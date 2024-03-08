import { connectToDatabase } from "@/src/lib/db";
const handler = async (req, res) => {
  if (req.method === "GET") {
    const { classroomId } = req.query;

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

    // GET NOTIFICATIONS
    try {
      const notifications = await db
        .collection("notifications")
        .find({ classroom: classroomId })
        .toArray();
      const classroom = await db
        .collection("classrooms")
        .aggregate([
          { $match: { customId: classroomId } },
          { $project: { students: 0, subjects: 0 } },
          { $sort: { createdAt: 1 } },
        ])
        .toArray();

      client.close();
      return res.status(200).json({ notifications, classroom });
    } catch (error) {
      client?.close();
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
