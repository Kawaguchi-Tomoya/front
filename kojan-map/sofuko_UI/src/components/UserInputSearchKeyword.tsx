import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface KeywordSearchProps {
  onSearch: (keyword: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export function KeywordSearch({ 
  onSearch, 
  initialValue = '', 
  placeholder = 'キーワードで検索...' 
}: KeywordSearchProps) {
  const [keyword, setKeyword] = useState(initialValue);

  useEffect(() => {
    onSearch(keyword);
  }, [keyword, onSearch]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="pl-10 focus-visible:ring-1"
      />
    </div>
  );
}