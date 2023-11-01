import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    const { prevClassroomId, nextClassroomId } = req.body;

    if (!prevClassroomId || !nextClassroomId) {
      return res.status(422).json({
        error: `Missing required values for "prevClassroomId" or "nextClassroomId"`,
      });
    }

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
      // Check if classrooms exist
      const prevClassroom = await db
        .collection("classrooms")
        .findOne({ customId: prevClassroomId });
      const nextClassroom = await db
        .collection("classrooms")
        .findOne({ customId: nextClassroomId });

      if (!prevClassroom || !nextClassroom) {
        throw new Error(
          "Origin classroom or destination classroom not found in database."
        );
      }

      // Add students to destination
      await db.collection("classrooms").updateOne(
        { customId: nextClassroomId },
        {
          $set: {
            students: [...nextClassroom.students, ...prevClassroom.students],
          },
        }
      );

      // Remove students from origin
      await db
        .collection("classrooms")
        .updateOne({ customId: prevClassroomId }, { $set: { students: [] } });

      // Change students classroomId
      await db
        .collection("users")
        .updateMany(
          { classroom: prevClassroomId },
          { $set: { classroom: nextClassroomId } }
        );

      client.close();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      client.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
