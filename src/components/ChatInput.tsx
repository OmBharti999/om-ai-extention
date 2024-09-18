import { useState, useRef } from "react";
import type { Conversations } from "../types";
// import { getAIResponse } from "../config/chatgpt";

const styles = {
  container: {
    color: "white",
    backgroundColor: "#181C14",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  chatContainer: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "1rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  messageGroup: {
    display: "flex",
    gap: "1rem",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    fontWeight: "bold" as const,
  },
  userAvatar: {
    backgroundColor: "#5436DA",
  },
  assistantAvatar: {
    backgroundColor: "#10a37f",
  },
  message: {
    flex: 1,
    padding: "0.5rem 0",
    lineHeight: "1.5",
  },
  inputContainer: {
    borderTop: "1px solid #d1d5db",
    padding: "1rem",
  },
  form: {
    maxWidth: "48rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
  },
  inputWrapper: {
    position: "relative" as const,
    width: "100%",
  },
  textarea: {
    width: "100%",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    background: "#343131",
    color: "white",
    padding: "0.75rem 2.5rem 0.75rem 1rem",
    fontSize: "1rem",
    boxSizing: "border-box" as const,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    outline: "none",
    maxHeight: "200px",
    minHeight: "44px",
    resize: "none" as const,
    overflowY: "auto" as const,
  },
  button: {
    position: "absolute" as const,
    bottom: "0.5rem",
    right: "0.625rem",
    borderRadius: "0.25rem",
    padding: "0.25rem",
    color: "#ececf1",
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
    color: "#8e8ea0",
    textAlign: "center" as const,
  },
};

async function getChatGPTResponse(userPrompt: string) {
  try {
    const res =
      "Hi, sorry we don't have access to api so currently showing this " +
      userPrompt;
    // [TODO]: use  the OpenAI API to get the response
    // const res = await getAIResponse({ prompt: userPrompt });
    return res;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw "You exceeded the maximum number of queries. Please try again.";
  }
}

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [conversations, setConversations] = useState<Conversations[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        setError("");
        const chatgptResponse = await getChatGPTResponse(message);
        setConversations([
          ...conversations,
          { role: "user", content: message },
          { role: "assistant", content: chatgptResponse ?? "" },
        ]);
        setMessage("");
      } catch (error: unknown) {
        setError(error as string);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div ref={chatContainerRef} style={styles.chatContainer}>
        {conversations.map((conversation, index) => (
          <div key={index} style={styles.messageGroup}>
            <div
              style={{
                ...styles.avatar,
                ...(conversation.role === "user"
                  ? styles.userAvatar
                  : styles.assistantAvatar),
              }}
            >
              {conversation.role === "user" ? "U" : "A"}
            </div>
            <div style={styles.message}>{conversation.content}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div style={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
              style={styles.textarea}
              rows={1}
            />
            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: message.trim() ? 1 : 0.5,
              }}
              disabled={!message.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4379F2"
                style={styles.sendIcon}
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
          <p style={styles.disclaimer}>
            Om AI can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>
    </div>
  );
}
