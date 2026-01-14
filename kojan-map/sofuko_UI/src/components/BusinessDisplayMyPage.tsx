import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User, Pin } from '../types';
import { SelectPostHistory } from './SelectPostHistory';
import { SelectUserSetting } from './SelectUserSetting';
import { ChangeBusinessNameScreen } from './ChangeBusinessNameScreen';
import { ChangeBusinessIconScreen } from './ChangeBusinessIconScreen';

interface BusinessDisplayMyPageProps {
  user: User;
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  onDeletePin: (pinId: string) => void;
  onUpdateUser: (user: User) => void;
  onNavigateToDeleteAccount: () => void;
}

export function BusinessDisplayMyPage({ 
  user, pins, onPinClick, onDeletePin, onUpdateUser, onNavigateToDeleteAccount 
}: BusinessDisplayMyPageProps) {

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /* handleIconUploadは削除 */

  /* handleSaveIconは削除 */

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>事業者マイページ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* 事業者名変更 */}
              <ChangeBusinessNameScreen 
                user={user} 
                onUpdateUser={onUpdateUser} 
              />
              <div>
                <p className="text-sm text-gray-600">アカウント種別</p>
                <Badge>事業者</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">メールアドレス</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">登録日</p>
                <p>{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アイコン設定 */}
        <ChangeBusinessIconScreen user={user} onUpdateUser={onUpdateUser} />

        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">投稿履歴 ({pins.length})</TabsTrigger>
            <TabsTrigger value="settings">設定</TabsTrigger>
          </TabsList>
          {/* 投稿一覧 */}
          <TabsContent value="posts" className="space-y-4">
            <SelectPostHistory 
                pins={pins} 
                onPinClick={onPinClick} 
                onDeletePin={onDeletePin} 
            />
          </TabsContent>
          {/* 設定 */}
          <TabsContent value="settings" className="space-y-4">
            <SelectUserSetting 
                user={user}
                onUpdateUser={onUpdateUser}
                onNavigateToDeleteAccount={onNavigateToDeleteAccount}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}