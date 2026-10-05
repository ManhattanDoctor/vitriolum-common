import { IOpenAiTextOptions, IOpenAiTextConsumption, IOpenAiTextModelDetails } from "./model/openai";
import { IGigaChatTextOptions, IGigaChatTextConsumption, IGigaChatTextModelDetails } from "./model/gigachat";
import { IAnthropicTextOptions, IAnthropicTextConsumption, IAnthropicTextModelDetails } from "./model/anthropic";
import { INostraTextOptions, INostraTextConsumption, INostraTextModelDetails } from "./model/nostra";

export enum AiConversationModel {
    OPEN_AI = 'OPEN_AI_CONVERSATION',
    GIGA_CHAT = 'GIGA_CHAT_CONVERSATION',
    ANTHROPIC = 'ANTHROPIC_CONVERSATION',
    NOSTRA = 'NOSTRA_CONVERSATION'
}

export type AiModelConversationOptions = IOpenAiTextOptions | IGigaChatTextOptions | IAnthropicTextOptions | INostraTextOptions;
export type AiModelConversationDetails = IOpenAiTextModelDetails | IGigaChatTextModelDetails | IAnthropicTextModelDetails | INostraTextModelDetails;
export type AiModelConversationConsumption = IOpenAiTextConsumption | IGigaChatTextConsumption | IAnthropicTextConsumption | INostraTextConsumption;
