//M4-5-4 対応した事業者申請を反映する

import React, { useState } from 'react';
import { BusinessApplicationList, UserInputBusiness } from './AdminDisplayBusinessApplicationList';
import { toast } from 'sonner'; 

// モックデータ（初期表示用）
const INITIAL_DATA: UserInputBusiness[] = [
  {
    id: '1',
    userName: '田中 太郎',
    email: 'tanaka@example.com',
    ShopName: '田中ベーカリー',
    PhoneNumber: '03-1234-5678',
    address: '東京都渋谷区...',
    date: '2023-10-27',
  },
  {
    id: '2',
    userName: '佐藤 花子',
    email: 'sato@example.com',
    ShopName: 'サトーカフェ',
    PhoneNumber: '03-9876-5432',
    address: '大阪府大阪市...',
    date: '2023-10-28',
  },
];


export default function ProcessBusinessRequestScreen() {
  // 1. 申請一覧をステートで管理
  const [applications, setApplications] = useState<UserInputBusiness[]>(INITIAL_DATA);

  // 2. 承認時の処理
  const handleApprove = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  toast.success('事業者アカウントを承認しました');
};
   

  // 3. 却下時の処理
  const handleReject = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  toast.error('事業者申請を却下しました');
};
    

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">事業者申請管理</h1>
      
      {/* 子コンポーネントにデータと関数を渡す */}
      <BusinessApplicationList 
        applications={applications} 
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}