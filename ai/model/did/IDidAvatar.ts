export interface IDidAvatarOptions {
    photoFile: number;
    audioFile: number;
    isNeedSubtitles?: boolean;
    isNeedReduceNoise?: boolean;
}

export interface IDidAvatarModelDetails { }

export type IDidAvatarProgress = void;

export type IDidAvatarResponse = string;

export type IDidAvatarConsumption = number;

/*
export const OPEN_AI_STT_OPTIONS_PROMPT_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_PROMPT_MAX_LENGTH = 1024;

export const OPEN_AI_STT_OPTIONS_LANGUAGE_MIN_LENGTH = 2;
export const OPEN_AI_STT_OPTIONS_LANGUAGE_MAX_LENGTH = 24;
*/