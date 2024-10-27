import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simulate fetching emails
  const emails = [
    { id: 1, subject: "欢迎使用新邮箱系统" },
    { id: 2, subject: "您的账单已到期" },
    { id: 3, subject: "新产品发布通知" },
    { id: 4, subject: "周末特惠活动" },
    { id: 5, subject: "安全警告：请更新您的密码" },
    { id: 6, subject: "您的订阅即将到期" },
    { id: 7, subject: "新的工作机会" },
    { id: 8, subject: "系统维护通知" },
    { id: 9, subject: "您的包裹已发货" },
    { id: 10, subject: "重要：账户安全信息" },
  ];

  res.status(200).json(emails);
}
