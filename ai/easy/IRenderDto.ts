import { IRenderData } from "./IRenderData";

export interface IRenderDto extends Partial<IRenderData> { }

export interface IRenderDtoResponse {
    task: number;
    queue: number;
    stream: string;
    status: RenderStatus;
}

export enum RenderStatus {
    ONLINE = 'Online'
}