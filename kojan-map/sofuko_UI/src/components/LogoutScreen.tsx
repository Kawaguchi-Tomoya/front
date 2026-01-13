import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LogOut } from 'lucide-react';

// 必要な情報（メールアドレスと会員区分）のみに限定
interface User {
  email: string;
  role: 'business' | 'general';
}

interface LogoutScreenProps {
  user: User;
  onLogout: () => void;
}

export function LogoutScreen({ user, onLogout }: LogoutScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="max-w-md w-full space-y-6">
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2 text-blue-600">
              <LogOut className="w-12 h-12" />
            </div>
            <CardTitle className="text-xl">ログアウトの確認</CardTitle>
            <CardDescription>
              ログアウトして情報を更新しますか？
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* ログイン情報：メールと会員区分のみを表示 */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-gray-500">会員区分</span>
                <span className="font-medium">
                  {user.role === 'business' ? 'ビジネス会員' : '一般会員'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">メールアドレス</span>
                <span className="font-medium">{user.email}</span>
              </div>
            </div>

            <Button
              variant="default"
              onClick={onLogout}
              className="w-full py-6 text-lg font-bold"
            >
              ログアウトする
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}