export interface IStableImageOptions {
    seed: number;
    model: string;
    width: number;
    height: number;
    quality: number;
    outputs: number;
    guidanceScale: number;
    inferenceSteps: number;
    negativePrompt: string;
    isUsedRandomSeed: boolean;

    initImage?: string;
    controlImage?: string;
    controlImageModel?: string;
}