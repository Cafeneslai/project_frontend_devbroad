import UserList from "../components/UserList";

// หน้าโปรไฟล์
function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* แสดงรายการผู้ใช้ */}
      <UserList />
    </div>
  );
}

export default ProfilePage;
