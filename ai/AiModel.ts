import { AiTtsModel, AiModelTtsDetails, AiModelTtsOptions } from "./AiTtsModel";
import { AiTextModel, AiModelTextDetails, AiModelTextOptions } from "./AiTextModel";
import { AiImageModel, AiModelImageDetails, AiModelImageOptions } from "./AiImageModel";
import { AiModelSttDetails, AiModelSttOptions, AiSttModel } from "./AiSttModel";
import { DateUtil } from "@ts-core/common";

export type AiModel = AiTextModel | AiImageModel | AiTtsModel | AiSttModel;
export type AiModelOptions = AiModelTextOptions | AiModelImageOptions | AiModelTtsOptions | AiModelSttOptions;
export type AiModelDetails = AiModelTextDetails | AiModelImageDetails | AiModelTtsDetails | AiModelSttDetails;

export const AI_MODEL_TIMEOUT = 5 * DateUtil.MILLISECONDS_MINUTE;