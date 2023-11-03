import { ITraceable } from "@ts-core/common";
import { AiModel, IAiModelOptions } from "../../ai";
import { IAiImageTask, IAiImageTaskProgress, IAiImageTaskResponse, IAiTextTask, IAiTextTaskProgress, IAiTextTaskResponse } from "../../ai/task";

export interface ITaskDto<T extends ITaskTask = ITaskTask, O extends IAiModelOptions = IAiModelOptions> extends ITraceable {
    task: T;
    model: AiModel;
    options: O;
}

export type ITaskTask = IAiTextTask | IAiImageTask;
export type ITaskProgress = IAiTextTaskProgress | IAiImageTaskProgress;
export type ITaskDtoResponse = IAiTextTaskResponse | IAiImageTaskResponse;
