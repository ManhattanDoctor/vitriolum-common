import { ITraceable } from "@ts-core/common";
import { IImageTaskDto } from "./IImageTaskDto";
import { ITextTaskDto } from "./ITextTaskDto";
import { AiModel } from "../../ai";

export interface ITaskDto<T extends Task> extends ITraceable {
    task: T;
    model: AiModel;
    session?: string;
}

export type Task = ITextTaskDto | IImageTaskDto;