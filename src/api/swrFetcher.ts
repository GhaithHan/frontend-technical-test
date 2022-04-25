import { Api } from './api';

//  the fetcher method for the client side rendering
//  NEXT_PUBLIC before global variables expose it to the client side 

export const swrFetcher = new Api(process.env.NEXT_PUBLIC_API_URL);