import { Heart, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Pin } from '../types';
import { genreColors, genreLabels } from '../lib/mockData';

interface BusinessDisplayTopReactionsProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

export function BusinessDisplayTopReactions({ pins, onPinClick }: BusinessDisplayTopReactionsProps) {
  // リアクション数で降順にソートして上位5件を取得
  const topPosts = [...pins].sort((a, b) => b.reactions - a.reactions).slice(0, 5);

  return (
    <Card className="shadow-xl border-slate-200">
      <CardHeader>
        <CardTitle>人気投稿 Top 5</CardTitle>
        <CardDescription>リアクション数が多い投稿</CardDescription>
      </CardHeader>
      <CardContent>
        {topPosts.length === 0 ? (
          <p className="text-slate-500 text-center py-8">まだ投稿がありません</p>
        ) : (
          <div className="space-y-3">
            {topPosts.map((pin, index) => (
              <button
                key={pin.id}
                onClick={() => onPinClick(pin)}
                className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-slate-800">{pin.title}</h4>
                        <Badge 
                          className="text-white border-none"
                          style={{ backgroundColor: genreColors[pin.genre] }}
                        >
                          {genreLabels[pin.genre]}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-1">{pin.description}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center text-red-500 font-medium">
                      <Heart className="w-4 h-4 mr-1 fill-red-500/10" />
                      <span>{pin.reactions}</span>
                    </div>
                    <div className="flex items-center text-blue-500 text-xs mt-1">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{pin.viewCount || 0}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}