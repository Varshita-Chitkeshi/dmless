"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsData = querySnapshot.docs.map((doc) => doc.data());
      setJobs(jobsData);
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Jobs</h1>

      {jobs.map((job, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h2>{job.title}</h2>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> {job.salary}</p>

          <button
            style={{ padding: "8px", marginTop: "10px" }}
            onClick={() => alert("Apply clicked")}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}