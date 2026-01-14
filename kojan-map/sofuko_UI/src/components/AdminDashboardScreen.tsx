//M4-3-7 概要画面表示

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, TrendingUp, MapPin, UserCheck, AlertTriangle, Activity} from 'lucide-react';
import { mockPins } from '../lib/mockData';

interface AdminDashboardScreenProps {
  pendingReportsCount: number;
  businessApplicationsCount: number;
}

export function AdminDashboardScreen({ pendingReportsCount, businessApplicationsCount }: AdminDashboardScreenProps) {
  // 統計データの算出
  const systemStats = {
    totalUsers: 1234,
    activeUsers: 856,
    totalPosts: mockPins.length,
    totalReactions: mockPins.reduce((sum, pin) => sum + pin.reactions, 0),
    businessUsers: 45,
    pendingReports: pendingReportsCount,
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* 統計カードセクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 総ユーザー数 */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm opacity-90 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              総ユーザー数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">登録済みアカウント</p>
          </CardContent>
        </Card>

        {/* アクティブユーザー */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm opacity-90 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              アクティブユーザー
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{systemStats.activeUsers.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">過去7日間</p>
          </CardContent>
        </Card>

        {/* 総投稿数 */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm opacity-90 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              総投稿数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{systemStats.totalPosts.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">全ジャンル</p>
          </CardContent>
        </Card>

        {/* 総リアクション */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm opacity-90 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              総リアクション
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{systemStats.totalReactions.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">いいね数合計</p>
          </CardContent>
        </Card>

        {/* 事業者アカウント */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm opacity-90 flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              事業者アカウント
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{systemStats.businessUsers.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">認証済み事業者</p>
          </CardContent>
        </Card>

        {/* 未処理通報 */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-red-500 to-pink-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm opacity-90 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              未処理通報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{systemStats.pendingReports.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">要確認</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

      