import { useState, useRef, useEffect } from "react";
import { getAIResponse } from "../config/chatgpt";

const styles = {
  container: {
    background: "black",
    paddingBottom: "2rem",
    paddingTop: "6rem",
    minHeight: "100vh",
  },
  form: {
    maxWidth: "48rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
    padding: "0 1rem",
  },
  inputWrapper: {
    position: "relative" as const,
    width: "100%",
  },
  textarea: {
    width: "100%",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    padding: "1rem",
    paddingRight: "3rem",
    fontSize: "0.875rem",
    boxSizing: "border-box",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    outline: "none",
    maxHeight: "200px",
    minHeight: "44px",
    resize: "none" as const,
    overflowY: "hidden",
  },
  button: {
    position: "absolute" as const,
    bottom: "0.5rem",
    right: "0.625rem",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    color: "#2563eb",
    transition: "opacity 0.2s",
    background: "black",
    border: "none",
    cursor: "pointer",
  },
  sendIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  disclaimer: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
};

async function getChatGPTResponse(userPrompt: string) {
  try {
    const res = await getAIResponse({ prompt: userPrompt });
    // console.log("🚀 ~ handleSubmit ~ res:", res);
    return res;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw "You exceeded the maximum number of queries. Please try again.";
  }
}

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust based on content
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        setError("");
        console.log("Sending message:", message);
        const res = await getChatGPTResponse(message);
        console.log("🚀 ~ handleSubmit ~ res:", res);
        setMessage(res ?? ""); // Reset message input after sending
      } catch (error: unknown) {
        setError(error as string);
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {
            error && (
                <div style={{color: "red"}}>
                  {error}
                </div>
            )
        }
        <div style={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            style={styles.textarea}
            rows={1} // Ensures that textarea starts with one row and expands
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: message.trim() ? 1 : 0.2,
            }}
            disabled={!message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={styles.sendIcon}
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <p style={styles.disclaimer}>
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  );
}
