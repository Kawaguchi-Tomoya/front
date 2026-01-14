package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// LoginRequest: main.goでも使うため定義は残します
type LoginRequest struct {
	GoogleID string `json:"googleId" binding:"required"`
	Role     string `json:"role"     binding:"required,oneof=general"`
}

// 【修正箇所】UserInputInformation を「ハンドラー関数」に変更
// 引数に *gin.Context を取ることで、main.go の r.POST 内で呼び出せるようになります
func HandleLogin(c *gin.Context) {
	fmt.Println("--- APIリクエスト受信 (HandleLogin) ---")

	var req LoginRequest

	// JSONのパースとバリデーション
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Printf("【バリデーションエラー】詳細: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "一般会員としてのみログイン可能です。",
			"debug":   err.Error(),
		})
		return
	}

	fmt.Printf("【受信データ】GoogleID: %s, Role: %s\n", req.GoogleID, req.Role)

	// 成功レスポンス
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "一般会員としてログインに成功しました (ID: " + req.GoogleID + ")",
	})
	fmt.Println("【成功】レスポンスを送信しました")
}