import { Button } from './ui/button';
import { toast } from 'sonner';

interface SelectBlockProps {
  userId: string;
  onBlockUser: (userId: string) => void;
  onClose: () => void;
}

export function SelectBlock({ userId, onClose }: { userId: string; onClose: () => void }) {
  // 1. 関数の前に "async" を追加
  const handleBlock = async () => {
    const isConfirmed = confirm('このユーザーをブロックしますか？');

    if (isConfirmed) {
      try {
        // 2. ここで await が使えるようになります
        const response = await fetch('http://localhost:8080/api/block', { // URLをフルパスにする
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (!response.ok) {
          throw new Error('通信エラー');
        }

        toast.success('ユーザーをブロックしました');
        onClose();
      } catch (error) {
        console.error(error);
        toast.error('ブロック処理に失敗しました');
      }
    }
  };

  return (
    <Button
      onClick={handleBlock}
      variant="destructive"
    >
      ブロック
    </Button>
  );
}