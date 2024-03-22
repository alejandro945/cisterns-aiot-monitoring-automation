import { NextApiRequest, NextApiResponse } from "next";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{message: string}>
  ) {
    res.status(200).json({ message: 'Hello from Next.js!' })
  }