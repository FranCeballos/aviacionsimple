import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { prevClassroomId, studentCustomId, nextClassroomId } = req.body;

    if (!prevClassroomId || !nextClassroomId || !studentCustomId) {
      return res.status(422).json({
        error: `Enter valid "classroomId", "nextClassroomId" and "studentId" values.`,
      });
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

    // Check existing classrooms and user
    try {
      const user = await db
        .collection("users")
        .find({ customId: studentCustomId })
        .project({ _id: 1, classrooms: 1 })
        .toArray();
      const prevClassroom = await db
        .collection("classrooms")
        .find({ customId: prevClassroomId })
        .project({ _id: 1, students: 1 })
        .toArray();
      const nextClassroom = await db
        .collection("classrooms")
        .find({ customId: nextClassroomId })
        .project({ _id: 1, students: 1 })
        .toArray();

      if (!user || !prevClassroom || !nextClassroom) {
        throw new Error(`Missing value for "user", "prevClass `);
      }

      // Update user data
      const userClassrooms = user[0].classrooms;
      await db
        .collection("users")
        .updateOne(
          { customId: studentCustomId },
          { $set: { classrooms: [...userClassrooms, nextClassroomId] } }
        );

      // Add to destination classroom
      const userId = user[0]._id;
      await db
        .collection("classrooms")
        .updateOne(
          { customId: nextClassroomId },
          { $set: { students: [...nextClassroom[0].students, userId] } }
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
