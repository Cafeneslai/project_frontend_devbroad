import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "./CommentList";

// รับ prop: post — ข้อมูลโพสต์ 1 อัน id,title,body
function PostCard({ post }) {
  // ดึงข้อมูล favorites และฟังก์ชัน toggleFavorite จาก context
  const { favorites, toggleFavorite } = useFavorites();
  // เช็คว่าโพสต์นี้ถูกใจแล้วหรือยัง
  const isFavorite = favorites.includes(post.id);
  // state เก็บสถานะว่าจะแสดงความคิดเห็นหรือไม่ (เริ่มต้น = false)
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* หัวข้อโพสต์ — ลิงก์ไปหน้า PostDetail */}
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          to={`/posts/${post.id}`} // ลิงก์ไปหน้า PostDetail
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </h3>

      {/* แสดงเนื้อหาโพสต์ */}
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      {/* ปุ่มถูกใจและปุ่มแสดงความคิดเห็น */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่มถูกใจ */}
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* ปุ่มแสดงความคิดเห็น */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"}
        </button>
      </div>

      {/* แสดงความคิดเห็น */}
      {/* ถ้า showComments เป็น true → แสดง CommentList */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
