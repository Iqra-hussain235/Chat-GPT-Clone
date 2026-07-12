import "./ChatWindow.css";
import Chat from './Chat.jsx';
import { MyContext } from "./MyContext.jsx";
import { useContext,useState,useEffect} from "react";

// import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

function ChatWindow() {
    const {prompt,setPrompt,reply,setReply,currThreadId,setPrevChats,prevChats,setNewChat}=useContext(MyContext);
    const [loading,setLoading]=useState(false);
    const [isOpen,setIsOpen]=useState(true);
    const token = localStorage.getItem("token");
    // const navigate = useNavigate();
  


    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};
     
       
  
    const getReply=async()=>{
        setLoading(true);
        setNewChat(false);
        console.log("messa",prompt,"id:",currThreadId);
        const options={

            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId
            })
        };
        try{
         const response = await fetch(`${API_URL}/api/chat`,options);
         const res =await response.json();
         console.log(res);
         setReply(res.reply);
         console.log("reply",reply);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }
   //Append new Chat to previous Chats
   useEffect(()=>{
    if(prompt && reply){
        setPrevChats(preChats=>(
            [...preChats,{role:"user",
                content:prompt},
            {role:"assistant",
                content:reply
            }
            ]
        ))};
   },[reply]);

   const handleProfileClick=()=>{
    setIsOpen(!isOpen);
   }







    return(
    <div className="chatWindow">
        <div className="navbar">
            <span>ILM GPT<i className="fa-solid fa-chevron-down"></i>
            </span>
            <div className="userIconDiv"onClick={handleProfileClick}>
                <span className="userIcon">
                    <i className="fa-solid fa-user"></i>
                </span>
            </div>
        </div>
        {
            isOpen &&
            <div className="dropDown">
                <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
                <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i>SignUp</div>
            </div>
    //          isOpen && (
    //   <div className="dropDown">
    //     <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
    //     <div className="dropDownItem" onClick={() => navigate("/settings")}><i className="fa-solid fa-gear"></i>Settings</div>
    //     {token ? (
    //       <div className="dropDownItem" onClick={handleLogout}>
    //         <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
    //       </div>
    //     ) : (
    //       <>
    //         <div className="dropDownItem" onClick={() => navigate("/login")}>
    //           <i className="fa-solid fa-arrow-right-from-bracket"></i>Login
    //         </div>
    //         <div className="dropDownItem" onClick={() => navigate("/signup")}>
    //           <i className="fa-solid fa-user-plus"></i>SignUp
    //         </div>
    //       </>
    //     )}
        
    //   </div>
    // )
                   
           
        }
        <Chat></Chat>
        {/* <ClimbingBoxLoader  color="#ffff">

        </ClimbingBoxLoader> */}

        <ScaleLoader color="#ffff" loading={loading} size={150}>

        </ScaleLoader>


        <div className="chatInput">
            <div className="inputBox">
                <input placeholder="Ask anything" value={prompt}
                    onChange={(e)=>setPrompt(e.target.value)}
                    >
                               
                </input>
                <div id="submit" onClick={getReply}>
                    <i className="fa-solid fa-paper-plane"></i>
                </div>
            </div>
            <p className="info">
                IlmGPT can make mistakes.check important info.See Cookies Preference.
            </p>
        </div>
       
    </div>
    )
}

export default ChatWindow;