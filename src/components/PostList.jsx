import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' = ใหม่สุดก่อน

  // แยก fetch logic เป็น function ที่เรียกได้ทั้งจาก useEffect และจากปุ่ม
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort โพสต์
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "desc" ? b.id - a.id : a.id - b.id,
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      <PostCount count={filtered.length} />

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* Sort Button */}
      <button
        onClick={() =>
          setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
        }
        style={{
          background: "#edf2f7",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          padding: "0.4rem 0.75rem",
          cursor: "pointer",
          fontSize: "0.85rem",
          color: "#2d3748",
          marginBottom: "1rem",
        }}
      >
        {sortOrder === "desc" ? "⬇️ ใหม่สุดก่อน" : "⬆️ เก่าสุดก่อน"}
      </button>

      {/* Reload Button */}
      <button
        onClick={fetchPosts}
        style={{
          background: "#edf2f7",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          padding: "0.4rem 0.75rem",
          cursor: "pointer",
          fontSize: "0.85rem",
          color: "#2d3748",
          marginBottom: "1rem",
          marginLeft: "0.5rem",
        }}
      >
        🔄 โหลดใหม่
      </button>

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* Skeleton สำหรับตอนโหลดข้อมูล */}
      {posts.length === 0 && <PostSkeleton />}

      {/* แสดงรายการโพสต์ */}
      {sorted.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
