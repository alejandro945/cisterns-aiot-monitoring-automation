import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import Alert from "@/infrastructure/database/mongo-alerts-database";
import { Alert as AlertType } from "@/domain/model/Alert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ alerts: AlertType[] } | { message: string }>
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const alerts = await Alert.find({}).sort({ timestamp: -1 });

      return res.status(200).json({ alerts });
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
