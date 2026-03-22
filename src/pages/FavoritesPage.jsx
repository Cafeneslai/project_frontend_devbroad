import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

// หน้าแสดงโพสต์ที่ถูกใจ
function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]);

  // ดึงข้อมูลโพสต์ที่ถูกใจ
  useEffect(() => {
    if (favorites.length === 0) return;

    // ดึงเฉพาะโพสต์ที่ถูกใจ
    async function fetchFavoritePosts() {
      const results = await Promise.all(
        // Promise.all ใช้สำหรับดึงข้อมูลหลายๆ อย่างพร้อมกัน
        favorites.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );
      setPosts(results);
    }
    fetchFavoritePosts();
  }, [favorites]); // ถ้า favorites เปลี่ยน → useEffect จะทำงานใหม่

  // ถ้ายังไม่มีโพสต์ที่ถูกใจ → แสดงข้อความว่างเปล่า
  if (favorites.length === 0) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          ยังไม่มีโพสต์ที่ถูกใจ
        </p>
        <Link to="/" style={{ color: "#1e40af" }}>
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  // แสดงรายการโพสต์ที่ถูกใจ
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "0.5rem",
        }}
      >
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>
      {/* วนลูปแสดงโพสต์แต่ละรายการ */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          {/* หัวข้อโพสต์ */}
          <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>
            <Link
              to={`/posts/${post.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <p style={{ margin: "0 0 0.75rem", color: "#4a5568" }}>{post.body}</p>

          {/* ปุ่มยกเลิกถูกใจ */}
          <button
            onClick={() => toggleFavorite(post.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e53e3e",
              fontSize: "0.9rem",
            }}
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
