import { connectToDatabase } from "@/src/lib/db";

const handle = async (req, res) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, classroomId } = req.body;
    const customId = `${lastName.toLowerCase().trim()}${firstName
      .toLowerCase()
      .trim()}`;

    if (!firstName || !lastName || !email || !classroomId) {
      return res.status(422).json({ error: "Some required field is missing." });
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

    // Check if user already exists
    try {
      const userExists = await db.collection("users").findOne({
        customId,
      });

      if (userExists) {
        throw new Error(`El usuario "${firstName} ${lastName}" ya existe.`);
      }
    } catch (error) {
      client.close();
      return res.status(422).json({ error: error.message });
    }

    // Add user
    try {
      const newUser = await db.collection("users").insertOne({
        firstName,
        lastName,
        email,
        customId,
        classrooms: [classroomId],
        isAdmin: false,
        hashedPassword: process.env.DEFAULT_USER_PASSWORD,
      });
      const newUserId = newUser.insertedId;

      const classroom = await db
        .collection("classrooms")
        .find({ customId: classroomId })
        .project({ students: 1 })
        .toArray();
      const studentsIds = classroom[0].students;

      await db
        .collection("classrooms")
        .updateOne(
          { customId: classroomId },
          { $set: { students: [...studentsIds, newUserId] } }
        );

      client.close();
      return res
        .status(200)
        .json({ message: "User created", newUserId, isSuccess: true });
    } catch (error) {
      client.close();
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    const { firstName, lastName, email, studentId } = req.body;

    if (!firstName || !lastName || !email || !studentId) {
      return res.status(422).json({ error: "Some required field is missing." });
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

    // Update student
    try {
      await db
        .collection("users")
        .updateOne(
          { customId: studentId },
          { $set: { firstName, lastName, email } }
        );

      client.close();
      return res.status(200).json({
        message: "Student updated",
        updatedData: { firstName, lastName, email },
        isSuccess: true,
      });
    } catch (error) {
      client?.close();
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handle;
