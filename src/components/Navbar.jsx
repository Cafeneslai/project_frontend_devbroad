import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  // ดึงข้อมูล favorites จาก context
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex", // จัดให้เนื้อหาอยู่แนวเดียวกัน
        justifyContent: "space-between", // จัดให้เนื้อหาอยู่คนละฝั่ง
        alignItems: "center", // จัดให้เนื้อหาอยู่แนวตั้งตรงกลาง
      }}
    >
      {/* โลโก้ DevBoard */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      {/* เมนู */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* ลิงก์ไปหน้าแรก */}
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>
        {/* ลิงก์ไปหน้าโปรไฟล์ */}
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>
        {/* ลิงก์ไปหน้าถูกใจ */}
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            // ถ้ามีโพสต์ที่ถูกใจ → เปลี่ยนสีพื้นหลังเป็นสีแดง
            background: favorites.length > 0 ? "#e53e3e" : "transparent",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          {/* แสดงจำนวนโพสต์ที่ถูกใจ */}
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
