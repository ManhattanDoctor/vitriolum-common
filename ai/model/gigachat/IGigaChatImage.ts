import { IAiImage } from "../../AiImageModel";

export interface IGigaChatImageOptions { }

export interface IGigaChatImageModelDetails { }

export type IGigaChatImageProgress = void;

export type IGigaChatImageResponse = Array<IAiImage>;

export interface IGigaChatImageConsumption {
    input: number;
    output: number;
}