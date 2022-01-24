import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import auths from "../auths";
import Review from "../../../models/review";

// 리뷰 추가 API
export default auths(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  const review = req.body;

  const newReview = new Review({
    ...review,
    userId: req.userId,
  });

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  switch (method) {
    case "POST":
      try {
        await newReview.save();
        res.status(201).json({ data: newReview });
      } catch (error) {
        res.status(400).json({ message: "response failed" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
