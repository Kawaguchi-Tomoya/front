package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"my-app-backend/handlers"
)

type Pin struct {
	ID           string    `json:"id"`
	UserID       string    `json:"userId"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	Genre        string    `json:"genre"`
	UserRole     string    `json:"userRole"`
	BusinessName string    `json:"businessName,omitempty"`
	Images       []string  `json:"images"`
	Latitude     float64   `json:"latitude"`
	Longitude    float64   `json:"longitude"`
	Reactions    int       `json:"reactions"`
	ViewCount    int       `json:"viewCount"`
	CreatedAt    time.Time `json:"createdAt"`
}

type PinDetailResponse struct {
	Pin            Pin   `json:"pin"`
	PinsAtLocation []Pin `json:"pinsAtLocation"`
	IsReacted      bool  `json:"isReacted"`
}

func main() {
	r := gin.Default()

	// --- 1. CORS 設定 (localhost と 127.0.0.1 両方を許容するために重要) ---
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})

	// --- 2. 【詳細取得】GET /api/posts/detail?id=xxx ---
	r.GET("/api/posts/detail", func(c *gin.Context) {
		pinID := c.Query("id")
		println("DEBUG: 詳細リクエスト受信 ID:", pinID)

		sample := Pin{
			ID:          pinID,
			Title:       "サーバーから取得した投稿",
			Description: "詳細データの取得に成功しました。",
			CreatedAt:   time.Now(),
			Images:      []string{"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500"},
		}

		c.JSON(http.StatusOK, PinDetailResponse{
			Pin:            sample,
			PinsAtLocation: []Pin{sample},
			IsReacted:      false,
		})
	})

	// --- 3. 【新規投稿】POST /api/posts ---
	r.POST("/api/posts", func(c *gin.Context) {
		var newPin Pin
		// JSONをパース
		if err := c.ShouldBindJSON(&newPin); err != nil {
			println("DEBUG: POSTエラー:", err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		println("DEBUG: 新規投稿受信:", newPin.Title)
		
		// フロントエンドが期待する成功レスポンス
		c.JSON(http.StatusCreated, gin.H{
			"status": "success",
			"id":     "generated-id-" + time.Now().Format("05"),
		})
	})

	// 1. 投稿一覧取得 (GetPostList.go)
	r.GET("/api/posts", handlers.GetPostList)

	// 2. 投稿数しきい値チェック (CheckPostCountThreshold.go)
	r.GET("/api/posts/threshold", handlers.CheckPostCountThreshold)

	// 8080ポートで起動
	r.Run(":8080")
}