import { UnreachableStatementError } from "@ts-core/common";

export enum AiModel {
    GPT_35_TURBO_16K = 'GPT_35_TURBO_16K',
    STABLE_DIFFUSION = 'STABLE_DIFFUSION',
}
export enum AiModelType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
}

export function getAiModelType(model: AiModel): AiModelType {
    switch (model) {
        case AiModel.GPT_35_TURBO_16K:
            return AiModelType.TEXT;
        case AiModel.STABLE_DIFFUSION:
            return AiModelType.IMAGE;
        default:
            throw new UnreachableStatementError(model);
    }
}