import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { studentId } = req.query;

    console.log(studentId);
    if (!studentId) {
      return res
        .status(422)
        .json({ error: "Missing valid studentId query in URL." });
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
      // Get user classrooms
      const user = await db
        .collection("users")
        .findOne({ customId: studentId });
      if (!user) {
        throw new Error("User doesn't exist.");
      }

      const classroomsIds = user.classrooms;
      const subjectQuery = classroomsIds.map((i) => ({
        gradeNum: parseFloat(i[0]),
      }));

      // Get subjects
      const subjects = await db
        .collection("subjects")
        .aggregate([
          {
            $match: {
              $and: [{ $or: subjectQuery }],
            },
          },
        ])
        .toArray();

      client.close();
      return res.status(200).json({ subjects, isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
