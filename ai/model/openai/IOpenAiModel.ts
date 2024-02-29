import { AiTool } from "../../AiTool";

export interface IOpenAiModelDetails<T> {
    tools: Array<AiTool>;
    models: Array<T>;
}