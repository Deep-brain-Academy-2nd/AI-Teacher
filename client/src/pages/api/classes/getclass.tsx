import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import auths from '../auths';
import Class from '../../../models/class';

// 강의 상세 내용 가져오는 API
export default auths(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const classDetails = await Class.findById(id);
        res.status(200).json({ data: classDetails });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'failed' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
