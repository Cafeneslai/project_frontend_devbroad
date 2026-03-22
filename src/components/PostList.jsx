import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch";

function PostList() {
  // ดึงข้อมูลโพสต์จาก API
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );
  // เอาแค่ 20 รายการแรก
  const posts = data ? data.slice(0, 20) : [];

  // state สำหรับค้นหา, เรียงลำดับ, และหน้าปัจจุบัน
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' = ใหม่สุดก่อน 'asc' = เก่าสุดก่อน
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // กรองโพสต์ตาม search
  // ใช้ .toLowerCase() เพื่อให้ค้นหาได้ทั้งตัวพิมพ์ใหญ่-เล็ก
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort โพสต์
  // ใช้ [...filtered] เพื่อสร้าง array ใหม่ ไม่แก้ไขของเดิม
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "desc" ? b.id - a.id : a.id - b.id,
  );

  // Pagination
  // Math.ceil() ปัดเศษขึ้น → ให้มีหน้าสุดท้ายเสมอ
  // .slice() ตัด array ตามช่วงที่ต้องการ
  const totalPages = Math.ceil(sorted.length / postsPerPage);
  const paginatedPosts = sorted.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  // ถ้ากำลังโหลด → แสดง LoadingSpinner
  if (loading) return <LoadingSpinner />;

  // ถ้ามี error → แสดงข้อความ error
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

  // แสดงผล UI
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
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset หน้าเมื่อ search เปลี่ยน
        }}
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
      {/* เปลี่ยนลำดับการแสดงผล: ใหม่สุดก่อน / เก่าสุดก่อน */}
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
      {/* เรียก refetch() เพื่อดึงข้อมูลใหม่จาก API */}
      <button
        onClick={refetch}
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
      {paginatedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "6px",
              border: "1px solid #cbd5e0",
              background: currentPage === 1 ? "#edf2f7" : "#1e40af",
              color: currentPage === 1 ? "#a0aec0" : "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
            }}
          >
            ◀ ก่อนหน้า
          </button>
          <span style={{ color: "#4a5568", fontSize: "0.9rem" }}>
            หน้า {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "6px",
              border: "1px solid #cbd5e0",
              background: currentPage === totalPages ? "#edf2f7" : "#1e40af",
              color: currentPage === totalPages ? "#a0aec0" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
            }}
          >
            ถัดไป ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
