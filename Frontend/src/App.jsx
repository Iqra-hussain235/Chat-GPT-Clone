import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
// import Login from "./Login.jsx";
// import Signup from "./Signup.jsx";
// import { Route } from 'react-router-dom';
// import { BrowserRouter, Routes, Navigate } from 'react-router-dom';

// import Signup from "./Signup.jsx";
import { v1 as uuidv1} from 'uuid';
import { useNavigate } from 'react-router-dom';

function App(){
    const [prompt,setPrompt]=useState("");
    const [reply,setReply]=useState(null);
    const [currThreadId,setCurrThreadId]=useState(uuidv1());
    const [prevChats,setPrevChats]=useState([]);
    const [newChat,setNewChat]=useState(true);
    const [allThreads,setAllThreads]=useState([]);
      const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [navigate,useNavigate]=useState();
    

    const ProviderValues={
        prompt,setPrompt,
        reply,setReply,
        currThreadId,setCurrThreadId,
        newChat,setNewChat,
        prevChats,setPrevChats,
        allThreads,setAllThreads,

      token, setToken, isLoggedIn, setIsLoggedIn,
      navigate,useNavigate,

    };
    return(
        <>
        <div className='app'>
            <MyContext.Provider value={ProviderValues}>
           <Sidebar></Sidebar> 
            <ChatWindow></ChatWindow>
            </MyContext.Provider>
            {/* <Route path="/" element={ isLoggedIn ? <MyContext/> : <Login/> } />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<Signup/>} />
         */}
        </div>
            {/* <BrowserRouter> */}
                {/* <MyContext.Provider value={ProviderValues}> */}
                    
                    {/* Render sidebar next to content if logged in */}
                    {/* {isLoggedIn && <Sidebar />} */}

                    {/* Main Content Area */}
                    {/* <div className="flex-1 flex flex-col h-full relative">
                        <Routes> */}
                            {/* <Route 
                                path="/api/chat" 
                                element={isLoggedIn ? <ChatWindow /> : <Navigate to="/login" />} 
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            {/* Fallback route */}
                            {/* <Route path="*" element={<Navigate to="/api/chat" />} />
                        </Routes>
                    </div> */}

                {/* </MyContext.Provider>
            </BrowserRouter>
         */}
     
   
    </>
    )
}

export default App;