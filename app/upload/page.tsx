"use client";

import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload resume");

    setLoading(true);

    try {
      // 1️⃣ Upload resume
      const storageRef = ref(storage, `resumes/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const resumeUrl = await getDownloadURL(storageRef);

      // 2️⃣ Save to Firestore
      await addDoc(collection(db, "applications"), {
        name,
        email,
        resumeUrl,
        createdAt: new Date(),
      });

      // 3️⃣ Redirect
      router.push("/success");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Apply Now</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />

        <button disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    width: "300px",
  },
};