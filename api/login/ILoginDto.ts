import { ITraceable } from '@ts-core/common';
import { LoginResource } from './LoginResource';
import { TgUser } from '@ts-core/oauth';

export interface IOAuthDto {
    codeOrToken: string;
    redirectUri: string;
}

export interface IEthSignatureDto {
    address: string;
    signature: string;
}

export interface ILoginDto extends ITraceable {
    data: LoginData;
    resource: LoginResource;
}

export interface ILoginDtoResponse {
    sid: string;
}

export type LoginData = IOAuthDto | TgUser | IEthSignatureDto;