import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import Device from "@/infrastructure/database/mongo-device-database";
import { Device as DeviceType } from "@/domain/model/Device";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ devices: DeviceType[] } | { message: string }>
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const devices = await Device.find({});

      return res.status(200).json({ devices });
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
