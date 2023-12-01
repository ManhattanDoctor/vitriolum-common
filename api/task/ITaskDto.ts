import { ITraceable } from "@ts-core/common";
import { AiModel, AiModelDetails, AiModelOptions } from "../../ai";
import { IAiImageTask, AiImageTaskProgress, AiImageTaskResponse, IAiTextTask, AiTextTaskProgress, AiTextTaskResponse, IAiTtsTask, AiTtsTaskProgress, AiTtsTaskResponse, IAiConversationTask, AiConversationTaskProgress, AiConversationTaskResponse } from "../../ai/task";

export interface ITaskDto<T extends ITaskTask = ITaskTask, O extends ITaskOptions = ITaskOptions> extends ITraceable {
    task: T;
    model: AiModel;
    options: O;
}

export type ITaskTask = IAiTextTask | IAiImageTask | IAiTtsTask | IAiConversationTask;
export type ITaskOptions = AiModelOptions;
export type ITaskModelDetails = AiModelDetails;
export type ITaskProgress = AiTextTaskProgress | AiImageTaskProgress | AiTtsTaskProgress | AiConversationTaskProgress;
export type ITaskDtoResponse = AiTextTaskResponse | AiImageTaskResponse | AiTtsTaskResponse | AiConversationTaskResponse;
