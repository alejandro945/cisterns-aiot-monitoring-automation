import { NextApiRequest, NextApiResponse } from "next";
import User from "@/infrastructure/database/mongo-users.database";
import {User as UserType} from "@/domain/model/User"
import { dbConnect } from "@/infrastructure/database/mongo-client.database";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string, user: UserType } | { message: string }>
) {
  await dbConnect();

  if (req.method === 'POST') {
      const { username, password } = req.body;
      console.log("Api de autenticacion")
      try {
          // Verificar si el usuario existe en la base de datos
          const user = await User.findOne({ email: username });

          if (!user || user.password !== password) {
              return res.status(401).json({ message: 'Credenciales inválidas' });
          }

          // Si el usuario existe y las contraseñas coinciden, generar un token JWT
          const token = generateToken(user);

          // Enviar el token JWT y el usuario en la respuesta
          return res.status(200).json({ token, user });

      } catch (error) {
          console.error('Error de autenticación:', error);
          return res.status(500).json({ message: 'Error de autenticación' });
      }
  } else {
      return res.status(405).json({ message: 'Método no permitido' });
  }
}
  function generateToken(user: any): string {
    // Implementa la lógica para generar un token JWT para el usuario dado
    // Aquí te dejo un ejemplo simple utilizando el paquete jsonwebtoken
    const jwt = require('jsonwebtoken');
    const secret = process.env.NEXTAUTH_SECRET; // Debes reemplazarlo con tu propia clave secreta
    const token = jwt.sign({ userId: user._id.toString() }, secret, { expiresIn: '5h' }); // Caducidad en 5 horas
    return token;
  }