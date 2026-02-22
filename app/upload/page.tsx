"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");

  const correct = q1 === "react" && q2 === "firebase";

  const handleSubmit = async () => {
    if (!correct) {
      alert("All MCQs must be correct to upload resume");
      return;
    }

    if (!resumeLink) {
      alert("Please paste resume link");
      return;
    }

    await addDoc(collection(db, "resumes"), {
      name,
      email,
      resumeLink,
      createdAt: serverTimestamp(),
    });

    alert("Resume submitted successfully!");
    router.push("/");
  };

  return (
    <main style={{ padding: 30 }}>
      <h2>Resume Upload</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <h4>MCQs (must be correct)</h4>

      <p>1️⃣ React is a ___ library?</p>
      <input value={q1} onChange={(e) => setQ1(e.target.value)} />

      <p>2️⃣ Firebase is a ___ platform?</p>
      <input value={q2} onChange={(e) => setQ2(e.target.value)} />

      <br /><br />

      <input
        placeholder="Paste Resume Link (Google Drive / Dropbox)"
        value={resumeLink}
        onChange={(e) => setResumeLink(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={!correct}>
        Submit Resume
      </button>

      {!correct && <p style={{ color: "red" }}>Answer all MCQs correctly</p>}
    </main>
  );
}