import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/user';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// 회원가입 API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { name, email, password, auth } = req.body;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        // 유저 중복 체크
        const existingUser = await User.findOne({ email });

        // 유저 데이터가 이미 있는 상태라면 400에러를 내보낸다.
        if (existingUser)
          return res.status(400).json({ message: 'User already exists' });

        // 비밀번호 비크립트 써서 암호화
        const hashedPassword = await bcrypt.hash(password, 12);

        // 위에 validation을 통과하면 id,name,auth,email,암호화된 password, 생성시간, 업데이트된 시간을 담아 데이터베이스에 저장
        const user = await User.create({
          id: nanoid(),
          name,
          email,
          // auth,
          password: hashedPassword,
          created: new Date(),
          updated: new Date(),
        });

        // 해당 유저의 토큰 발행
        const token = jwt.sign({ email: user.email, id: user.id }, 'test', {
          expiresIn: '3600h',
        });

        // 통신 성공시 데이터에 user값과 토큰을 담아 보내준다.
        res.status(201).json({ success: true, token });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
