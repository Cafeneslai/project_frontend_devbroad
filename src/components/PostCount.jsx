// รับ prop: count — จำนวนโพสต์ทั้งหมด
function PostCount({ count }) {
  return (
    <div style={{ marginBottom: "1rem", color: "#4a5568", fontSize: "0.9rem" }}>
      โพสต์ทั้งหมด: {count} รายการ
    </div>
  );
}

export default PostCount;
