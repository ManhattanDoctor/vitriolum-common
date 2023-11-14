import { AiTextModel, AiModelTextDetails } from "./AiTextModel";
import { AiImageModel, AiModelImageDetails } from "./AiImageModel";
import { DateUtil } from "@ts-core/common";

export type AiModel = AiTextModel | AiImageModel;
export type AiModelDetails = AiModelTextDetails | AiModelImageDetails;

export const AI_MODEL_TIMEOUT = 5 * DateUtil.MILLISECONDS_MINUTE;