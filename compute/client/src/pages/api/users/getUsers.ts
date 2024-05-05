import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import User from "@/infrastructure/database/mongo-users.database";
import { User as UserType } from "@/domain/model/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ users: UserType[] } | { message: string }>
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find({});

      return res.status(200).json({ users });
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
