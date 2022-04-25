import { Api } from './api';

// the fetcher methof for the server side rendering

export const ssrFetcher = new Api(process.env.API_URL);