export interface IToolConvertToOptions {
    saveInFile?: string;
}

export interface IToolConvertToMpegOptions extends IToolConvertToOptions {
    bitrate?: number;
}

export type ToolConvertOptions = IToolConvertToMpegOptions;