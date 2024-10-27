'use client'

// 导入必要的React钩子和UI组件
import { useState, useCallback } from 'react'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Label from './components/ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/Card'
import ScrollArea from './components/ui/ScrollArea'

// 模拟API调用的函数，用于获取邮件列表
// 在实际应用中，这个函数会被替换为真实的API调用
const fetchEmails = async (email: string, password: string) => {
  // 使用Promise和setTimeout来模拟网络请求的延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 返回一个模拟的邮件列表
  return [
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
  ]
}

// 定义并导出主要的React组件
export default function Component() {
  // 使用useState钩子来管理组件的状态
  // 管理邮箱地址输入
  const [email, setEmail] = useState('')
  // 管理密码输入
  const [password, setPassword] = useState('')
  // 管理获取到的邮件列表
  const [emails, setEmails] = useState<Array<{ id: number, subject: string }>>([])
  // 管理加载状态
  const [loading, setLoading] = useState(false)
  // 管理错误信息
  const [error, setError] = useState<string | null>(null)

  // 使用useCallback钩子来优化性能，避免不必要的函数重新创建
  // 处理表单提交的函数
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 设置加载状态为true，显示加载中
    setLoading(true)
    // 清除之前的错误信息
    setError(null)
    try {
      // 调用fetchEmails函数获取邮件列表
      const fetchedEmails = await fetchEmails(email, password)
      // 更新邮件列表状态
      setEmails(fetchedEmails)
    } catch (err) {
      // 如果发生错误，设置错误信息
      setError('登录失败，请检查您的邮箱和密码')
    } finally {
      // 无论成功还是失败，都将加载状态设置为false
      setLoading(false)
    }
  }, [email, password]) // 这个函数依赖于email和password状态

  // 返回JSX，定义组件的UI结构
  return (
    <div className="container mx-auto p-4">
      {/* 登录表单卡片 */}
      <Card className="w-full max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>邮箱登录</CardTitle>
          <CardDescription>请输入您的邮箱地址和密码</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 邮箱输入框 */}
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* 密码输入框 */}
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* 登录按钮 */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 错误信息显示 */}
      {error && (
        <Card className="w-full max-w-md mx-auto mb-8">
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* 邮件列表显示 */}
      {emails.length > 0 && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>邮件列表</CardTitle>
            <CardDescription>您有 {emails.length} 封未读邮件</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 使用ScrollArea组件创建可滚动的区域 */}
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {/* 邮件列表 */}
              <ul className="space-y-4">
                {/* 使用map函数遍历邮件数组，为每个邮件创建一个列表项 */}
                {emails.map((email) => (
                  <li key={email.id} className="flex items-center space-x-4">
                    {/* 蓝色圆点，表示未读邮件 */}
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    {/* 邮件主题 */}
                    <span className="flex-1 text-sm font-medium">{email.subject}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}