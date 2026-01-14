import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { useState, useEffect } from 'react';
import { MapPin, User, Building2, ShieldCheck, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

type UserRole = 'general' | 'business' | 'admin';

interface LoginScreenProps {
  onLogin: (role: UserRole, idToken: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSelectingRole, setIsSelectingRole] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);

  // --- 本来のGoogle SDK設定 (バックエンド準備中につきコメントアウトまたは予備として保持) ---
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
        callback: (response: any) => {
          setIdToken(response.credential);
          setIsSelectingRole(true);
          setIsLoading(false);
        },
      });
    }
  }, []);

  // --- 形式的なログイン処理 (デモ用) ---
  const handleFakeLoginClick = async () => {
    if (!agreedToTerms) {
      alert('利用規約に同意してください');
      return;
    }

    setIsLoading(true);
    // 本来はここでGoogleのポップアップが出るが、1秒待機で代用
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // バックエンドがない間はダミーのJWT形式の文字列をセット
    setIdToken("dummy_jwt_token_for_development");
    setIsSelectingRole(true); // 役割選択画面へ
    setIsLoading(false);
  };

  const handleRoleSelect = (role: UserRole) => {
    if (idToken) {
      onLogin(role, idToken);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>こじゃんとやまっぷ</CardTitle>
          <CardDescription>地域特化SNS - 開発用ログイン</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!isSelectingRole ? (
            /* ステップ1: 規約同意とログイン開始 */
            <div className="space-y-6">
              <div className="flex items-start space-x-2 bg-white p-3 rounded-md border shadow-sm">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm leading-tight cursor-pointer text-gray-600">
                  <span className="text-blue-600 font-bold">利用規約</span> に同意して、コミュニティに参加します。
                </label>
              </div>

              <Button 
                onClick={handleFakeLoginClick} 
                className="w-full h-12 text-lg font-bold transition-all hover:scale-[1.02]"
                disabled={!agreedToTerms || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Googleでログイン (デモ)"
                )}
              </Button>
            </div>
          ) : (
            /* ステップ2: 役割選択画面 (管理者を含む3択) */
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center mb-4">
                <p className="text-sm font-bold text-green-600">✓ 認証に成功しました</p>
                <p className="text-xs text-gray-500">登録するアカウント種別を選択してください</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="h-20 flex justify-start items-center space-x-4 border-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  onClick={() => handleRoleSelect('general')}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold">一般会員</div>
                    <div className="text-[10px] text-gray-500">地域の情報を閲覧・投稿する</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-20 flex justify-start items-center space-x-4 border-2 hover:border-purple-500 hover:bg-purple-50 transition-all"
                  onClick={() => handleRoleSelect('business')}
                >
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Building2 className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold">事業者会員</div>
                    <div className="text-[10px] text-gray-500">お店やイベントの情報を発信する</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-20 flex justify-start items-center space-x-4 border-2 hover:border-amber-500 hover:bg-amber-50 transition-all"
                  onClick={() => handleRoleSelect('admin')}
                >
                  <div className="bg-amber-100 p-2 rounded-full">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold">管理者</div>
                    <div className="text-[10px] text-gray-500">システムの運営・管理を行う</div>
                  </div>
                </Button>
              </div>

              <Button 
                variant="ghost" 
                className="w-full text-xs text-gray-400"
                onClick={() => setIsSelectingRole(false)}
              >
                ← ログインに戻る
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}