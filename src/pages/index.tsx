import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import { ssrFetcher } from '../api/ssrFetcher'
import { NextPageContext } from 'next'
import { getLoggedUserId } from '../utils/getLoggedUserId'


const Index = ({users, user}) => {


  return (
    <div className="">
      <Head>
        <title>LebonCoin Support Message App</title>
      </Head>
      <div className="flex">
        <Sidebar users={users} user={user} />
        <div className="flex items-center justify-center flex-col space-y-5 m-auto">
          <h1>Welcome to LebonCoin Support Message App</h1>
          <p>You can start a new conversation with our support team on your left</p>
          <p>Or existant conversations for Follow up</p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ( { query }: NextPageContext) => { 

  const loggedInUser = getLoggedUserId();

  try {
    const users = await ssrFetcher.users()
    const user = await ssrFetcher.user(loggedInUser);

    return {
      props: { users, user },
    };
  } catch (e) {
    console.log(e)
  }
};

export default Index
