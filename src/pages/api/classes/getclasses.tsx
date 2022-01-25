import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import auths from '../auths';
import Class from '../../../models/class';
import Like from '../../../models/like';

// 모든 강의 리스트 가져오는 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        let classList = await Class.find();

        for (let i = 0; i < classList.length; i++) {
          const likeCount = await Like.count({
            lectureId: classList[i]._id.valueOf(),
          });

          const likeUser = await Like.find({
            lectureId: classList[i]._id.valueOf(),
          });
          const likeArray = likeUser?.map((item) => item.userId);

          await Class.findByIdAndUpdate(
            classList[i]._id,
            { like: likeCount, likeUser: likeArray },
            { new: true }
          );
        }

        classList = await Class.find();
        res.status(201).json({ data: classList });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'failed' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
