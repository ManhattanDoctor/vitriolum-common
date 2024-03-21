export interface IAiTextResponse {
    role: string;
    content: string;
    files?: Array<number>;
}