import "./Sidebar.css";
import {useContext} from "react";
import {MyContext} from "./MyContext.jsx";
import {useEffect} from "react";
import logo from "./assets/logo.png";
import { v1 as uuidv1} from 'uuid';


function Sidebar(){
  const {allThreads,setAllThreads,currThreadId,setNewChat,setReply,setPrompt,setCurrThreadId,setPrevChats,isLoggedIn}=useContext(MyContext);

  const getAllThreads=async()=>{
    try{
     const response=await fetch("http://localhost:8080/api/thread");
     const res =await response.json();
     const filteredData=res.map(thread =>({
      threadId:thread.threadId,
      title:thread.title}));
     console.log(filteredData);
     setAllThreads(filteredData);
    }catch(err){
      console.error("Error fetching threads:",err);
    }

  };

  useEffect(()=>{
    getAllThreads();
  },[currThreadId]);
   
  const createNewChat=()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread=async(newThreadId)=>{
    setCurrThreadId(newThreadId);

    try{
     const response=await fetch(`http://localhost:8080/api/thread/${newThreadId}`)
      const res =await response.json();
      console.log("chats for thread:",res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      setPrompt("");

    }catch(err){
      console.error("Error changing thread:",err);
    }
  
  }

  const deleteThread=async(threadId)=>{
    try{
      const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,
        {method:"DELETE"});
        const res = await response.json();
        console.log(res);
        setAllThreads(prev => prev.filter(thread=>thread.threadId !== threadId));
        if(currThreadId === threadId){
          createNewChat();
        }

      }catch(err){
        console.error("Error deleting thread:",err);
      }
  }



    return(
        <section className="sidebar">
        {/* new Chat button */}
        <button onClick={createNewChat} className="button">
         <img src={logo} alt="logo" className="logo" />
        
        <span ><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        {/* list of chats/history */}



        
        <ul className="history">
            
              {
              allThreads?.map((thread,idx)=>(
                <li key={idx} onClick={(e)=>changeThread(thread.threadId)}
                className={thread.threadId === currThreadId ? "highlighted":" "}>
                  {thread.title}
                  <i className="fa-solid fa-trash" onClick={(e)=>{
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}></i>
                </li>
              ))
            }
          
        </ul>

        
          {/* sign */}
          <div className="sign">
            <p>By IqraHussain &hearts;</p>
          </div>
        </section>
        
    )
    

}

export default Sidebar;