import { IOpenAiImageDalle2ModelDetails, IOpenAiImageDalle2Options } from "./IOpenAiImageDalle2";
import { IOpenAiImageDalle3ModelDetails, IOpenAiImageDalle3Options } from "./IOpenAiImageDalle3";
import { IAiImage } from "../../AiImageModel";

export type IOpenAiImageOptions = IOpenAiImageDalle2Options | IOpenAiImageDalle3Options;

export type IOpenAiImageModelDetails = IOpenAiImageDalle2ModelDetails | IOpenAiImageDalle3ModelDetails

export type IOpenAiImageProgress = void;

export type IOpenAiImageResponse = Array<IAiImage>;

export type IOpenAiImageConsumption = number;
