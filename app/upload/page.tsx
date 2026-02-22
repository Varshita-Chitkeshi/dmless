"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../firebase";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!name || !email || !file) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      // 🔹 1. upload resume to Firebase Storage
      const storageRef = ref(
        storage,
        `resumes/${Date.now()}-${file.name}`
      );

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // 🔹 2. save data in Firestore
      await addDoc(collection(db, "resumes"), {
        name,
        email,
        resumeUrl: downloadURL,
        createdAt: Timestamp.now(),
      });

      alert("Resume uploaded successfully ✅");
      router.push("/thank-you"); // optional

    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h2>Resume Upload</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}