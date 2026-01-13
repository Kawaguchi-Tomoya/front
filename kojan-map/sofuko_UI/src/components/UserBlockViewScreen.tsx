import { User } from '../types';
import { Button } from './ui/button';
import { UserX } from 'lucide-react';
import { DisplayUserSetting } from './DisplayUserSetting';

interface UserBlockViewScreenProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export function UserBlockViewScreen({ 
  user, 
  onUpdateUser 
}: UserBlockViewScreenProps) {
  
  const handleUnblock = (userId: string) => {
    const next = (user.blockedUsers || []).filter(id => id !== userId);
    onUpdateUser({ ...user, blockedUsers: next });
  };

  return (
    <div className="space-y-4">
      <DisplayUserSetting 
        title="ブロックリスト" 
        description="ブロックしたユーザーの管理"
      >
        {(!user.blockedUsers || user.blockedUsers.length === 0) ? (
          <p className="text-gray-500 text-sm">ブロックしたユーザーはいません</p>
        ) : (
          <div className="space-y-2">
            {user.blockedUsers.map((userId) => (
              <div key={userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <UserX className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">ユーザーID: {userId}</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleUnblock(userId)}>
                  ブロック解除
                </Button>
              </div>
            ))}
          </div>
        )}
      </DisplayUserSetting>
    </div>
  );
}