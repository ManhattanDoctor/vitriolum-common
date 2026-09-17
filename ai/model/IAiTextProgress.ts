import { IAiToolProgress } from "../AiTool";

export interface IAiTextProgress {
    /** The tools working right now: the model may call several of them at once */
    tools?: Array<IAiToolProgress>;
    value: string;
}
