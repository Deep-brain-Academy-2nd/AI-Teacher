import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

// 강의 추가 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { name, email, password, auth } = req.body;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
