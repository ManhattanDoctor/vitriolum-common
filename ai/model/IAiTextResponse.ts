import { File } from "../../file";

export interface IAiTextResponse {
    role: string;
    content: string;
    files?: Array<File>;
}