import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import Measurement from "@/infrastructure/database/mongo-measurement.database";
import { Measurement as MeasurementType } from "@/domain/model/Measurement";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { measurements: MeasurementType[] } | { message: string }
  >
) {
  await dbConnect();

  if (req.method === "GET") {
    const { dateFrom, dateTo } = req.query;
    try {
      console.log(dateFrom);
      console.log(dateTo);

      const measurements = await Measurement.find({
        createdAt: {
          $gte: new Date(dateFrom as string),
          $lt: dateTo
            ? new Date(dateTo as string)
            : new Date(
                new Date(dateFrom as string).getTime() + 24 * 60 * 60 * 1000
              ),
        },
      }).sort({ createdAt: 1 });

      return res.status(200).json({ measurements });
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
