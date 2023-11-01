import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    const { prevClassroomId, nextClassroomId, studentId } = req.body;

    if (!prevClassroomId || !nextClassroomId || !studentId) {
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
        .find({ customId: studentId })
        .project({ _id: 1 })
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
        client.close();
        throw new Error(`Missing value for "user", "prevClass `);
      }

      // Change user data
      await db
        .collection("users")
        .updateOne(
          { customId: studentId },
          { $set: { classroom: nextClassroomId } }
        );

      // Add to destination classroom
      const userId = user[0]._id;
      await db
        .collection("classrooms")
        .updateOne(
          { customId: nextClassroomId },
          { $set: { students: [...nextClassroom[0].students, userId] } }
        );

      // Remove from origin classroom
      const prevFilteredStudents = prevClassroom[0].students.filter(
        (i) => i.toString() !== userId.toString()
      );

      await db.collection("classrooms").updateOne(
        { customId: prevClassroomId },
        {
          $set: {
            students: prevFilteredStudents,
          },
        }
      );

      client.close();
      return res
        .status(200)
        .json({ user, prevClassroom, nextClassroom, isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
