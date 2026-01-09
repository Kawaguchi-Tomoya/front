package handlers

import (
	"encoding/json"
	"net/http"
	"your-project/models" // 実際のパスに合わせて変更してください
)

// GetPostList 地図上のピン一覧を取得するハンドラー
func GetPostList(w http.ResponseWriter, r *http.Request) {
	// 本来はDBから取得しますが、ここではモックデータを返します
	pins := []models.Pin{
		{
			ID:        "1",
			Latitude:  35.6071,
			Longitude: 133.6823,
			Genre:     "gourmet",
			UserRole:  "business",
			Title:     "高知のおいしい店",
		},
		{
			ID:        "2",
			Latitude:  36.6080,
			Longitude: 133.6830,
			Genre:     "view",
			UserRole:  "general",
			Title:     "絶景スポット",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pins)
}