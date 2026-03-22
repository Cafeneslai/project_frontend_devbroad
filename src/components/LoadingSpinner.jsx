function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      {/* วงกลมหมุนๆ */}
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTopColor: "#1e40af",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      {/* ข้อความกำลังโหลด */}
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>
      {/* CSS สำหรับวงกลมหมุนๆ */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingSpinner;
