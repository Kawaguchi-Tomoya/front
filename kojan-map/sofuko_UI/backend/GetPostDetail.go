package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Pin 構造体（フロントエンドの型と完全一致させる）
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

// レスポンス全体の構造
type PinDetailResponse struct {
	Pin            Pin   `json:"pin"`
	PinsAtLocation []Pin `json:"pinsAtLocation"`
	IsReacted      bool  `json:"isReacted"`
}

func main() {
	// Ginのデフォルトインスタンスを作成
	r := gin.Default()

	// --- 1. CORS ミドルウェアの設定 ---
	// これがないとブラウザのフロントエンドから通信できません
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // 本番では特定のドメインに制限
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})

	// --- 2. 投稿詳細取得 API ---
	// フロントの fetch("http://localhost:8080/api/posts/detail?id=...") に対応
	r.GET("/api/posts/detail", func(c *gin.Context) {
		// URLの ?id=xxxx 部分を取得
		pinID := c.Query("id")

		if pinID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID parameter is required"})
			return
		}

		// デバッグ用：ターミナルに表示
		println("DEBUG: Request for ID ->", pinID)

		// サンプルデータの作成（本来はDBから取得）
		now := time.Now()
		samplePin := Pin{
			ID:           pinID,
			UserID:       "user-789",
			Title:        "Goサーバーから取得成功",
			Description:  "バックエンド(Gin)との接続に成功しました。このデータはGo側で生成されています。",
			Genre:        "nature",
			UserRole:     "general",
			Images:       []string{"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500"},
			Latitude:     35.6812,
			Longitude:    139.7671,
			Reactions:    24,
			ViewCount:    100,
			CreatedAt:    now,
		}

		// レスポンスの返却
		c.JSON(http.StatusOK, PinDetailResponse{
			Pin:            samplePin,
			PinsAtLocation: []Pin{samplePin},
			IsReacted:      false,
		})
	})

	// --- 3. 新規投稿作成 API ---
	r.POST("/api/posts", func(c *gin.Context) {
		var newPin Pin
		if err := c.ShouldBindJSON(&newPin); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// 成功レスポンス
		c.JSON(http.StatusCreated, gin.H{
			"status": "success",
			"id":     "new-generated-id-123",
		})
	})

	// ポート8080で起動
	println("🚀 Server starting on http://localhost:8080")
	r.Run(":8080")
}