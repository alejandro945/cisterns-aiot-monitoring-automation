import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import Alert from "@/infrastructure/database/mongo-alerts.database";

interface AlertsCount {
  _id: string;
  count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ amountAlerts: AlertsCount[] } | { message: string }>
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const alerts: never[] = await Alert.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
      ]);

      return res.status(200).json({ amountAlerts: alerts });
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
