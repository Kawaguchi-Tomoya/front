package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// User フロントエンドの User type と整合性を合わせた構造体
// 必要に応じて types.go などに切り出してください
type User struct {
	ID           string   `json:"id"`
	Username     string   `json:"username"`
	BlockedUsers []string `json:"blockedUsers"`
}

// GetBlockList はブロックリストを含むユーザー情報を返します
func GetBlockList(c *gin.Context) {
	// --- サンプルデータの作成 ---
	// 本来はDBやセッションから取得しますが、ここではリクエストに合わせて複数データを生成します
	sampleBlockedIds := []string{
		"user_uuid_001",
		"user_uuid_042",
		"user_uuid_109",
	}

	currentUser := User{
		ID:           "my_account_id",
		Username:     "テストユーザー",
		BlockedUsers: sampleBlockedIds,
	}

	// Ginの形式でJSONレスポンスを返却
	c.JSON(http.StatusOK, currentUser)
}