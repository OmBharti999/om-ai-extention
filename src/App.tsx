import { EditorContent, useEditor } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import "./App.css";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import {
  //  Dispatch, SetStateAction,
  useState,
} from "react";
import { getAIResponse, main } from "./config/chatgpt";
// import axios from "axios";

const DEFAULT_TEXT = `The Paragraph extension is not required, but it's very likely you want to use it. It's needed to write paragraphs of text. 🤓`;

const AbcEditor = ({
  // setText,
  text = DEFAULT_TEXT,
}: {
  text: string;
  // setText?: Dispatch<SetStateAction<string>>;
}) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: `
        <p>${text}</p>
      `,
    onCreate(props) {
      console.log(props);
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

function App() {
  const [text, setText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async () => {
    try {
      // const response = await axios.post(
      //   "https://api.openai.com/v1/completions",
      //   {
      //     model: "gpt-4o-mini", // or GPT-4 if you have access
      //     prompt: text,
      //     max_tokens: 100,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer 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`,
      //     },
      //   }
      // );
      const res2 = await main();
      const res = await getAIResponse({ prompt: text });
      console.log("🚀 ~ handleSubmit ~ res2:", res2)
      console.log("🚀 ~ handleSubmit ~ res:", res);
      setResponseText(res);
    } catch (error) {
      console.error("Error with OpenAI API:", error);
    }
  };

  // const onClick = async () => {
  //   const [tab] = await chrome.tabs.query({ active: true });

  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       document.body.style.backgroundColor = "red";
  //       alert("Hello world");
  //     },
  //   });
  // };

  return (
    <div>
      Hello world
      <div className=""></div>
      <textarea
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>CLick me now</button>
      <div className="">
        <AbcEditor text={responseText} />
      </div>
    </div>
  );
}

export default App;
