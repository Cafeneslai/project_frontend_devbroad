import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

// หน้าค้นหา
// ดึงข้อมูลโพสต์จาก API
// useSearchParams — ดึง query string จาก URL
// เช่น /search?q=hello → q = "hello"
function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const posts = data || [];
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(q.toLowerCase()),
  );

  // ถ้ากำลังโหลด → แสดง LoadingSpinner
  if (loading) return <LoadingSpinner />;

  // ถ้าเกิด error → แสดงข้อความ error
  if (error)
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
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
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* หัวข้อผลการค้นหา */}
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        ผลการค้นหา: "{q}"
      </h2>

      {/* ถ้าไม่พบโพสต์ที่ตรงกับ "q" → แสดงข้อความว่างเปล่า */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "#718096", fontSize: "1.1rem" }}>
            ไม่พบโพสต์ที่ตรงกับ "{q}"
          </p>
          <Link to="/" style={{ color: "#1e40af" }}>
            ← กลับหน้าหลัก
          </Link>
        </div>
      ) : (
        // แสดงรายการโพสต์ที่ค้นหาเจอ
        <>
          <p style={{ color: "#718096", marginBottom: "1rem" }}>
            พบ {filtered.length} โพสต์
          </p>
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
}

export default SearchPage;
