import React from 'react'
import { useState } from 'react';
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import { Button } from '@mui/material';
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { swrFetcher } from '../api/swrFetcher'
import useSWR from 'swr';
import { endpoints } from '../api/endpoints';
import Chat from './Chat'
import classNames from 'classnames';
import ConversationModal from './ConversationModal';

const Sidebar = ({users, user}) => {

  const loggedInUser = getLoggedUserId();
  const [navbar, setNavbar] = useState(false);
  const openNavBar = () => {
    setNavbar(!navbar)
  }

  const { data: conversations, isValidating } = useSWR(user.id ? [endpoints.GET_ALL_CONVERSATIONS, user.id] : null, () =>
    swrFetcher.conversations(user.id)
  );
  console.log(conversations);

  return (
    <div className="flex-[0.45] scrollbar-hide border-r-2 border-r-solid border-[#f5f5f5] h-full min-w-[300px] max-w-[350px] overflow-y-scroll">
      <div className="m-[10px] flex sticky top-0 bg-white justify-between items-center p-4 h-20 border-b-2 border-b-gray-300">
          <div className="cursor-pointer hover:opacity-80">
            <Avatar/>
          </div>
          <div className="">
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
          
      </div>
      <div>
        <Button
        className="border-t-2 w-full"
        onClick={openNavBar}
        >
          {navbar ? 'choose a person' : 'Start a new Conversation'}
        </Button>
        <div className={classNames(
          'hidden md:block transition-all min-w-[350px] duration-500 z-[90] text-white fixed bg-black h-full',
          {
            'md:translate-y-[100%] transition-none': !navbar,
          }
        )}>
          <ConversationModal openNavBar={openNavBar} user={user} users={users}/>
        </div>
        </div>

      {conversations?.map(conversation => (
        <Chat     
          key={conversation.id} 
          conversationId={conversation.id}
          senderNickname = {conversation.senderNickname}
          recipientNickname= {conversation.recipientNickname}
          recipientId={conversation.recipientId}
          senderId={conversation.senderId}
          loggedInUserName={user.nickname}
        />
      ))}

    </div>
  )
}

export default Sidebar
