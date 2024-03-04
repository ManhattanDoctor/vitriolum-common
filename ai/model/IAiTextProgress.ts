import { AiToolType } from "../AiTool";

export interface IAiTextProgress {
    tool?: AiToolType;
    value: string;
}