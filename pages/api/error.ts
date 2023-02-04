import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "John Doe", age: null });
};

export default handler;
