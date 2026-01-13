package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// main.go で使わない場合はここにあってもOKですが、
// Response用の型も一つにまとめておくと管理が楽です
type ThresholdResponse struct {
	PinID      string `json:"pinId"`
	IsHot      bool   `json:"isHot"`      // 50件以上ならtrue
	TotalPosts int    `json:"totalPosts"`
}

// Gin のハンドラー形式 (*gin.Context) に修正
func CheckPostCountThreshold(c *gin.Context) {
	// クエリパラメータから id を取得 (フロントが ?id=xxx で送る場合)
	pinID := c.Query("id")
	if pinID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	// 投稿数のロジック
	postCount := 55 
	threshold := 5

	// Gin の JSON 出力メソッドを使用
	c.JSON(http.StatusOK, ThresholdResponse{
		PinID:      pinID,
		IsHot:      postCount >= threshold,
		TotalPosts: postCount,
	})
}