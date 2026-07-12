import "./ChatWindow.css";
import Chat from './Chat.jsx';
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { v1 as uuidv1 } from "uuid";

const API_URL = import.meta.env.VITE_API_URL;

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat, setCurrThreadId } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      const response = await fetch(`${API_URL}/api/chat`, options);
      const res = await response.json();
      setReply(res.reply || "Sorry, I couldn’t generate a response right now.");
    } catch (err) {
      console.log(err);
      setReply("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((preChats) => [
        ...preChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply }
      ]);
    }
  }, [reply]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      getReply();
    }
  };

  const handleClearConversation = () => {
    setPrompt("");
    setReply(null);
    setPrevChats([]);
    setNewChat(true);
    setCurrThreadId(uuidv1());
  };

  const handleCopyReply = async () => {
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chatWindow">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="navbar">
        <div className="brandWrap">
          <span>ILM GPT</span>
        </div>
        <div className="toolbarActions">
          <div className="userIconDiv" onClick={handleProfileClick}>
            <span className="userIcon">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
          <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
          <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i>Sign up</div>
        </div>
      )}

      <div className="chatBody">
        <Chat />
        <ScaleLoader color="#8b5cf6" loading={loading} size={120} />

        <div className="chatInput">
          <div className="inputBox">
            <input
              placeholder="Ask anything... e.g., 'Explain quantum physics'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              title="Type your question and press Enter to search"
            />
            <div id="submit" onClick={getReply}>
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
            </div>
          </div>
          <div className="inputActions">
            <span className="hint">Press Enter to search • AI can make mistakes</span>
            {reply && (
              <button className="ghostBtn small" onClick={handleCopyReply}>
                {copied ? "Copied" : "Copy reply"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;