import { connectToDatabase } from "@/lib/db";
const handler = async (req, res) => {
  if (req.method === "GET") {
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      return res.status(500).json({
        error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
    }
    const db = client.db();

    let classrooms;
    try {
      classrooms = await db
        .collection("classrooms")
        .find({})
        .project({ students: 0, subjects: 0 })
        .sort({ gradeNum: 1 })
        .toArray();
      client.close();
      return res.status(200).json({ classrooms });
    } catch (error) {
      return res.status(500).json({
        error: "Fallo al conectar con la base de datos! Pruebe en un minuto",
      });
    }
  }

  if (req.method === "POST") {
    const { grade, division, year } = req.body;
    if (!grade || !division || !year) {
      return res.status(422).json({
        error:
          "You need to select grade, division and year. Something might not be selected.",
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
    const customId = `${grade}${division}${year}`;

    try {
      const existingClassroom = await db
        .collection("classrooms")
        .find({ customId })
        .project({ _id: 1 })
        .toArray();

      if (existingClassroom[0]) {
        throw new Error("El curso ya está creado.");
      }
    } catch (error) {
      client.close();
      return res.status(422).json({ error: error.message });
    }

    try {
      const newClassroom = {
        customId,
        grade,
        gradeNum: parseFloat(grade[0]),
        division,
        year,
        students: [],
        subjects: [],
      };
      await db.collection("classrooms").insertOne(newClassroom);

      client.close();
      return res
        .status(200)
        .json({ message: "Curso creado", classroom: newClassroom });
    } catch (error) {
      client.close();
      return res.status(error.status).json({ error: error.message });
    }
  }
};

export default handler;
