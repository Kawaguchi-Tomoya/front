// SubmitBlock.go
package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type BlockRequest struct {
	UserID string `json:"userId"`
}

func SubmitBlock(c *gin.Context) {
	var req BlockRequest
	
	// JSONのパース
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "不正なリクエストです"})
		return
	}

	if req.UserID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDが指定されていません"})
		return
	}

	// TODO: 実際のブロック処理（DB更新など）をここに書く
	println("DEBUG: ユーザーをブロックしました:", req.UserID)

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "ユーザーをブロックしました",
	})
}