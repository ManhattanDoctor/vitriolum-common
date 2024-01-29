import { ExtendedError } from "@ts-core/common";

export interface IOpenAiAgentEventDto {
    id: number;
    error?: ExtendedError;
}
