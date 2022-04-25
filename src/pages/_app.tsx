import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../../main.css'
import {CurrentUserProvider } from '../utils/context/CurrentUserContext'


// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <CurrentUserProvider>
    <Component {...pageProps} />
  </CurrentUserProvider>
  ) 
}

export default MyApp
