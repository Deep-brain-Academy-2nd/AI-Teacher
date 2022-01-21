import jwt, { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// wants to like a post
// click the like button => auth middleware(next) => like controller...
const auths =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, 'test');

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;
      }

      return await fn(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Sorry you are not authenticated' });
    }
  };

export default auths;
