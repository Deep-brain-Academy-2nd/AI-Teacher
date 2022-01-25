import jwt, { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// 유저 인증인가 해주는 미들웨어
const auths =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      /* @ts-ignore */
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      console.log(token);
      let decodedData;
      // 토큰을 받아와 jwt를 통해 확인을 진행합니다.
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, "test");
        /* @ts-ignore */
        req.userId = decodedData?.id;
      } else {
        // jwt를 통해 디코드 한 값을 req.userId에 저장해둡니다.
        decodedData = jwt.decode(token);
        /* @ts-ignore */
        req.userId = decodedData?.sub;
      }

      return await fn(req, res);
    } catch (error) {
      // 이상한 토큰이나 토큰이 없을시 에러를 내보냅니다.
      res.status(500).json({ message: "Sorry you are not authenticated" });
    }
  };

export default auths;
