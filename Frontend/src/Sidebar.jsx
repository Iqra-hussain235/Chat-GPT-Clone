import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import logo from "./assets/logo.png";
import { v1 as uuidv1 } from 'uuid';

const API_URL = import.meta.env.VITE_API_URL;

function Sidebar() {
  const { allThreads, setAllThreads, currThreadId, setNewChat, setReply, setPrompt, setCurrThreadId, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${API_URL}/api/thread`);
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.error("Error fetching threads:", err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(`${API_URL}/api/thread/${newThreadId}`);
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      setPrompt("");
    } catch (err) {
      console.error("Error changing thread:", err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`${API_URL}/api/thread/${threadId}`, { method: "DELETE" });
      const res = await response.json();
      setAllThreads((prev) => prev.filter((thread) => thread.threadId !== threadId));
      if (currThreadId === threadId) {
        createNewChat();
      }
    } catch (err) {
      console.error("Error deleting thread:", err);
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <section className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebarTop">
        <div className="sidebarHeader">
          {!collapsed && (
            <button onClick={createNewChat} className="button">
              <img src={logo} alt="logo" className="logo" />
              <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
          )}
          <button onClick={toggleSidebar} className="toggleSidebarBtn" aria-label="Toggle sidebar">
            <i className={`fa-solid ${collapsed ? "fa-bars" : "fa-xmark"}`}></i>
          </button>
        </div>

        {!collapsed && (
          <>
            <div className="sidebarHint">
              <p>Recent threads</p>
              <span>Stay in flow with your latest ideas</span>
            </div>

            <ul className="history">
              {allThreads?.map((thread, idx) => (
                <li
                  key={idx}
                  onClick={() => changeThread(thread.threadId)}
                  className={thread.threadId === currThreadId ? "highlighted" : ""}
                >
                  {thread.title}
                  <i
                    className="fa-solid fa-trash"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteThread(thread.threadId);
                    }}
                  ></i>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {!collapsed && (
        <div className="sign">
          <p>By IqraHussain &hearts;</p>
        </div>
      )}
    </section>
  );
}

export default Sidebar;