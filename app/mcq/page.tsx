"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MCQPage() {
  const router = useRouter();

  const questions = [
    {
      question: "HTML stands for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks Text Mark Language",
        "None",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which is a JavaScript framework?",
      options: ["Laravel", "React", "Django", "Flask"],
      answer: "React",
    },
    {
      question: "CSS is used for?",
      options: ["Logic", "Database", "Styling", "Hosting"],
      answer: "Styling",
    },
    {
      question: "Which tag is used for links?",
      options: ["<a>", "<link>", "<href>", "<p>"],
      answer: "<a>",
    },
    {
      question: "Firebase is used for?",
      options: ["Backend", "Frontend", "OS", "Compiler"],
      answer: "Backend",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (qIndex: number, option: string) => {
    const updated = [...answers];
    updated[qIndex] = option;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let count = 0;
    questions.forEach((q, i) => {
      if (q.answer === answers[i]) count++;
    });
    setScore(count);
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MCQ Test</h1>

      {questions.map((q, i) => (
        <div key={i} style={styles.card}>
          <p style={styles.question}>
            {i + 1}. {q.question}
          </p>

          {q.options.map((opt, j) => (
            <label key={j} style={styles.option}>
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                checked={answers[i] === opt}
                onChange={() => handleChange(i, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {!submitted && (
        <button style={styles.button} onClick={handleSubmit}>
          Submit Test
        </button>
      )}

      {submitted && (
        <div style={styles.result}>
          <h2>Score: {score} / 5</h2>

          {score === 5 ? (
            <>
              <p style={{ color: "green", fontWeight: "bold" }}>
                🎉 All correct! Resume upload allowed.
              </p>
              <button
                style={styles.button}
                onClick={() => router.push("/upload")}
              >
                Proceed to Resume Upload
              </button>
            </>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ❌ All answers correct ayithe ne resume upload cheyagalru.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#000",
  },
  option: {
    display: "block",
    marginBottom: "5px",
    color: "#000",
  },
  button: {
    padding: "10px 15px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "15px",
  },
  result: {
    marginTop: "20px",
    textAlign: "center" as const,
  },
};