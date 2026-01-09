package models

import "time"

// Pin フロントエンドの Pin 型に対応
type Pin struct {
	ID           string    `json:"id"`
	Latitude     float64   `json:"latitude"`
	Longitude    float64   `json:"longitude"`
	Genre        string    `json:"genre"`        // "gourmet", "event", "view", etc.
	UserRole     string    `json:"userRole"`     // "business" or "general"
	BusinessIcon string    `json:"businessIcon"` // URL
	Title        string    `json:"title"`
	CreatedAt    time.Time `json:"createdAt"`
}