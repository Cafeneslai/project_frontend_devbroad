function PostSkeleton() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <div
            style={{
              background: "#e2e8f0",
              borderRadius: "4px",
              height: "24px",
              width: "60%",
              marginBottom: "1rem",
            }}
          ></div>
          <div
            style={{
              background: "#e2e8f0",
              borderRadius: "4px",
              height: "16px",
              width: "100%",
              marginBottom: "0.5rem",
            }}
          ></div>
          <div
            style={{
              background: "#e2e8f0",
              borderRadius: "4px",
              height: "16px",
              width: "80%",
            }}
          ></div>
        </div>
      ))}
    </>
  );
}

export default PostSkeleton;
