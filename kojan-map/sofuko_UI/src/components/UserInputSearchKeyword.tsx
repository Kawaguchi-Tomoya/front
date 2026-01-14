import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function KeywordInput({ value, onChange }: Props) {
  return (
    <div className="relative p-2">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        placeholder="キーワード検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}