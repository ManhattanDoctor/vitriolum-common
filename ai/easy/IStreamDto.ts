import { IRenderData } from "./IRenderData";

export interface IStreamDto {
    status: StreamStatus;
    render_request: IRenderData;
}

export enum StreamStatus {
    
}