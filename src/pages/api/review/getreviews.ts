import dbConnect from '../../../utils/dbConnect';
import Review from '../../../models/review';
import { NextApiRequest, NextApiResponse } from 'next';

// 리뷰 리스트 가져오는 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;
  // 요청으로 받은 id 입니다.
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        // 해당 강의 아이디를 가지고있는 리뷰를 테이블에서 찾아와 뿌려줍니다.
        let reviewList = await Review.find({ lectureId: id });
        res.status(201).json({ data: reviewList });
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
