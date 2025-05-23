import React, { useContext } from 'react'
import '../index.css'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/chatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

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
