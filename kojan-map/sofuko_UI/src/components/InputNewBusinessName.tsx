import { useState } from 'react';
import { Button } from './ui/button';

interface InputNewBusinessNameProps {
  initialValue: string;
  onSave: (newName: string) => void;
  onCancel: () => void;
}

export function InputNewBusinessName({ 
  initialValue, 
  onSave, 
  onCancel 
}: InputNewBusinessNameProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex items-center space-x-2">
      <input 
        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <Button 
        size="sm" 
        onClick={() => onSave(value)}
        disabled={!value.trim()}
      >
        保存
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={onCancel}
      >
        キャンセル
      </Button>
    </div>
  );
}