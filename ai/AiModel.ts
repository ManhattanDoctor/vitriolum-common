import { AiImageModel } from "./AiImageModel";
import { AiTextModel } from "./AiTextModel";

export type AiModel = AiTextModel | AiImageModel;
export type AiModelDetails = IAiTextModelDetails | IAiImageModelDetails;

export interface IAiTextModelDetails {
    models: Array<string>;
}

export interface IAiImageModelDetails {
    models: Array<string>;
}
