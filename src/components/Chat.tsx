import React from 'react'
import { Avatar } from '@mui/material'
import {useRouter} from 'next/router'

interface ChatProps {
  senderNickname: string,
  recipientNickname: string,
  recipientId: number,
  senderId: number,
  conversationId: number,
  loggedInUserName: string,
}

const Chat = ({senderNickname, recipientNickname, recipientId, senderId, conversationId, loggedInUserName }: ChatProps) => {
  const router = useRouter()

  const isSender = loggedInUserName === senderNickname; 
  const contactId = isSender ? recipientId : senderId;

  const enterChat = () => {
    router.push(`/chat?conv=${conversationId}&contactId=${contactId}`)
  }

  return (
    <div onClick={enterChat} className="flex items-center cursor-pointer p-4 break-words hover:bg-[#e9eaeb]">
      <Avatar className="m-2 mr-4" />
      {isSender ? recipientNickname : senderNickname}
    </div>
  )
}

export default Chat
