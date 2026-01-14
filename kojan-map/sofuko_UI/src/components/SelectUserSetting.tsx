import { useState, useEffect } from 'react';
import { User } from '../types';
import { Button } from './ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { DisplayUserSetting } from './DisplayUserSetting';
import { SelectUnlock } from './SelectUnlock'; 
import { SelectWithdrawal } from './SelectWithdrawal';

interface SelectUserSettingProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onNavigateToDeleteAccount: () => void;
}

export function SelectUserSetting({ 
  onNavigateToDeleteAccount 
}: SelectUserSettingProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      {/* ブロック設定セクション */}
      <DisplayUserSetting 
        title="ブロック中のユーザー" 
        description="ブロックを解除すると、相手からのメッセージや投稿が再び表示されます。"
      >
        <SelectUnlock 
          user={user} 
          onUpdateUser={(updated) => setUser(updated)} 
        />
      </DisplayUserSetting>

      {/* 退会設定セクション SelectWithdrawal.tsxに移行*/}
      <SelectWithdrawal 
        onNavigateToDeleteAccount={onNavigateToDeleteAccount} 
      />
    </div>
  );
}