import dbConnect from "../../../utils/dbConnect";
import Review from "../../../models/review";
import { NextApiRequest, NextApiResponse } from "next";

// 리뷰 리스트 가져오는 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        let reviewList = await Review.find({ lectureId: id });
        res.status(201).json({ data: reviewList });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "failed" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
