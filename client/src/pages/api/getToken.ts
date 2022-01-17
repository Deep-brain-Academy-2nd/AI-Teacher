import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await axios.get(
      "https://dev.aistudios.com/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9"
    );
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
};
