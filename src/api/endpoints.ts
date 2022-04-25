export const endpoints = {
  // users
  GET_USERS: 'users' as const,
  GET_USER: (userId: number) => `/users/${userId}` as const,

  // conversations
  GET_ALL_CONVERSATIONS: (userId: number) => `conversations/${userId}` as const,
  CREATE_CONVERSATION: (userId: number) => `conversations/${userId}` as const,
  DELETE_CONVERSATION: (conversationId: number) => `conversation/${conversationId}` as const,

  // messages 
  GET_ALL_MESSAGES: (conversationId: number) => `messages/${conversationId}` as const,
  CREATE_MESSAGE: (conversationId: number) => `messages/${conversationId}` as const,
  DELETE_MESSAGE: (messageId: number) => `message/${messageId}` as const,
}