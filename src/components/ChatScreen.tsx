import React, {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Message from './Message'
import  InsertEmoticonIcon  from '@mui/icons-material/InsertEmoticon';
import  MicIcon  from '@mui/icons-material/Mic';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { swrFetcher } from '../api/swrFetcher';


const ChatScreen = ({messages}) => {
  
  const loggedInUser = getLoggedUserId(); 
  const router = useRouter();
  const conv = parseInt(router.query.conv);
  const [input, setInput] = useState('');
  const endOfMessageRef = useRef(null)

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }


  const sendMessage = (e) => {
    e.preventDefault()
    if(input) {
      const timestamp = parseInt(Date.now().toString().substring(0, 10))
      const body = {
        body: input,
        timestamp: timestamp,
        conversationId: conv,
        authorId: loggedInUser,
      };
       
        swrFetcher.message(body, conv)
        setInput('');
        
          refreshData();
          scrollToBottom();
    }
  }
    

  const showMessage = () => {
    if(messages) {
      return messages.map(message => (
        <Message 
          key={message.id}
          authorId={message.authorId}
          body={message.body}
          messageId={message.id}
          conversationId={message.conversationId}
          timestamp={message.timestamp}
        />
      ))
    } 
  }


  return (
    <div>
      <div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b-2 border-b-[#f5f5f5] border-solid">
        <Avatar />
          <div className="">
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
      </div>
      <div className="p-7 bg-[#e5ded8] min-h-[90vh]">
        {showMessage()}
        <div className="mb-14" ref={endOfMessageRef}></div>
      </div>
      <form className="flex items-center p-2 sticky bottom-0 bg-white z-50">
        <InsertEmoticonIcon />
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e);
            }
          }}
          className="flex-1 items-center p-5 sticky bottom-0 bg-[#f5f5f5] z-50 ml-4 mr-4 rounded-xl" type="text" name="" 
        />
        <button 
          hidden 
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >
            Send Message
        </button>
        <MicIcon />
      </form>
    </div>
  )
}

export default ChatScreen
