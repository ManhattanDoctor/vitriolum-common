import { IOpenAiTextProgress, IOpenAiTextResponse } from "../model/openai";
import { Conversation, ConversationMessage } from "../../conversation";
import { IAiTask } from "./IAiTask";

export interface IAiConversationTask extends IAiTask {
    conversation: Conversation;
    messages: Array<ConversationMessage>;
}

export type AiConversationTaskProgress = IOpenAiTextProgress;

export type AiConversationTaskResponse = IOpenAiTextResponse;