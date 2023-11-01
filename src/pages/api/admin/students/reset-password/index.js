import { connectToDatabase } from "@/src/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { studentId: customId } = req.body;

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

    // Reset password
    try {
      await db.collection("users").updateOne(
        { customId },
        {
          $set: {
            hashedPassword:
              "$2a$12$8nXCebHKKScG9/rCxv6L5.iNMRxl4hBufQJA//p0XLAO/vCn2Dy.a",
          },
        }
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
