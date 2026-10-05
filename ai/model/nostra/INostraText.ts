import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextOptions, IAiToolItem } from "../../../ai";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

/** Модели на собственном сервере: он говорит на языке OpenAI, но адрес и ключ свои */
export interface INostraTextOptions extends IAiTextOptions {
    model: NostraTextModel;
    /** Either an AiToolType value or an mcp server uid */
    tools?: Array<string>;
    maxTokens?: number;
    temperature?: number;
    /** Рассуждение перед ответом: точнее, но в разы дольше, и его токены оплачиваются как выход. По умолчанию выключено */
    isThinking?: boolean;
}

export enum NostraTextModel {
    QWEN_38_27B = 'qwen3.8-27b',
}

/** Models offered for a new selection, the first one is used as the default */
export const NOSTRA_TEXT_MODELS_ACTUAL: Array<NostraTextModel> = [
    NostraTextModel.QWEN_38_27B,
];

export type INostraTextProgress = IAiTextProgress;

export type INostraTextResponse = IAiTextResponse;

export type INostraTextConsumption = IAiTextConsumption;

export interface INostraTextModelDetails {
    models: Array<NostraTextModel>;
    tools: Array<IAiToolItem>;
}

export const NOSTRA_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const NOSTRA_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

/** Сервер держит контекст в 32 768 токенов: задание, история и ответ делят его между собой */
export const NOSTRA_TEXT_OPTIONS_MAX_TOKENS_MIN = 0;
export const NOSTRA_TEXT_OPTIONS_MAX_TOKENS_MAX = 32_768;
