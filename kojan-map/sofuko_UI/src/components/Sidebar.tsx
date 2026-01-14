import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Pin, PinGenre, User } from '../types';
import { genreLabels, genreColors } from '../lib/mockData';

interface SidebarProps {
  user: User;
  pins: Pin[];
  onFilterChange: (filteredPins: Pin[]) => void;
  onCreatePin: () => void;
  onPinClick: (pin: Pin) => void;
}

export function Sidebar({ user, pins, onFilterChange, onCreatePin, onPinClick }: SidebarProps) {
  // キーワード検索用のStateを削除
  const [selectedGenre, setSelectedGenre] = useState<PinGenre | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'reactions' | 'distance'>('date');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    // 事業者ユーザーの場合、絞り込み機能を無効化
    if (user.role === 'business') {
      onFilterChange([...pins]);
      return;
    }

    let filtered = [...pins];

    // 【削除】キーワード検索のフィルタリングロジック

    // ジャンルフィルター
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(pin => pin.genre === selectedGenre);
    }

    // 日付フィルター
    const now = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(pin => {
        const pinDate = new Date(pin.createdAt);
        return pinDate.toDateString() === now.toDateString();
      });
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(pin => new Date(pin.createdAt) >= weekAgo);
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(pin => new Date(pin.createdAt) >= monthAgo);
    }

    onFilterChange(filtered);
    // 依存配列から searchKeyword を削除
  }, [selectedGenre, sortBy, dateFilter, pins, onFilterChange]);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'たった今';
    } else if (diffHours < 24) {
      return `${diffHours}時間前`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}日前`;
    }
  };

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
      {/* フィルターエリア */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        {user.role !== 'business' && (
          <div className="grid grid-cols-2 gap-2">
            {/* 【削除】キーワード入力の Input フィールド */}

            <Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value as PinGenre | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="ジャンル" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全ジャンル</SelectItem>
                {Object.entries(genreLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={(value) => setDateFilter(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="期間" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全期間</SelectItem>
                <SelectItem value="today">今日</SelectItem>
                <SelectItem value="week">1週間</SelectItem>
                <SelectItem value="month">1ヶ月</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* ピンリスト */}
      <div className="flex-1 overflow-y-auto">
        {pins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>該当する投稿が見つかりませんでした</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pins.map((pin) => (
              <button
                key={pin.id}
                onClick={() => onPinClick(pin)}
                className="w-full p-4 hover:bg-gray-50 text-left transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="flex-1 text-gray-900">{pin.title}</h3>
                  <Badge 
                    style={{ backgroundColor: genreColors[pin.genre] }}
                    className="ml-2"
                  >
                    {genreLabels[pin.genre]}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{pin.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{pin.userRole === 'business' ? pin.businessName : '匿名'}</span>
                  <div className="flex items-center space-x-3">
                    <span>❤️ {pin.reactions}</span>
                    <span>{formatDate(pin.createdAt)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}