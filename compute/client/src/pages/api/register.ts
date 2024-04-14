import { NextApiRequest, NextApiResponse } from "next";
import User from "@/infrastructure/database/mongo-users.database";
import { User as UserType } from "@/domain/model/User";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string; user: UserType } | { message: string }>
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashedPass, role: "user" });
        await newUser.save();
        return res.status(200).json({ message: "Usuario creado con éxito" });
      } else {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
    } catch (error) {
      console.error("Error de registro:", error);
      return res.status(500).json({ message: "Error de registro" });
    }
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}