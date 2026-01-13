package main

import (
	"time"
)

// GetCurrentTimestamp は現在の時刻を取得して返します
// 将来的にタイムゾーンの調整やフォーマットの変更が必要になった場合
// この関数を修正するだけで全箇所に適用できます
func GetCurrentTimestamp() time.Time {
	// 日本標準時(JST)で取得したい場合は以下のように書けます
	// jst, _ := time.LoadLocation("Asia/Tokyo")
	// return time.Now().In(jst)
	
	return time.Now()
}