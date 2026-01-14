package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid" 
	"github.com/gin-contrib/cors"
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
	IsHot        bool      `json:"isHot"`
}

type PinDetailResponse struct {
	Pin            Pin   `json:"pin"`
	PinsAtLocation []Pin `json:"pinsAtLocation"`
	IsReacted      bool  `json:"isReacted"`
}

// 他のファイル（GetPostList.goなど）と共有するためにスライスを定義
var mockPins = []Pin{}

func main() {
	r := gin.Default()

	// --- 1. CORS 設定 ---
	r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        // ここに "DELETE" が含まれていることで、エラーが解消されます
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

	// ログイン
	r.POST("/api/login", HandleLogin)


	// --- 2. 【新規投稿】POST /api/posts ---
	r.POST("/api/posts", func(c *gin.Context) {
		var newPin Pin
		if err := c.ShouldBindJSON(&newPin); err != nil {
			println("DEBUG: POSTエラー:", err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// IDの生成（UUIDを使用）
		newPin.ID = uuid.New().String()
		
		// GetPostTimestamp.go で定義した関数を使用
		newPin.CreatedAt = GetCurrentTimestamp()
		
		// 初期値の設定
		newPin.Reactions = 0
		newPin.ViewCount = 0

		// メモリ上のデータに追加
		mockPins = append(mockPins, newPin)
		
		println("DEBUG: 新規投稿受信:", newPin.Title, "時刻:", newPin.CreatedAt.String())

		c.JSON(http.StatusCreated, gin.H{
			"status": "success",
			"id":     newPin.ID,
		})
	})

	// 1. 投稿一覧取得 (GetPostList.go)
	r.GET("/api/posts", GetPostList)

	// 2. 投稿詳細取得 (GetPostDetail.go など)
	r.GET("/api/posts/detail", HandleGetPostDetail)

	// 3. 投稿数しきい値チェック (CheckPostCountThreshold.go)
	r.GET("/api/posts/threshold", CheckPostCountThreshold)

	// ブロックリストの取得
	r.GET("/api/user/blocks", GetBlockList)

	// ブロック追加
	r.POST("/api/block", SubmitBlock)

	// ブロック解除
	r.DELETE("/api/user/blocks/:id", DeleteBlock)

	//ログイン

	r.Run(":8080")

	
	
}