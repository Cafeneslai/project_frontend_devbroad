import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const maxTitleLength = 100;
  const remaining = maxTitleLength - title.length;

  // ฟังก์ชัน handleSubmit — ทำงานเมื่อกด submit ฟอร์ม
  function handleSubmit(e) {
    e.preventDefault(); // ป้องกันรีเฟรชหน้า (default behavior ของ form)
    if (!title.trim() || !body.trim()) return; // ถ้าหัวข้อหรือเนื้อหาว่าง → ไม่ทำอะไร

    onAddPost({ title, body });
    setTitle(""); // เคลียร์ form หัวข้อ
    setBody(""); // เคลียร์ form เนื้อหา
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      {/* Input สำหรับหัวข้อโพสต์ — Controlled Input (ค่าผูกกับ state) */}
      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={maxTitleLength}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.25rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />
      {/* ตัวนับจำนวนตัวอักษร — เปลี่ยนสีแดงและตัวหนาเมื่อเหลือน้อยกว่า 10 */}
      <div
        style={{
          textAlign: "right",
          fontSize: "0.8rem",
          marginBottom: "0.5rem",
          color: remaining < 10 ? "#e53e3e" : "#718096",
          fontWeight: remaining < 10 ? "bold" : "normal",
        }}
      >
        {title.length}/{maxTitleLength}
      </div>

      {/* Textarea สำหรับเนื้อหาโพสต์ — Controlled Input */}
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      {/* ปุ่ม Submit */}
      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;
