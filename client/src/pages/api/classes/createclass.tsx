import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import auths from "../auths";
import Class from "../../../models/class";

// 강의 추가 API
export default auths(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  const post = req.body;

  const newClass = new Class({
    ...post,
    id: req.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  switch (method) {
    case "POST":
      try {
        await newClass.save();
        res.status(201).json(newClass);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "why" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
