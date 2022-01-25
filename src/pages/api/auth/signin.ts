import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// 로그인 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { email, password } = req.body;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        // 받은 email 값과 같은 데이터를 데이터베이스에서 찾습니다.
        const existingUser = await User.findOne({ email });

        // db에 email 데이터가 없으면 404에러를 보내줍니다.
        if (!existingUser)
          return res
            .status(404)
            .json({ message: '해당 유저 데이터가 존재하지 않습니다.' });

        // 암호화된 비밀번호와 현재 비밀번호를  비교
        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isPasswordCorrect)
          return res.status(400).json({ message: '비밀번호가 틀립니다.' });

        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          'test',
          { expiresIn: '3600h' }
        );

        res.status(200).json({ result: existingUser, token });
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
