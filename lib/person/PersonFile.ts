import { FilePictureExtensions } from "../file";

export enum PersonFileType {
    AVATAR = 'AVATAR',
    PICTURE = 'PICTURE',
}

export const PersonFileAllowExtensions = [...FilePictureExtensions];
