export interface IPingDtoResponse {
    tasks: Record<string, string>;
    status: PingStatus;
    devices: IDevices;
}

enum PingStatus {
    ONLINE = 'Online'
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