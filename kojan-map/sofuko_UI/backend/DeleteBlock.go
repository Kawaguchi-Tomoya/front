package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// DeleteBlock は指定されたユーザーのブロックを解除するハンドラーです。
func DeleteBlock(c *gin.Context) {
	// 1. URLパラメータから解除対象のユーザーIDを取得
	// 例: /api/user/blocks/user123 -> targetID = "user123"
	targetID := c.Param("id")

	if targetID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDが指定されていません"})
		return
	}

	// 2. 本来はここで認証済みユーザーのセッション等から「自分のID」を取得します
	// 今回はサンプルとして固定の myUserID を使用します
	myUserID := "current-authorized-user-id"

	// 3. データベース更新処理 (疑似コード)
	// SQL例: DELETE FROM user_blocks WHERE user_id = ? AND blocked_user_id = ?
	err := removeBlockFromDB(myUserID, targetID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ブロック解除に失敗しました"})
		return
	}

	// 4. 成功レスポンス
	c.JSON(http.StatusOK, gin.H{
		"message": "ブロックを解除しました",
		"unblocked_id": targetID,
	})
}

// removeBlockFromDB はデータベースからレコードを削除するシミュレーション関数です。
// 実際にはGORMやsql.DBなどを使用して実装します。
func removeBlockFromDB(myID string, targetID string) error {
	// ここにDB操作ロジックを記述
	// return db.Where("user_id = ? AND blocked_user_id = ?", myID, targetID).Delete(&Block{}).Error
	return nil
}