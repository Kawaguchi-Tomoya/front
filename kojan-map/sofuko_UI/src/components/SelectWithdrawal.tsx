import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { DisplayUserSetting } from './DisplayUserSetting';

interface SelectWithdrawalProps {
  onNavigateToDeleteAccount: () => void;
}

export function SelectWithdrawal({ onNavigateToDeleteAccount }: SelectWithdrawalProps) {
  return (
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
  );
}