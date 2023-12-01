import { Conversation, ConversationMessage } from "../../conversation";
import { IAiTask } from "./IAiTask";

export interface IAiConversationTask extends IAiTask {
    conversation: Conversation;
    messages: Array<ConversationMessage>;
}

export type AiConversationTaskProgress = string;

export type AiConversationTaskResponse = string;