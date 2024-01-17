import { IOpenAiTextProgress, IOpenAiTextResponse, OpenAiAgent, OpenAiAgentMessage } from "../model/openai";
import { IAiTask } from "./IAiTask";

export interface IAiOpenAiAgentTask extends IAiTask {
    agent: OpenAiAgent;
    messages: Array<OpenAiAgentMessage>;
}

export type AiOpenAiAgentTaskProgress = IOpenAiTextProgress;

export type AiOpenAiAgentTaskResponse = IOpenAiTextResponse;