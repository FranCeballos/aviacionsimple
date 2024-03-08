import { connectToDatabase } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { message, classroomId } = req.body;

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
      const session = await getServerSession(req, res, authOptions);
      const { user } = session;

      if (!user.email || !user.isAdmin) {
        throw new Error("Not authorized.");
      }

      const dateNow = Date.now();
      const formattedDate = new Date(dateNow);

      const newNotification = {
        message,
        classroom: classroomId,
        teacher: user.email,
        createdAt: formattedDate,
      };

      await db.collection("notifications").insertOne(newNotification);

      client.close();
      return res.status(200).json({ isSuccess: true, newNotification });
    } catch (error) {
      client?.close();
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
