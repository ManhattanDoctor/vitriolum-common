import { RandomUtil } from "@ts-core/common";
import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE = 'STABLE',
}

export type AiModelImageOptions = IStableImageOptions;
export type AiModelImageDetails = IStableImageModelDetails;

export function getRandomSeed(): number {
    return RandomUtil.randomNumber(AI_MODEL_IMAGE_OPTIONS_SEED_MIN, AI_MODEL_IMAGE_OPTIONS_SEED_MAX)
}

export const AI_MODEL_IMAGE_OPTIONS_MODEL_MIN_LENGTH = 4;
export const AI_MODEL_IMAGE_OPTIONS_MODEL_MAX_LENGTH = 128;

export const AI_MODEL_IMAGE_OPTIONS_SEED_MIN = 1;
export const AI_MODEL_IMAGE_OPTIONS_SEED_MAX = 999999999;

export const AI_MODEL_IMAGE_OPTIONS_WIDTH_MIN = 128;
export const AI_MODEL_IMAGE_OPTIONS_WIDTH_MAX = 4096;

export const AI_MODEL_IMAGE_OPTIONS_HEIGHT_MIN = 4;
export const AI_MODEL_IMAGE_OPTIONS_HEIGHT_MAX = 4096;

export const AI_MODEL_IMAGE_OPTIONS_QUALITY_MIN = 10;
export const AI_MODEL_IMAGE_OPTIONS_QUALITY_MAX = 95;

export const AI_MODEL_IMAGE_OPTIONS_OUTPUTS_MIN = 1;
export const AI_MODEL_IMAGE_OPTIONS_OUTPUTS_MAX = 4;

export const AI_MODEL_IMAGE_OPTIONS_INFERENCE_STEPS_MIN = 10;
export const AI_MODEL_IMAGE_OPTIONS_INFERENCE_STEPS_MAX = 75;

export const AI_MODEL_IMAGE_OPTIONS_GUIDANCE_SCALE_MIN = 1.1;
export const AI_MODEL_IMAGE_OPTIONS_GUIDANCE_SCALE_MAX = 50;

export const AI_MODEL_IMAGE_OPTIONS_NEGATIVE_PROMPT_MIN_LENGTH = 4;
export const AI_MODEL_IMAGE_OPTIONS_NEGATIVE_PROMPT_MAX_LENGTH = 1024;