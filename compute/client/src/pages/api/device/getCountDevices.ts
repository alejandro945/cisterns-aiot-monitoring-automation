import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import Device from "@/infrastructure/database/mongo-devices.database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ count: Number } | { message: string }>
) {
  await dbConnect();

  if (req.method === "GET") {
    const { active } = req.query;
    try {
      let count = 0;
      if (active === "true") {
        count = await Device.countDocuments({ status: true });
      } else {
        count = await Device.countDocuments({});
      }
      return res.status(200).json({ count });
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
