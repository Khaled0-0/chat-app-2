import React, { useContext } from 'react'
import '../index.css'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer.jsx'
import RightSidebar from '../components/RightSidebar.jsx'
import { ChatContext } from '../../context/ChatContext.jsx'

const HomePage = () => {

   const { selectedUser } = useContext(ChatContext);


   return (
      <div className='layout-screen'>
         <div className={`home-page-style ${selectedUser ? 'grid-1' : 'grid-2'}`}>
            <Sidebar />
            <ChatContainer />
            <RightSidebar />
         </div>
      </div>
   )
}

export default HomePage
