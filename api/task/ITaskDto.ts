import { ITraceable } from "@ts-core/common";
import { IImageTaskDto } from "./IImageTaskDto";
import { ITextTaskDto } from "./ITextTaskDto";
import { AiModel } from "../../ai";

export interface ITaskDto<T extends Task = Task> extends ITraceable {
    task: T;
    model: AiModel;
    session?: string;
}


export declare type ITaskDtoResponse = string | Array<string>

export type Task = ITextTaskDto | IImageTaskDto;