import { IAiToolConsumption } from "../AiTool";

export interface IAiTextConsumption {
    model: IAiModelConsumption;
    tools?: Array<IAiToolConsumption>;
}

export interface IAiModelConsumption {
    input: number;
    output: number;
}