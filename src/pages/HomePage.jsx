import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

// หน้าแรก
function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* ฟอร์มสำหรับเพิ่มโพสต์ */}
      <AddPostForm onAddPost={() => {}} />
      <PostList />
    </div>
  );
}

export default HomePage;
