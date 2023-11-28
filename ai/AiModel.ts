import { AiTtsModel, AiModelTtsDetails, AiModelTtsOptions } from "./AiTtsModel";
import { AiTextModel, AiModelTextDetails, AiModelTextOptions } from "./AiTextModel";
import { AiImageModel, AiModelImageDetails, AiModelImageOptions } from "./AiImageModel";
import { AiConversationModel, AiModelConversationDetails, AiModelConversationOptions } from "./AiConversationModel";
import { AiModelSttDetails, AiModelSttOptions, AiSttModel } from "./AiSttModel";
import { DateUtil } from "@ts-core/common";

export type AiModel = AiTextModel | AiImageModel | AiTtsModel | AiSttModel | AiConversationModel;
export type AiModelOptions = AiModelTextOptions | AiModelImageOptions | AiModelTtsOptions | AiModelSttOptions | AiModelConversationOptions;
export type AiModelDetails = AiModelTextDetails | AiModelImageDetails | AiModelTtsDetails | AiModelSttDetails | AiModelConversationDetails;

export const AI_MODEL_TIMEOUT = 5 * DateUtil.MILLISECONDS_MINUTE;