package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

// LoginRequest はフロントエンドから送信されるJSON構造を定義します
type LoginRequest struct {
	GoogleID string `json:"googleId" binding:"required"`
	Role     string `json:"role"     binding:"required,oneof=general business admin"`
}

// LoginResponse はフロントエンドへ返すレスポンス構造を定義します
type LoginResponse struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func UserInputInformation() {
	r := gin.Default()

	// CORSの設定 (フロントエンド localhost:3000 等からのアクセスを許可)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	// ログインAPIエンドポイント
	r.POST("/api/login", func(c *gin.Context) {
		var req LoginRequest

		// JSONのパースとバリデーション
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "error",
				"message": "無効なリクエストです。役割(role)やGoogle IDが不足しています。",
			})
			return
		}

		// 本来はここでDB保存やGoogleトークンの検証などを行います
		// 今回はデモ用として受け取った値に基づいたメッセージを返します
		
		roleName := ""
		switch req.Role {
		case "general":
			roleName = "一般会員"
		case "business":
			roleName = "事業者会員"
		case "admin":
			roleName = "管理者"
		}

		response := LoginResponse{
			Status:  "success",
			Message: roleName + "としてログインに成功しました (ID: " + req.GoogleID + ")",
		}

		c.JSON(http.StatusOK, response)
	})

	// サーバー起動 (ポート 8080)
	r.Run(":8080")
}