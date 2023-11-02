import { IAiTask } from "./IAiTask";

export interface IAiImageTask extends IAiTask {
    prompt: string;
    negativePrompt?: string;
}
export type IAiImageTaskProgress = Array<string>;
export type IAiImageTaskResponse = Array<string>;