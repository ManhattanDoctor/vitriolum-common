
export enum AiTaskEvent {
    PROGRESSED = 'PROGRESSED'
}
export interface IAiTaskProgress<T> {
    data?: T;
    total?: number;
    percent?: number;
    current?: number;
}