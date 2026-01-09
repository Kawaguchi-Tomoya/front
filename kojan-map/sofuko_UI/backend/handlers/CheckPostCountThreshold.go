package handlers

import (
	"encoding/json"
	"net/http"
)

type ThresholdResponse struct {
	PinID      string `json:"pinId"`
	IsHot      bool   `json:"isHot"`      // 50件以上ならtrue
	TotalPosts int    `json:"totalPosts"`
}

// CheckPostCountThreshold 特定のピンの投稿数が50を超えているか確認
func CheckPostCountThreshold(w http.ResponseWriter, r *http.Request) {
	// クエリパラメータから pinId を取得
	pinID := r.URL.Query().Get("pinId")
	if pinID == "" {
		http.Error(w, "pinId is required", http.StatusBadRequest)
		return
	}

	// 本来は DB で "SELECT COUNT(*) FROM posts WHERE pin_id = ?" を実行
	// 今回はデモ用にカウントを仮定
	postCount := 55 
	threshold := 50

	response := ThresholdResponse{
		PinID:      pinID,
		IsHot:      postCount >= threshold,
		TotalPosts: postCount,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}