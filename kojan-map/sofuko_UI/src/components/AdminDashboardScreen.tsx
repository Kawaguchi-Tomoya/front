//M4-3-7 概要画面表示

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Users, TrendingUp, MapPin, UserCheck, AlertTriangle, Activity, BarChart3, Eye,} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

  // モック
  const weeklyActivityData = [
    { date: '10/28', users: 720, posts: 45, reactions: 156 },
    { date: '10/29', users: 780, posts: 52, reactions: 189 },
    { date: '10/30', users: 810, posts: 48, reactions: 201 },
    { date: '10/31', users: 845, posts: 67, reactions: 234 },
    { date: '11/01', users: 890, posts: 71, reactions: 267 },
    { date: '11/02', users: 920, posts: 63, reactions: 298 },
    { date: '11/03', users: 856, posts: 58, reactions: 315 },
  ];

  const genreDistribution = [
    { name: 'グルメだよ', value: 2, color: '#EF4444' },
    { name: 'イベント', value: 1, color: '#F59E0B' },
    { name: '景色', value: 1, color: '#10B981' },
    { name: 'お店', value: 1, color: '#3B82F6' },
    { name: '緊急情報', value: 1, color: '#8B5CF6' },
  ];

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

      {/* グラフエリア */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-xl border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              週間アクティビティ推移
            </CardTitle>
            <CardDescription>ユーザー活動とコンテンツ投稿の推移</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#3b82f6" name="新規投稿" radius={[8, 8, 0, 0]} />
                <Bar dataKey="reactions" fill="#8b5cf6" name="リアクション" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-purple-600" />
              ジャンル別投稿
            </CardTitle>
            <CardDescription>カテゴリー分布</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}