package models

import "time"

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
    IsBlocked    bool      `json:"-"`
}