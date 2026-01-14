import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface InputNewBusinessIconProps {
  onImageSelect: (base64Image: string) => void;
}

export function InputNewBusinessIcon({ onImageSelect }: InputNewBusinessIconProps) {
  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    // 5MB 制限
    if (file.size > 5 * 1024 * 1024) {
      toast.error('5MB以下にしてください');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
      <label htmlFor="icon-upload" className="cursor-pointer block">
        <Upload className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">画像を選択 (最大5MB)</p>
        <input 
          id="icon-upload" 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleIconUpload} 
        />
      </label>
    </div>
  );
}