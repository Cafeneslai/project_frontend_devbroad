import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

// รับ prop: postId — ID ของโพสต์ที่ต้องการดึง comments
function CommentList({ postId }) {
  // state เก็บรายการความคิดเห็น
  const [comments, setComments] = useState([]);

  // state บอกว่ากำลังโหลดอยู่หรือไม่
  const [loading, setLoading] = useState(true);

  // state เก็บข้อความ error
  const [error, setError] = useState(null);

  // useEffect — ดึงข้อมูล comments จาก API เมื่อ component mount
  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        // เรียก API ดึง comments ของโพสต์นี้
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");
        const data = await res.json();
        setComments(data); // เก็บข้อมูล comments ลง state
      } catch (err) {
        setError(err.message); // เก็บ error ลง state
      } finally {
        setLoading(false); // หยุด loading
      }
    }
    fetchComments();
  }, [postId]); // fetch ใหม่ทุกครั้งที่ postId เปลี่ยน

  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  // แสดงผลรายการ comments
  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>

      {/*วนลูปแสดง comments ทีละอัน*/}
      {comments.map((comment) => (
        <div
          key={comment.id} // key ช่วยให้ React รู้ว่าแต่ละ item คืออะไร
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          {/* แสดงชื่อผู้แสดงความคิดเห็น */}
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name}
          </div>
          {/* แสดงเนื้อหาความคิดเห็น */}
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
