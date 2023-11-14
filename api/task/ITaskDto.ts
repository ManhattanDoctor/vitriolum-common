import { ITraceable } from "@ts-core/common";
import { AiModel, AiModelTextOptions } from "../../ai";
import { IAiImageTask, AiImageTaskProgress, AiImageTaskResponse, IAiTextTask, IAiTextTaskProgress, IAiTextTaskResponse } from "../../ai/task";
import { AiModelImageOptions } from "../../ai";

export interface ITaskDto<T extends ITaskTask = ITaskTask, O extends ITaskOptions = ITaskOptions> extends ITraceable {
    task: T;
    model: AiModel;
    options: O;
}

export type ITaskTask = IAiTextTask | IAiImageTask;
export type ITaskOptions = AiModelTextOptions | AiModelImageOptions;
export type ITaskProgress = IAiTextTaskProgress | AiImageTaskProgress;
export type ITaskDtoResponse = IAiTextTaskResponse | AiImageTaskResponse;
