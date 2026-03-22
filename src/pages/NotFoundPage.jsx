import { Link } from "react-router-dom";

// หน้า 404
function NotFoundPage() {
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "4rem auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0", color: "#1e40af" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#718096", marginBottom: "2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>

      {/* ลิงก์กลับหน้าหลัก */}
      <Link
        to="/"
        style={{
          color: "#1e40af",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
