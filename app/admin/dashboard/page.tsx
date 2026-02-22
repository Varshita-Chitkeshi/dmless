"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase";

type Application = {
  name: string;
  email: string;
  score: number;
  resumeUrl: string;
  createdAt?: any;
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const q = query(
        collection(db, "applications"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data() as Application);
      setApplications(data);
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ padding: "30px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ color: "black" }}>Admin Dashboard</h1>

      {applications.length === 0 && (
        <p style={{ color: "black" }}>No applications found.</p>
      )}

      {applications.map((app, index) => (
        <div
          key={index}
          style={{
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <p style={{ color: "black" }}>
            <b>Name:</b> {app.name}
          </p>
          <p style={{ color: "black" }}>
            <b>Email:</b> {app.email}
          </p>
          <p style={{ color: "black" }}>
            <b>MCQ Score:</b> {app.score} / 5
          </p>

          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              color: "blue",
            }}
          >
            View / Download Resume
          </a>
        </div>
      ))}
    </div>
  );
}