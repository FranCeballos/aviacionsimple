import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { studentId, classroomId } = req.body;

    if (!studentId || !classroomId) {
      return res.status(422).json({
        error: `"studentId" and "classroomId" values needed to delete user.`,
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

    try {
      // Delete user from classroom document
      const classroom = await db
        .collection("classrooms")
        .findOne({ customId: classroomId });
      const user = await db
        .collection("users")
        .find({ customId: studentId })
        .project({ _id: 1, classrooms: 1 })
        .toArray();
      const userId = String(user[0]._id);
      const userClassrooms = user[0].classrooms;

      const filteredStudents = classroom.students.filter(
        (user) => user.toString() !== userId
      );

      await db
        .collection("classrooms")
        .updateOne(
          { customId: classroomId },
          { $set: { students: [...filteredStudents] } }
        );

      if (user[0].classrooms.length === 1) {
        // Delete user from Users collection
        await db.collection("users").deleteOne({ customId: studentId });
      } else {
        // Delete classroom from user
        const filteredClassrooms = userClassrooms.filter(
          (classroomCustomId) => classroomCustomId !== classroomId
        );
        await db
          .collection("users")
          .updateOne(
            { customId: studentId },
            { $set: { classrooms: filteredClassrooms } }
          );
      }
      client.close();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
