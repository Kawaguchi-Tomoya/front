import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageIcon } from 'lucide-react';
import { User } from '../types';
import { toast } from 'sonner';
import { InputNewBusinessIcon } from './InputNewBusinessIcon';

interface ChangeBusinessIconScreenProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export function ChangeBusinessIconScreen({ 
  user, 
  onUpdateUser 
}: ChangeBusinessIconScreenProps) {
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    if (!previewIcon) return;
    
    setIsUploading(true);
    try {
      await onUpdateUser({ ...user, businessIcon: previewIcon });
      toast.success('アイコンを更新しました');
      setPreviewIcon(null);
    } catch (error) {
      toast.error('更新に失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>事業者アイコン設定</CardTitle>
        <CardDescription>地図上のピンに表示されるアイコン</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-6">
          {/* 現在または選択中のアイコンプレビュー */}
          <div className="w-32 h-32 rounded-lg border-2 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
            {previewIcon || user.businessIcon ? (
              <img 
                src={previewIcon || user.businessIcon} 
                alt="Icon Preview" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <ImageIcon className="text-gray-400 w-10 h-10" />
            )}
          </div>

          <div className="flex-1 space-y-3">
            {/* アップロードコンポーネント */}
            <InputNewBusinessIcon onImageSelect={setPreviewIcon} />

            {/* 保存・キャンセルボタン (プレビューがある時のみ表示) */}
            {previewIcon && (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSave} 
                  disabled={isUploading} 
                  className="flex-1"
                >
                  {isUploading ? '保存中...' : 'アイコンを保存'}
                </Button>
                <Button 
                  onClick={() => setPreviewIcon(null)} 
                  variant="outline"
                  disabled={isUploading}
                >
                  キャンセル
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}