import { AiImageModel, IAiModelImageOptions } from "./AiImageModel";
import { AiTextModel, IAiModelTextOptions } from "./AiTextModel";

export type AiModel = AiTextModel | AiImageModel;

export type IAiModelOptions = IAiModelTextOptions | IAiModelImageOptions;
