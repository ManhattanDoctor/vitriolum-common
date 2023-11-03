import { ITraceable } from "@ts-core/common";
import { AiModel, IAiModelTextOptions, IAiModelImageOptions } from "../../ai";
import { IAiImageTask, IAiImageTaskProgress, IAiImageTaskResponse, IAiTextTask, IAiTextTaskProgress, IAiTextTaskResponse } from "../../ai/task";

export interface ITaskDto<T extends ITaskTask = ITaskTask, O extends ITaskOptions = ITaskOptions> extends ITraceable {
    task: T;
    model: AiModel;
    options: O;
}

export type ITaskTask = IAiTextTask | IAiImageTask;
export type ITaskOptions = IAiModelTextOptions | IAiModelImageOptions;
export type ITaskProgress = IAiTextTaskProgress | IAiImageTaskProgress;
export type ITaskDtoResponse = IAiTextTaskResponse | IAiImageTaskResponse;
