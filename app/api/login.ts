import { NextApiRequest, NextApiResponse } from 'next';
import handler from './email_login';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // Simulate authentication
  if (email === 'user@example.com' && password === 'password123') {
    // Call the email_login handler
    const emailLoginResponse = await new Promise((resolve, reject) => {
      const mockRes = {
        status: (statusCode: number) => ({
          json: (data: any) => resolve({ statusCode, data }),
        }),
      };
      handler(req, mockRes as unknown as NextApiResponse);
    });

    const { statusCode, data } = emailLoginResponse as { statusCode: number; data: any };

    if (statusCode === 200) {
      res.status(200).json({ status: 'success', emails: data });
    } else {
      res.status(statusCode).json({ status: 'error', error: data.error });
    }
  } else {
    res.status(401).json({ status: 'error', error: 'Invalid email or password' });
  }
}
