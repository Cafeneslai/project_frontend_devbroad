// รับ prop: name — ชื่อผู้ใช้, email — อีเมลผู้ใช้
function UserCard({ name, email }) {
  // ตัดชื่อ → เอาตัวอักษรแรกของแต่ละคำ
  // .split(" ") → ตัดชื่อเป็น array
  // .map((n) => n[0]) → เอาตัวอักษรแรกของแต่ละคำ
  // .join("") → รวมเป็น string
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // สุ่มสีพื้นหลังตามความยาวชื่อ
  const colorIndex = name.length % 3;

  let bgColor = "#1e40af"; // Default
  if (colorIndex === 0) {
    bgColor = "#1e40af"; // Blue
  } else if (colorIndex === 1) {
    bgColor = "#16a34a"; // Green
  } else {
    bgColor = "#9333ea"; // Purple
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      {/* วงกลมแสดงตัวอักษรแรกของชื่อ */}
      <div
        style={{
          width: "40px",
          height: "40px",
          background: bgColor,
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {initials}
      </div>

      {/* แสดงชื่อและอีเมล */}
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
