import { ITraceable } from "@ts-core/common";
import { AiModelConsumption, AiModel, AiModelDetails, AiModelOptions } from "../../ai";
import { IAiImageTask, AiImageTaskProgress, AiImageTaskResponse, IAiTextTask, AiTextTaskProgress, AiTextTaskResponse, IAiTtsTask, AiTtsTaskProgress, AiTtsTaskResponse, IAiConversationTask, AiConversationTaskProgress, AiConversationTaskResponse } from "../../ai/task";

export interface ITaskDto<T extends ITaskTask = ITaskTask, M extends ITaskModel = ITaskModel, O extends ITaskOptions = ITaskOptions> extends ITraceable {
    task: T;
    model: M;
    options: O;
}

export type ITaskModel = AiModel;
export type ITaskOptions = AiModelOptions;
export type ITaskDetails = AiModelDetails;
export type ITaskConsumption = AiModelConsumption;

export type ITaskTask = IAiTextTask | IAiImageTask | IAiTtsTask | IAiConversationTask;
export type ITaskProgress = AiTextTaskProgress | AiImageTaskProgress | AiTtsTaskProgress | AiConversationTaskProgress;
export type ITaskDtoResponse = AiTextTaskResponse | AiImageTaskResponse | AiTtsTaskResponse | AiConversationTaskResponse;
