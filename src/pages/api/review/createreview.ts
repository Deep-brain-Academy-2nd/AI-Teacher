import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import auths from '../auths';
import Review from '../../../models/review';

// 리뷰 추가 API
export default auths(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  const review = req.body;
  // 받아온 값들을 가지고 새로운 리뷰를 만들어냅니다.
  const newReview = new Review({
    ...review,
    /* @ts-ignore */
    userId: req.userId,
  });

  // 인증된 유저가 아닐시 401에러를 보냅니다.
  /* @ts-ignore */
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  switch (method) {
    case 'POST':
      try {
        // review 테이블에 새로운 리뷰를 저장하고 프론트단으로 그 데이터를 보내줍니다.
        await newReview.save();
        res.status(201).json({ data: newReview });
      } catch (error) {
        res.status(400).json({ message: 'response failed' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
