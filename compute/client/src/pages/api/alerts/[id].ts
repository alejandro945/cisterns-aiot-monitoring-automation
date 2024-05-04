import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import Alert from "@/infrastructure/database/mongo-alerts-database";
import { Types } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: boolean } | { message: string }>
) {
  await dbConnect();

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const idToString = id?.toString(); // Convierte el ObjectId a una cadena
      if (!idToString) {
        return res.status(400).json({ message: "ID no proporcionado" });
      }

      const idIsValid = Types.ObjectId.isValid(idToString);
      console.log(idIsValid);

      const test = new Types.ObjectId(idToString);
      console.log(test);

      const alert = await Alert.find({});
      console.log(alert);

      alert.map((a) => {
        if (a._id.toString() === idToString) {
          const alertDelete = Alert.deleteOne({ _id: a._id });
        }
      });

      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error al obtener la información" });
    }
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}
