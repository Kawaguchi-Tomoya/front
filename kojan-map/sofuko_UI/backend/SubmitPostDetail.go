package main

import (
	//"net/http"
	"time"
	"database/sql"
	"github.com/google/uuid"
)

// PinGenre はフロントエンドのPinGenre型に対応します
type PinGenre string

// 定義されたジャンル（フロントのgenreLabelsに対応）
const (
	GenreFood     PinGenre = "food"
	GenreShopping PinGenre = "shopping"
	GenreSight    PinGenre = "sightseeing"
	GenreOther    PinGenre = "other"
)

// SubmitPostRequest はフロントエンドから送信されるJSONの構造を定義します
type SubmitPostRequest struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Genre       PinGenre `json:"genre"`
	Latitude    float64  `json:"latitude"`
	Longitude   float64  `json:"longitude"`
	Images      []string `json:"images"` // Base64文字列またはアップロード済みURL
}

// PostResponse はクライアントに返すレスポンスの構造を定義します
type PostResponse struct {
	ID        string    `json:"id"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"createdAt"`
}

// SubmitPostDetail は新規投稿を受け取り、保存処理を行うハンドラです
func savePostToDB(db *sql.DB, req SubmitPostRequest, userID string) (string, error) {
	// トランザクションの開始（ピンと画像をセットで保存するため）
	tx, err := db.Begin()
	if err != nil {
		return "", err
	}
	// エラー時にロールバックするように遅延実行
	defer tx.Rollback()

	newPostID := uuid.New().String()

	// 1. pinsテーブルへのインサート
	queryPin := `
		INSERT INTO pins (id, user_id, title, description, genre, latitude, longitude)
		VALUES ($1, $2, $3, $4, $5, $6, $7)`
	
	_, err = tx.Exec(queryPin, newPostID, userID, req.Title, req.Description, req.Genre, req.Latitude, req.Longitude)
	if err != nil {
		return "", err
	}

	// 2. pin_imagesテーブルへのインサート (画像がある場合)
	if len(req.Images) > 0 {
		queryImage := `INSERT INTO pin_images (pin_id, image_url) VALUES ($1, $2)`
		for _, imgURL := range req.Images {
			_, err = tx.Exec(queryImage, newPostID, imgURL)
			if err != nil {
				return "", err
			}
		}
	}

	// コミットして確定
	if err := tx.Commit(); err != nil {
		return "", err
	}

	return newPostID, nil
}