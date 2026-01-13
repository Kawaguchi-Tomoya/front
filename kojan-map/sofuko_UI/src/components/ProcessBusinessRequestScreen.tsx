//M4-5-4 申請反映　関数がAdminDashbord.tsxにも必要だったのでモジュールとは少し違います。
import { BusinessApplicationList } from './AdminDisplayBusinessApplicationList';

// 型の定義（親からこれらをもらうと宣言する）
interface Props {
  applications: any[]; // DashboardにあるbusinessApplicationsのこと
  onApprove: (id: string) => void; // DashboardにあるhandleApproveのこと
  onReject: (id: string) => void;  // DashboardにあるhandleRejectのこと
}

export default function ProcessBusinessRequestScreen({ applications, onApprove, onReject }: Props) {
  // ★ ここにあった useState や独自関数はすべて削除します
  
  return (
    <div className="space-y-6">
      {/* 画面のタイトルや統計などの見た目だけを書く */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">事業者申請の処理</h2>
        <p className="text-sm text-slate-500">現在 {applications.length} 件の未処理案件があります</p>
      </div>

      {/* 実際のリスト表示は List コンポーネントに任せる */}
      <BusinessApplicationList 
        applications={applications} 
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
}