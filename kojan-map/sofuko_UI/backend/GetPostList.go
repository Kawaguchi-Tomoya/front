package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GetPostList(c *gin.Context) {
	// 現在時刻を取得
	now := time.Now()

	pins := []Pin{
		{
			ID:          "1",
			Title:       "物部川の絶景スポット",
			Description: "ここからの夕日が最高に綺麗です。",
			Latitude:    33.6071,
			Longitude:   133.6823,
			Genre:       "scenery", // 緑色
			UserRole:    "general",
			CreatedAt:   now,
			IsHot:     true,
		},
		{
			ID:          "2",
			Title:       "地元で人気のカフェ",
			Description: "ランチセットが安くて美味しい。駐車場あり。",
			Latitude:    33.6050,
			Longitude:   133.6850,
			Genre:       "food", // 赤色
			UserRole:    "business", // ダイヤ型になる
			BusinessName: "カフェ・カミ",
			CreatedAt:   now.Add(-time.Hour * 2),
			IsHot:     true,
		},
		{
			ID:          "3",
			Title:       "週末限定フリーマーケット",
			Description: "地元の野菜や手作り雑貨が並びます。",
			Latitude:    33.6090,
			Longitude:   133.6800,
			Genre:       "event", // オレンジ色
			UserRole:    "general",
			CreatedAt:   now.Add(-time.Hour * 24),
			IsHot:     true,
		},
		{
			ID:          "4",
			Title:       "歴史ある神社",
			Description: "静かな雰囲気で散歩にぴったりです。",
			Latitude:    33.6110,
			Longitude:   133.6830,
			Genre:       "other", // 紫色
			UserRole:    "general",
			CreatedAt:   now.Add(-time.Hour * 48),
			IsHot:     true,
		},
		{
			ID:          "5",
			Title:       "セレクトショップ・ソフコ",
			Description: "最新のガジェットや雑貨を取り扱っています。",
			Latitude:    33.6065,
			Longitude:   133.6880,
			Genre:       "shop", // 青色
			UserRole:    "business", // ダイヤ型
			BusinessName: "SOFUKO Store",
			CreatedAt:   now,
			IsHot:     true,
		},
	}

	c.JSON(http.StatusOK, pins)
}