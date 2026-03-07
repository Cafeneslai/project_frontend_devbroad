import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' = ใหม่สุดก่อน

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort โพสต์
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "desc" ? b.id - a.id : a.id - b.id,
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
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
