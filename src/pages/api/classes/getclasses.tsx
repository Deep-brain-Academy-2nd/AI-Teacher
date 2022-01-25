import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import auths from "../auths";
import Class from "../../../models/class";
import Like from "../../../models/like";

// 모든 강의 리스트 가져오는 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const classList = await Class.find();
        classList.map((item) => {
          const likeCount = Like.count({
            lectureId: item._id.valueOf(),
          });

          Class.findByIdAndUpdate(
            item._id,
            { like: likeCount, likeUser: [] },
            { new: true }
          );
        });
        // for (let i = 0; i < classList.length; i++) {

        // const likeUser =  Like.find({
        //   lectureId: classList[i]._id.valueOf(),
        // });
        // const likeArray = likeUser?.map((item) => item.userId);

        // }

        // classList = await Class.find();
        res.status(201).json({ data: classList });
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
