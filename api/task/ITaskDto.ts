import { ITraceable } from "@ts-core/common";
import { AiModel, AiModelOptions } from "../../ai";
import { IAiImageTask, IAiImageTaskProgress, IAiImageTaskResponse, IAiTextTask, IAiTextTaskProgress, IAiTextTaskResponse } from "../../ai/task";

export interface ITaskDto<T extends ITaskTask = ITaskTask> extends ITraceable {
    task: T;
    model: AiModel;
    options?: AiModelOptions;
}

export type ITaskTask = IAiTextTask | IAiImageTask;
export type ITaskProgress = IAiTextTaskProgress | IAiImageTaskProgress;
export type ITaskDtoResponse = IAiTextTaskResponse | IAiImageTaskResponse;
