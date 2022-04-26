import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { User } from '../types/user';
import { swrFetcher } from '../api/swrFetcher';


const ConversationModal = ({ openNavBar, user, users }) => {

  const router = useRouter();
  const [filter, setFilter] = useState('');
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const createConversation = async (contact: User) => {

    const conversationCreated = {
      recipientId: contact.id,
      recipientNickname: contact.nickname,
      senderId: user.id,
      senderNickname: user.nickname,
      lastMessageTimeStamp: 0,
    };
    swrFetcher.conversation(conversationCreated, user.id)
        openNavBar()
        refreshData();
        swrFetcher.conversations(user.id)
  };


  return (
    <>
        <p className="text-white">new conv</p>
        <input
          type='text'
          placeholder='Saissez un nom'
          className="border-none w-full p-2 bg-gray-200"
          onInput={(e) => {
            setFilter(e.currentTarget.value);
          }}
        />
        <div className="flex column justify-center">
          {users
              .filter((contact) => {
                if (filter === '') return contact;
                if (
                  contact.nickname.toLowerCase().includes(filter.toLowerCase())
                )
                  return contact;
              })
              .map((contact) => {
                return (
                  <p
                    key={contact.id}
                    className="p-3 flex items-center cursor-pointer"
                    onClick={() => createConversation(contact)}
                  >
                    {contact.nickname}
                  </p>
                );
              })
          }
          </div>
    </>
  );
};

export default ConversationModal;
