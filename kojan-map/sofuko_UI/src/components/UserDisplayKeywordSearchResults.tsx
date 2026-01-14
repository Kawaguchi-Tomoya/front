import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { KeywordSearch } from './UserInputSearchKeyword'; // 上記1をインポート

// 独立した型定義
export interface Pin {
  id: string;
  locationId: string;
  genreId: string;
  title: string;
  viewCount: number;
  reactions: number;
  userId: string;
  createdAt: string;
  description: string;
  imageUrl?: string;
}

interface Props {
  allPins: Pin[];
}

export function KeywordSearchFilter({ allPins }: Props) {
  const [keyword, setKeyword] = useState('');
  const [filteredPins, setFilteredPins] = useState<Pin[]>(allPins);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!keyword.trim()) {
        setFilteredPins(allPins);
        return;
      }

      setIsSearching(true);

      // ローカルでのフィルタリング（バックエンド KeywordSearch.go の代用）
      const results = allPins.filter(pin => 
        pin.title.toLowerCase().includes(keyword.toLowerCase()) ||
        pin.description.toLowerCase().includes(keyword.toLowerCase())
      );

      // 通信ラグの演出
      setTimeout(() => {
        setFilteredPins(results);
        setIsSearching(false);
      }, 300);
      
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword, allPins]);

  return (
    <div className="flex flex-col w-full bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-gray-50/50">
        <KeywordSearch 
          onSearch={setKeyword} 
          placeholder="キーワードでデモ検索..."
        />
        {isSearching && (
          <p className="text-[10px] text-blue-500 mt-1 animate-pulse font-medium">
            Goバックエンド通信をシミュレート中...
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto max-h-[600px]">
        {filteredPins.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            該当する投稿は見つかりませんでした
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPins.map(pin => (
              <div key={pin.id} className="p-4 hover:bg-gray-50/80 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-gray-900 leading-snug">{pin.title}</h3>
                  <Badge variant="outline" className="shrink-0">{pin.genreId}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{pin.description}</p>
                <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-400">
                  <span>👁 {pin.viewCount.toLocaleString()}</span>
                  <span>❤️ {pin.reactions.toLocaleString()}</span>
                  <span>{new Date(pin.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}