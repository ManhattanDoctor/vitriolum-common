import { DateUtil } from "@ts-core/common";
import { AiTtsModel, AiModelTtsDetails, AiModelTtsOptions } from "./AiTtsModel";
import { AiAvatarModel, AiModelAvatarConsumption, AiModelAvatarDetails, AiModelAvatarOptions } from "./AiAvatarModel";
import { AiTextModel, AiModelTextDetails, AiModelTextOptions, AiModelTextConsumption } from "./AiTextModel";
import { AiImageModel, AiModelImageDetails, AiModelImageOptions, AiModelImageConsumption } from "./AiImageModel";
import { AiConversationModel, AiModelConversationDetails, AiModelConversationOptions, AiModelConversationConsumption } from "./AiConversationModel";
import { AiModelSttDetails, AiModelSttOptions, AiSttModel } from "./AiSttModel";

export type AiModel = AiTextModel | AiImageModel | AiTtsModel | AiSttModel | AiConversationModel | AiAvatarModel;
export type AiModelOptions = AiModelTextOptions | AiModelImageOptions | AiModelTtsOptions | AiModelSttOptions | AiModelConversationOptions | AiModelAvatarOptions;
export type AiModelDetails = AiModelTextDetails | AiModelImageDetails | AiModelTtsDetails | AiModelSttDetails | AiModelConversationDetails | AiModelAvatarDetails;
export type AiModelConsumption = AiModelTextConsumption | AiModelImageConsumption | AiModelConversationConsumption | AiModelConversationConsumption | AiModelAvatarConsumption;

export const AI_MODEL_TIMEOUT = 10 * DateUtil.MILLISECONDS_MINUTE;
export const AI_MODEL_RETRIES = 10;