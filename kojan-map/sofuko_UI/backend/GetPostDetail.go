package main

import (
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
)

// main関数やPin構造体は main.go にあるので、ここでは書かない

// HandleGetPostDetail 詳細取得のロジックを関数化
func HandleGetPostDetail(c *gin.Context) {
    pinID := c.Query("id")
    if pinID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ID parameter is required"})
        return
    }

    println("DEBUG: Request for ID ->", pinID)

    now := time.Now()
    samplePin := Pin{
        ID:           pinID,
        UserID:       "user-789",
        Title:        "Goサーバーから取得成功",
        Description:  "バックエンド(Gin)との接続に成功しました。",
        Genre:        "nature",
        UserRole:     "general",
        Images:       []string{"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500"},
        Latitude:     35.6812,
        Longitude:    139.7671,
        Reactions:    24,
        ViewCount:    100,
        CreatedAt:    now,
    }

    c.JSON(http.StatusOK, PinDetailResponse{
        Pin:            samplePin,
        PinsAtLocation: []Pin{samplePin},
        IsReacted:      false,
    })
}