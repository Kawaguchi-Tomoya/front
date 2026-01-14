// ChangeBusinessNameScreen.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { User } from '../types';
import { InputNewBusinessName } from './InputNewBusinessName';

interface ChangeBusinessNameScreenProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export function ChangeBusinessNameScreen({ 
  user, 
  onUpdateUser 
}: ChangeBusinessNameScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newName: string) => {
    onUpdateUser({ ...user, name: newName });
    setIsEditing(false);
  };

  return (
    <div>
      <p className="text-sm text-gray-600">店舗・事業者名</p>
      {isEditing ? (
        <InputNewBusinessName 
          initialValue={user.name || ''} 
          onSave={handleSave} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <div className="flex items-center space-x-2">
          <p className="font-medium">{user.name}</p>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            編集
          </Button>
        </div>
      )}
    </div>
  );
}