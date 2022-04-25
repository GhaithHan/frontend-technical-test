import { Conversation} from "../types/conversation";
import { User } from "../types/user"
import { Message } from "../types/message"

import axios, {AxiosInstance} from "axios";
import { endpoints } from "./endpoints";

export class Api {

  private readonly httpclient: AxiosInstance;

  constructor(url: string) {
    this.httpclient = axios.create({
      baseURL: url,

      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
    });
  }

  public async users() {
    const res = await this.httpclient.get<User[]>(
      endpoints.GET_USERS
    )
    return res.data;
  } 

  public async user(userId: number) {
    const res = await this.httpclient.get<User[]>(
      endpoints.GET_USER(userId)
    )
    return res.data;
  }

  public async conversations(userId : number) {

    const res = await this.httpclient.get<Conversation[]>(
      endpoints.GET_ALL_CONVERSATIONS(userId)
    )
    return res.data;
  }

  public async conversation(values, userId : number) {
    const res = await this.httpclient.post<Conversation[]>(
      endpoints.CREATE_CONVERSATION(userId),
      values
    )
    return res.data;
  }

  public async deleteConversation(conversationId : number) {
    const res = await this.httpclient.delete<number>(
      endpoints.DELETE_CONVERSATION(conversationId)
    )
    return res.data;
  }

  public async messages(conversationId : number) {
    const res = await this.httpclient.get(
      endpoints.GET_ALL_MESSAGES(conversationId)
    )
    return res.data;
  }

  public async message(values, conversationId) {
    const res = await this.httpclient.post(
      endpoints.CREATE_MESSAGE(conversationId),
      values
    )
    return res.data;
  }

  public async deleteMessage(messageId : number) {
    const res = await this.httpclient.delete<number>(
      endpoints.DELETE_MESSAGE(messageId)
    )
    return res.data;
  }
}