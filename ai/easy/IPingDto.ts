export interface IPingDtoResponse {
    status: string;
    tasks: Record<string, string>;
    devices: IDevices;
}

export interface IDevices {
    all: Record<string, IDevice>;
    active: Record<string, IDevice>;
    enable_trt: boolean;
}

export interface IDevice {
    name: string;
    [key: string]: string | number;
}