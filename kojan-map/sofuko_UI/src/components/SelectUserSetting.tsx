import { useState, useEffect } from 'react';
import { User } from '../types';
import { Button } from './ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { DisplayUserSetting } from './DisplayUserSetting';
import { UserBlockViewScreen } from './UserBlockViewScreen';

interface SelectUserSettingProps {
  onNavigateToDeleteAccount: () => void;
}

export function SelectUserSetting({ 
  onNavigateToDeleteAccount 
}: SelectUserSettingProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. コンポーネントマウント時にバックエンドからデータを取得
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/blocks');
        if (!response.ok) throw new Error('ネットワークエラー');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("ユーザーデータの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 2. ブロック解除の更新処理
  const handleUpdateUser = async (updatedUser: User) => {
    // 楽観的UI更新（先に画面を更新してサクサク動かす）
    const previousUser = user;
    setUser(updatedUser);

    try {
      // 実際にはここでバックエンドに保存リクエストを送る
      // 例: await fetch('/api/user/update', { method: 'POST', body: JSON.stringify(updatedUser) });
      console.log("サーバーに保存されました:", updatedUser.blockedUsers);
    } catch (error) {
      console.error("更新に失敗しました:", error);
      setUser(previousUser); // 失敗したら元に戻す
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) return <div>データの読み込みに失敗しました。</div>;

  return (
    <div className="space-y-4">
      {/* 抽出したブロックリスト表示コンポーネント */}
      <UserBlockViewScreen 
        user={user} 
        onUpdateUser={handleUpdateUser} 
      />

      {/* 退会設定 */}
      <DisplayUserSetting 
        title="退会" 
        description="アカウントの削除"
        className="border-red-200"
        titleClassName="text-red-600"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            アカウントを削除すると、すべての投稿とデータが完全に削除されます。この操作は取り消せません。
          </p>
          <Button variant="destructive" onClick={onNavigateToDeleteAccount}>
            <Trash2 className="w-4 h-4 mr-2" />
            アカウント削除画面へ
          </Button>
        </div>
      </DisplayUserSetting>
    </div>
  );
}