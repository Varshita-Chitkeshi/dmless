"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type Application = {
  id: string;
  name: string;
  email: string;
  resumeUrl: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Protect admin page
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  // 📄 Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const snapshot = await getDocs(collection(db, "applications"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Application, "id">),
        }));
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td style={styles.td}>{app.name}</td>
                <td style={styles.td}>{app.email}</td>
                <td style={styles.td}>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logout: {
    padding: "8px 14px",
    background: "#ef4444",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "6px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#020617",
  },
  th: {
    border: "1px solid #334155",
    padding: "12px",
    backgroundColor: "#1e293b",
  },
  td: {
    border: "1px solid #334155",
    padding: "12px",
  },
  link: {
    color: "#38bdf8",
    textDecoration: "underline",
  },
};