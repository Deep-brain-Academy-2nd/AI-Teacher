import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const response = await fetch(
      `https://dev.aistudios.com/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9`,
      {
        // headers: {
        //   Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        // },
      }
    );
    console.log(response);
    // const { records } = await response.json();

    // res.status(200).json({ records });

    return;
  }
};
