export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1>DMLess Resume Portal</h1>

      <p>Please complete MCQs to upload your resume.</p>

      <a href="/upload">
        <button
          style={{
            padding: "10px 20px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Go to Upload Page
        </button>
      </a>

      <a href="/admin/login">
        <button
          style={{
            padding: "10px 20px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Admin Login
        </button>
      </a>
    </main>
  );
}