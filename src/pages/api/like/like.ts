import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import auths from '../auths';
import Class from '../../../models/class';
import Like from '../../../models/like';
import e from 'cors';
import like from '../../../models/like';

// 강의 추가 API
export default auths(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  const post = req.body;

  const newLike = new Like({
    ...post,
    /* @ts-ignore */
    userId: req.userId,
    status: true,
    createdAt: new Date(),
  });
  /* @ts-ignore */
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  switch (method) {
    case 'POST':
      try {
        let likeList = await Like.find({ lectureId: post.lectureId });
        if (likeList.length > 0) {
          const likeExist = likeList.filter(
            /* @ts-ignore */
            (user) => user.userId === req.userId
          );
          if (likeExist.length > 0) {
            await Like.findByIdAndDelete(likeExist[0]._id);
          } else {
            await newLike.save();
          }
        } else {
          await newLike.save();
        }

        res.status(201).json({ status: likeList });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'response failed' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
