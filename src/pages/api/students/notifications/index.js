import { connectToDatabase } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method === "GET") {
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

      if (!session) {
        throw new Error("No session found.");
      }

      const classrooms = session?.user?.classrooms;

      if (!classrooms) {
        throw new Error("Student not part of any classroom.");
      }

      const notifications = await db
        .collection("notifications")
        .aggregate(getNofificationsPipeline(classrooms))
        .limit(30)
        .toArray();

      client.close();
      return res.status(200).json({ notifications });
    } catch (error) {
      client?.close();
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;

const getNofificationsPipeline = (classrooms) => [
  { $match: { classroom: { $in: classrooms } } },
  {
    $lookup: {
      from: "users",
      localField: "teacher",
      foreignField: "email",
      as: "teacher",
      pipeline: [
        {
          $project: {
            firstName: 1,
            lastName: 1,
            _id: 0,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: "classrooms",
      localField: "classroom",
      foreignField: "customId",
      as: "classroomName",
      pipeline: [
        {
          $project: {
            _id: 0,
            grade: 1,
            division: 1,
            year: 1,
          },
        },
      ],
    },
  },
  {
    $project: {
      _id: 1,
      message: 1,
      createdAt: 1,
      classroomName: {
        $concat: [
          { $arrayElemAt: ["$classroomName.grade", 0] },
          " ",
          { $arrayElemAt: ["$classroomName.division", 0] },
          " ",
          { $arrayElemAt: ["$classroomName.year", 0] },
        ],
      },
      teacher: {
        $concat: [
          { $arrayElemAt: ["$teacher.firstName", 0] },
          " ",
          { $arrayElemAt: ["$teacher.lastName", 0] },
        ],
      },
    },
  },
  { $sort: { createdAt: -1 } },
];
