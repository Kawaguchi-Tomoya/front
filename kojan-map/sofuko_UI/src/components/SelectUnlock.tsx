import { User } from '../types';
import { Button } from './ui/button';

interface SelectUnlockProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export function SelectUnlock({ user, onUpdateUser }: SelectUnlockProps) {
  
  // blockedUser が string 型（IDそのもの）の場合
  const handleUnblock = async (targetUserId: string) => {
    // 1. フィルタリング処理（文字列の比較）
    const updatedBlockedUsers = user.blockedUsers.filter(
      (id) => id !== targetUserId
    );
    
    const updatedUser: User = { ...user, blockedUsers: updatedBlockedUsers };

    const previousUser = user;
    onUpdateUser(updatedUser);

    try {
      const response = await fetch(`http://localhost:8080/api/user/blocks/${targetUserId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('ブロック解除に失敗しました');
    } catch (error) {
      console.error("更新に失敗しました:", error);
      onUpdateUser(previousUser);
    }
  };

  if (user.blockedUsers.length === 0) {
    return <p className="text-sm text-gray-500 p-4">ブロック中のユーザーはいません。</p>;
  }

  return (
    <div className="divide-y divide-gray-100">
      {user.blockedUsers.map((userId) => (
        <div key={userId} className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            {/* 名前が取得できない場合はIDを表示、または別のデータソースが必要 */}
            <span className="font-medium text-sm">ユーザーID: {userId}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUnblock(userId)}
          >
            解除
          </Button>
        </div>
      ))}
    </div>
  );
}