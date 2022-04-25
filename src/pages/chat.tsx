import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { ssrFetcher } from '../api/ssrFetcher'
import ChatScreen from '../components/ChatScreen'
import Sidebar from '../components/Sidebar'
import { getLoggedUserId } from '../utils/getLoggedUserId'

const Chat = ({user, users, messages}) => {

  const router = useRouter()
  const contact = router.query.contactId;
  
  return (
    <div className="flex">
      <Head>
        <title>Chat with </title>
      </Head>
      <Sidebar user={user} users={users}/>
      <div className="flex-1 overflow-scroll h-screen">
        <ChatScreen messages={messages} />
      </div>
    </div>
  )
}

export default Chat

export const getServerSideProps = async ( context) => { 

  const loggedInUser = getLoggedUserId();
  // retrieving messages from the server side to make them appear fast and enhance the user experience
  try {
    const messages = await ssrFetcher.messages(context.query.conv);
    const users = await ssrFetcher.users()
    const user = await ssrFetcher.user(loggedInUser);

    return {
      props: { users, user, messages },
    };
  } catch (e) {
    console.log(e)
  }
};
